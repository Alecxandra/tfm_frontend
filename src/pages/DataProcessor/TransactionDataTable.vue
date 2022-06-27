<template>
  <base-table :data="table_data" :columns="table_columns" thead-classes="text-primary"></base-table>
</template>

<script>
  import { BaseTable } from "@/components";
  import axios from 'axios';

  const tableColumns = [
    "Tran. number", "Date", "Category", "Amount", "Merchant", "Merch lat", "Merch long", "Is fraud"
  ];
  export default {

    components: {
      BaseTable
    },

    mounted() {
      axios.get('http://localhost:3000/api/transactions').then((response) => {
        console.log(response);

        let results = response.data.results;

        this.table_data = results.map((transaction) => {
          return {
            "tran. number": transaction.transaction_number,
            date: transaction.transaction_date,
            category: transaction.category,
            amount: transaction.amt,
            merchant: transaction.merchant,
            "merch lat": transaction.merch_lat,
            "merch long": transaction.merch_long,
            "is fraud": transaction.is_fraud ? "True" : "False"
          };
        });

      });
    },

    data() {
      return {
        table_data: [],
        table_columns: tableColumns
      }
    }
  };
</script>

<style>
</style>
