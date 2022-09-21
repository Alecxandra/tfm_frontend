<template>
  <div>
    <base-table :data="table_data" :columns="table_columns" thead-classes="text-primary"></base-table>
    <paginate
      v-model="page"
      :page-count="pageCount"
      :click-handler="changePage"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination'">
    </paginate>
  </div>

</template>

<script>
  import { BaseTable } from "@/components";
  import axios from 'axios';
  import Paginate from "vuejs-paginate";

  const tableColumns = [
    "Tran. number", "Date", "Category", "Amount", "Merchant", "Merch lat", "Merch long", "Is fraud"
  ];
  export default {

    components: {
      BaseTable,
      Paginate
    },

    mounted() {
      axios.get('http://localhost:3000/api/transactions').then((response) => {
        console.log(response);

        let results = response.data.results;
        this.pageCount = Math.ceil(response.data.count/10);

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
        table_columns: tableColumns,
        page: 1,
        pageCount: 0
      }
    },
    methods: {
      changePage() {
        axios.get(`http://localhost:3000/api/transactions/?page=${this.page}`).then((response) => {
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
      }
    }
  };
</script>

<style>
</style>
