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
    "Identifier",
    "Name", "Last name", "Gender", "CC number", "Account number", "City", "Street", "State", "Lat", "lon"
  ];
  export default {

    components: {
      BaseTable,
      Paginate
    },

    mounted() {
      axios.get('http://localhost:3000/api/customers').then((response) => {
        console.log(response);

        let results = response.data.results;
        this.pageCount = Math.ceil(response.data.count/10);

        this.table_data = results.map((customer) => {
          return {
            identifier: customer.identifier,
            name: customer.first_name,
            "last name": customer.last_name,
            "cc number": customer.cc_number,
            "account number": customer.account_number,
            "gender": customer.gender,
            "street": customer.street,
            "city": customer.city,
            "state": customer.state,
            "lat": customer.lat,
            "lon": customer.lon
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
        axios.get(`http://localhost:3000/api/customers/?page=${this.page}`).then((response) => {
          console.log(response);

          let results = response.data.results;

          this.table_data = results.map((customer) => {
            return {
              identifier: customer.identifier,
              name: customer.first_name,
              "last name": customer.last_name,
              "cc number": customer.cc_number,
              "account number": customer.account_number,
              "gender": customer.gender,
              "street": customer.street,
              "city": customer.city,
              "state": customer.state,
              "lat": customer.lat,
              "lon": customer.lon
            };
          });

        });
      }
    }
  };
</script>

<style>
  .pagination > li > a, .pagination > li > span {
    position: relative;
    float: left;
    padding: 6px 12px;
    margin-left: -1px;
    line-height: 1.42857143;
    color: #fff;
    text-decoration: none;
    background-color: #399b6b;
    border: 1px solid #2e3d62;

  }
  .pagination > .active > a {
    z-index: 2;
    color: #fff;
    cursor: default;
    background-color: #2e3c60;
    border-color: #2a3857;
  }
</style>
