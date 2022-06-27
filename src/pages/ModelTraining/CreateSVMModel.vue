<template>
    <div>
        <div class="row">
          <div class="col-md-4 pr-md-1">
            <base-input label="Model Name"
                      placeholder="Model Name"
                      v-model.number="model.name"
                      >
            </base-input>
          </div>
            <div class="col-md-4 pr-md-1">
                <base-input label="Environment"
                      placeholder="Environment"
                      v-model.number="model.environment"
                      disabled>
            </base-input>
            </div>
            <div class="col-md-3 pr-md-1">
                <label class="control-label">Kernel</label>
                <select v-model="model.kernel" class="form-control">
                  <option disabled value="">Please select one</option>
                  <option value="linear">Linear</option>
                  <option value="poly">Poly</option>
                  <option value="rbf">Rbf</option>
                  <option value="sigmoid">Sigmoid</option>
                  <option value="precomputed">Precomputed</option>
                </select>
            </div>
        </div>

        <div class="row">
            <div class="col-md-4">
                <base-button slot="footer" type="primary" fill v-on:click="saveModel">Save model</base-button>
            </div>
        </div>

    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        components: {
        },

        data() {
          return {
              model: {
                  name: '',
                  environment: 'TESTING',
                  kernel: ''
              }
          }
        },

        methods: {
            saveModel(event){
                event.preventDefault();

                let packet = {
                    name: this.model.name,
                    type: 'SVM_CLASSIFIER',
                    environment: this.model.environment,
                    settings: {
                        kernel: this.model.kernel,
                        environment: this.model.environment,
                        model_name: this.model.name
                    },
                };

                console.log("packet");
                console.log(packet);

                // Se envía llamado al api
                axios.post('http://localhost:3000/api/models/', packet).then((response) => {
                    console.log(response);
                });

                // TODO notificación de intento enviado
            }
        }
    }
</script>

<style>
    .vdpComponent.vdpWithInput>input {
        width: 100%;
        background-color: #27293e;
        border: none;
        line-height: 1.42857;
        color: rgba(255, 255, 255, 0.8);
        font-size: 0.75rem;
    }
</style>