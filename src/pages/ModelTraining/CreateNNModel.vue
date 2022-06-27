<template>
   <div>
    <div class="row">
        <div class="col-md-4">
          <base-input label="Model Name"
                      placeholder="Model Name"
                      v-model.number="model.name"
                      >
            </base-input>
        </div>
        <div class="col-md-4">
            <base-input label="Environment"
                      placeholder="Environment"
                      v-model.number="model.environment"
                      disabled>
            </base-input>
        </div>
    </div>
      <!-- INPUT LAYER -->
     <div class="row">
         <h4 class="subtitle">Input layer</h4>
     </div>
     <div class="row">
        <div class="col-md-4">
          <base-input label="Units"
                      placeholder="Units"
                      v-model.number="model.layers.input_layer.units"
                      >
            </base-input>
        </div>
        <div class="col-md-4">
            <label class="control-label">Activation function</label>
                <select v-model="model.layers.input_layer.activation" class="form-control">
                  <option disabled value="">Please select one</option>
                  <option value="relu">Relu</option>
                  <option value="sigmoid">Sigmoid</option>
                  <option value="softmax">softmax</option>
                  <option value="softplus">Softplus</option>
                  <option value="softsign">Softsign</option>
                  <option value="tanh">Tanh</option>
                  <option value="selu">Selu</option>
                  <option value="elu">Elu</option>
                  <option value="exponential">Exponential</option>
                </select>
        </div>
         <div class="col-md-4">
            <label class="control-label">kernel</label>
                <select v-model="model.layers.input_layer.kernel" class="form-control">
                  <option disabled value="">Please select one</option>
                  <option value="random_normal">Random normal</option>
                  <option value="random_uniform">Random uniform</option>
                  <option value="truncated_normal">Truncated_normal</option>
                  <option value="he_normal">He normal</option>
                  <option value="he_uniform">He uniform</option>
                  <option value="orthogonal">Orthogonal</option>
                </select>
        </div>
         <div class="col-md-4">
          <base-input label="Input dimension"
                      placeholder="Input dimension"
                      v-model.number="model.layers.input_layer.input_dim"
                      >
            </base-input>
         </div>
         <div class="col-md-4">
            <label class="control-label">Kernel regularizer</label>
                <select v-model="model.layers.input_layer.kernel_regularizer" class="form-control">
                  <option disabled value="">Please select one</option>
                  <option value="l1">L1</option>
                  <option value="l2">L2</option>
                  <option value="l1_l2">L1 - L2</option>
                </select>
        </div>
    </div>

     <!-- OUTPUT LAYER -->
     <div class="row">
         <h4 class="subtitle">Output layer</h4>
     </div>
     <div class="row">
        <div class="col-md-4">
          <base-input label="Units"
                      placeholder="Units"
                      v-model.number="model.layers.output_layer.units"
                      >
            </base-input>
        </div>
        <div class="col-md-4">
            <label class="control-label">Activation function</label>
                <select v-model="model.layers.output_layer.activation" class="form-control">
                  <option disabled value="">Please select one</option>
                  <option value="relu">Relu</option>
                  <option value="sigmoid">Sigmoid</option>
                  <option value="softmax">softmax</option>
                  <option value="softplus">Softplus</option>
                  <option value="softsign">Softsign</option>
                  <option value="tanh">Tanh</option>
                  <option value="selu">Selu</option>
                  <option value="elu">Elu</option>
                  <option value="exponential">Exponential</option>
                </select>
        </div>
         <div class="col-md-4">
            <label class="control-label">kernel</label>
                <select v-model="model.layers.output_layer.kernel" class="form-control">
                  <option disabled value="">Please select one</option>
                  <option value="random_normal">Random normal</option>
                  <option value="random_uniform">Random uniform</option>
                  <option value="truncated_normal">Truncated_normal</option>
                  <option value="he_normal">He normal</option>
                  <option value="he_uniform">He uniform</option>
                  <option value="orthogonal">Orthogonal</option>
                </select>
        </div>
         <div class="col-md-4">
            <label class="control-label">Kernel regularizer</label>
                <select v-model="model.layers.output_layer.kernel_regularizer" class="form-control">
                  <option disabled value="">Please select one</option>
                  <option value="l1">L1</option>
                  <option value="l2">L2</option>
                  <option value="l1_l2">L1 - L2</option>
                </select>
        </div>
    </div>

    <!-- HIDDEN LAYERS -->
    <div class="row">
        <h4 class="subtitle">Hidden layers</h4>
    </div>
    <hidden-layer-form @changeHiddenLayers="getHiddenLayers"></hidden-layer-form>


    <div class="row">
        <div class="col-md-4">
            <base-button slot="footer" type="primary" fill v-on:click="saveModel">Save model</base-button>
        </div>
    </div>

   </div>
</template>

<script>
    import axios from 'axios';
    import HiddenLayerForm from "./HiddenLayerForm";

    export default {
        components: {
            HiddenLayerForm
        },

        data() {
            return {
                model: {
                    name: '',
                    environment: 'TESTING',
                    layers: {
                        input_layer: {
                            units: 0,
                            activation: '',
                            kernel: '',
                            input_dim: 0,
                            kernel_regularizer: ''
                        },
                        output_layer: {
                            units: 0,
                            activation: '',
                            kernel: '',
                            kernel_regularizer: ''
                        },
                        hidden_layers: []
                    }
                }
            }
        },

        methods: {
            saveModel(event) {
               event.preventDefault();

               let packet = {
                   name: this.model.name,
                   type: 'NNW_CLASSIFIER',
                   environment: this.model.environment,
                   settings: {
                       model_name: this.model.name,
                       environment: this.model.environment,
                       type: 'NNW_CLASSIFIER',
                       layers: {
                           input_layer: {
                               units: this.model.layers.input_layer.units,
                               activation: this.model.layers.input_layer.activation,
                               kernel: this.model.layers.input_layer.kernel,
                               input_dim: this.model.layers.input_layer.input_dim,
                               kernel_regularizer: this.model.layers.input_layer.kernel_regularizer,
                           },
                           output_layer: {
                               units: this.model.layers.output_layer.units,
                               activation: this.model.layers.output_layer.activation,
                               kernel: this.model.layers.output_layer.kernel,
                               kernel_regularizer: this.model.layers.output_layer.kernel_regularizer
                           },
                           hidden_layers: this.model.layers.hidden_layers
                       }
                   }
               };

               console.log("====== packet ======");
               console.log(packet);

               axios.post('http://localhost:3000/api/models/', packet).then((response) => {
                   console.log(response);
               });

            },

            getHiddenLayers(layers) {

                this.model.layers.hidden_layers = layers.map((layer) => {
                    if (layer.type === 'DENSE') {
                        return {
                            type: layer.type,
                            units: layer.units,
                            activation: layer.activation,
                            kernel: layer.kernel,
                            kernel_regularizer: layer.kernel_regularizer
                        };
                    }

                    return {
                        type: layer.type,
                        rate: layer.rate
                    };

                });

                console.log(this.model.layers.hidden_layers)

            }
        }
    }
</script>

<style>
.subtitle {
    margin-left: 15px;
    margin-top: 25px;
}
</style>