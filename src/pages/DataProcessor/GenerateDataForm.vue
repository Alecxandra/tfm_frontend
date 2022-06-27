<template>
    <div>
        <div class="row">
          <div class="col-md-4 pr-md-1">
            <base-input label="Num. of customers"
                      placeholder="Customers"
                      v-model.number="model.customers"
                      >
            </base-input>
          </div>
            <div class="col-md-4 pr-md-1">
                <label class="control-label">Transactions start date</label>
                <date-pick
                        v-model="model.start_date"
                        :displayFormat="'MM-DD-YYYY'"
                        format="MM-DD-YYYY"
                        class="form-control"></date-pick>
            </div>
            <div class="col-md-3 pr-md-1">
                <label class="control-label">Transactions end date</label>
                <date-pick
                        v-model="model.end_date"
                        :displayFormat="'MM-DD-YYYY'"
                        format="MM-DD-YYYY"
                        class="form-control"></date-pick>
            </div>
        </div>
        <div class="row">
            <div class="col-md-4">
                <base-button slot="footer" type="primary" fill v-on:click="submitGenerateData">Generate Data</base-button>
            </div>

        </div>
    </div>
</template>

<script>
    import DatePick from 'vue-date-pick';
    import 'vue-date-pick/dist/vueDatePick.css';
    import axios from 'axios';

    export default {
        components: {
            DatePick
        },
        data() {
          return {
              model: {
                  customers: 0,
                  start_date: '',
                  end_date: ''
              }
          }
        },

        methods: {
            submitGenerateData(event){
                event.preventDefault();

                let packet = {
                    customers: this.model.customers,
                    start_date: this.model.start_date,
                    end_date: this.model.end_date,
                };

                console.log("packet");
                console.log(packet);

                // Se envía llamado al api
                axios.post('http://localhost:3000/api/data/generate/', packet).then((response) => {
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