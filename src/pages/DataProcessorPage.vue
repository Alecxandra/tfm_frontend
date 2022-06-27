<template>
    <div>
        <div class="row">
            <div class="generate-button">
                <base-button slot="footer" type="primary" fill @click="redirectToGenerateData()">Generate data</base-button>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <card class="card">
                    <h4 slot="header" class="card-title">Customers</h4>
                    <div class="table-response">
                        <customer-data-table></customer-data-table>
                    </div>
                </card>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <card class="card">
                    <h4 slot="header" class="card-title">Transactions</h4>
                    <div class="table-response">
                        <transaction-data-table></transaction-data-table>
                    </div>
                </card>
            </div>
        </div>
    </div>
</template>

<script>
  import CustomerDataTable from './DataProcessor/CustomerDataTable';
  import TransactionDataTable from './DataProcessor/TransactionDataTable';
  import { BaseButton } from "@/components";
  import router from "../router";

  export default {
      components: {
          CustomerDataTable,
          TransactionDataTable,
          BaseButton
      },

      methods: {
        redirectToGenerateData(){
            router.push('/generate-data');
        }
      },

      data() {
        return {}
      }
  }
</script>

<style>
    .generate-button {
        text-align: right;
        flex: auto;
        margin-right: 15px;
        margin-bottom: 20px;
    }
</style>