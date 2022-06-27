<template>
    <div>
        <div class="row divider" v-for="(layer, index) in layers" :key="index">
            <div class="col-md-4">
                <label class="control-label">Layer type</label>
                <select v-model="layer.type" class="form-control" @change="emitInfo">
                  <option disabled value="">Please select one</option>
                  <option value="DENSE">Dense</option>
                  <option value="DROPOUT">Dropout</option>
                </select>
            </div>
            <div class="col-md-4">
              <base-input label="Units"
                          placeholder="Units"
                          v-model.number="layer.units"
                          @change="emitInfo">
                </base-input>
            </div>
            <div class="col-md-4">
                <label class="control-label">Activation function</label>
                    <select v-model="layer.activation" class="form-control" @change="emitInfo">
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
                    <select v-model="layer.kernel" class="form-control" @change="emitInfo">
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
                    <select v-model="layer.kernel_regularizer" class="form-control" @change="emitInfo">
                      <option disabled value="">Please select one</option>
                      <option value="l1">L1</option>
                      <option value="l2">L2</option>
                      <option value="l1_l2">L1 - L2</option>
                    </select>
            </div>
            <div class="col-md-4">
                <base-input label="Drop out rate"
                          placeholder="Drop out rate"
                          v-model.number="layer.rate"
                          @change="emitInfo">
                </base-input>
            </div>
            <div class="delete-button col-md-12">
                <button class="remove-layer btn btn-danger btn-sm float-right" @click="removeLayer(index)" ><i class="tim-icons icon-simple-remove"></i></button>
            </div>

        </div>

        <div class="add-layer-button">
            <button class="add-layer btn btn-success btn-sm float-right" @click="addLayer">
                <i class="tim-icons icon-simple-add"></i>
            </button>
        </div>

    </div>
</template>

<script>
    export default {
        components: {

        },

        data() {
            return {
              layers: []
            }
        },

        methods: {
            addLayer() {
                this.layers.push({
                  type: '',
                  units: 1,
                  activation: '',
                  kernel: '',
                  kernel_regularizer: '',
                  rate: 0
                });
            },

            removeLayer(lineId) {
                this.layers.splice(lineId, 1);
            },

            emitInfo() {
                this.$emit('changeHiddenLayers', this.layers);
            }
        },

        mounted () {
            this.addLayer();
        },

        watch: {
            layers(newVal, oldVal){
                this.$emit('changeHiddenLayers', newVal);
            }
        }
    };
</script>

<style>
    .divider {
        padding-bottom: 25px;
        margin-left: 10px;
        margin-right: 10px;
        margin-bottom: 25px;
        border-bottom: 1px solid;
    }
    .remove-layer {
        padding: 3px 10px;
    }

    .add-layer {
        padding: 3px 10px;
        margin-right: 25px;
    }
</style>