<template>
    <div>
        <card>
            <!-- TODO DETALLES DEL MODELO -->
        </card>
        <card>
            <h4 slot="header" class="card-title">Training Settings</h4>
            <div class="row">
                <div class="col-md-4">
                    <label class="control-label">Kernel</label>
                    <select v-model="kernel" class="form-control">
                      <option disabled value="">Please select one</option>
                      <option value="linear">Linear</option>
                      <option value="poly">Poly</option>
                      <option value="rbf">Rbf</option>
                      <option value="sigmoid">Sigmoid</option>
                      <option value="precomputed">Precomputed</option>
                    </select>
                </div>
            </div>

            <div class="row button-row">
                <div class="col-md-4">
                    <base-button slot="footer" type="primary " fill v-on:click="startTraining">Start training</base-button>
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
                kernel: '',
            }
        },

        mounted() {
            axios.get(`http://localhost:3000/api/models/${this.$route.params.id}/`).then((response) => {
                console.log(response.data);
            });
        },

        methods: {
            startTraining(event) {
               console.log("Entra aquí");
               event.preventDefault();

               let packet = {
                   model_id: this.$route.params.id,
                   compilation: {
                       kernel: this.kernel
                   },
                   training: {}
               };

               axios.post('http://localhost:3000/api/training/', packet).then((response) => {
                   console.log(response);
               });

            }
        }
    };
</script>

<style>
    .button-row {
        margin-top: 20px;
    }
</style>