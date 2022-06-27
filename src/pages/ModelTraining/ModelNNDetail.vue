<template>
    <div>
        <card>
            <!-- TODO DETALLES DEL MODELO -->
        </card>
        <card>
            <h4 slot="header" class="card-title">Training Settings</h4>
            <div class="row">
               <h4 class="subtitle">Compilation</h4>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <label class="control-label">Optimizer</label>
                    <select v-model="compilation.optimizer" class="form-control">
                      <option disabled value="">Please select one</option>
                      <option value="SGD">SGD</option>
                      <option value="RMSprop">RMSprop</option>
                      <option value="adam">Adam</option>
                      <option value="adagrad">Adagrad</option>
                      <option value="adamax">Adamax</option>
                      <option value="nadam">Nadam</option>
                      <option value="ftrl">Ftrl</option>
                    </select>
                </div>
                <div class="col-md-4">
                    <label class="control-label">Loss</label>
                    <select v-model="compilation.loss" class="form-control">
                      <option disabled value="">Please select one</option>
                      <option value="binary_crossentropy">Binary crossentropy</option>
                    </select>
                </div>
            </div>
            <div class="row">
               <h4 class="subtitle">Training config</h4>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <base-input label="Batch size"
                              placeholder="Batch size"
                              v-model.number="training.batch_size"
                              >
                    </base-input>
                </div>
                <div class="col-md-4">
                    <base-input label="Epochs"
                              placeholder="Epochs"
                              v-model.number="training.epochs"
                              >
                    </base-input>
                </div>
                <div class="col-md-4">
                    <base-input label="Test size"
                              placeholder="Test size"
                              v-model.number="training.test_size"
                              >
                    </base-input>
                </div>
            </div>

            <div class="row">
                <div class="col-md-4">
                    <base-button slot="footer" type="primary" fill v-on:click="startTraining">Start training</base-button>
                </div>
            </div>

        </card>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        components: {

        },

        data() {
            return {
                model: {},
                compilation: {
                   optimizer: '',
                   loss: ''
                },
                training: {
                    batch_size: 0,
                    epochs: 0,
                    test_size: 0.3
                }
            }
        },

        mounted() {
            axios.get(`http://localhost:3000/api/models/${this.$route.params.id}/`).then((response) => {
                console.log(response.data);
            });
        },

        methods: {
            startTraining(event) {
               event.preventDefault();
                console.log("Entra aquí");
               let packet = {
                   model_id: this.$route.params.id,
                   compilation: {
                       optimizer: this.compilation.optimizer,
                       loss: this.compilation.loss
                   },
                   training: {
                       batch_size: this.training.batch_size,
                       epochs: this.training.epochs,
                       test_size: this.training.test_size
                   }
               };

               axios.post('http://localhost:3000/api/training/', packet).then((response) => {
                   console.log(response);
               });

            }
        }
    };
</script>

<style>
.subtitle {
    margin-left: 15px;
    margin-top: 25px;
}
</style>