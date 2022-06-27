<template>
  <base-table :data="table_data" :columns="table_columns" thead-classes="text-primary"></base-table>
</template>

<script>
  import { BaseTable } from "@/components";
  import axios from 'axios';

  const tableColumns = [
    "Identifier",
    "Name", "Last name", "Gender", "CC number", "Account number", "City", "Street", "State", "Lat", "lon"
  ];
  export default {

    components: {
      BaseTable
    },

    mounted() {
      axios.get('http://localhost:3000/api/customers').then((response) => {
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
