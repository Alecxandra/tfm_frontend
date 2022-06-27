<template>
  <base-table :data="table_data" :columns="table_columns" thead-classes="text-primary"></base-table>
</template>

<script>
  import { BaseTable } from "@/components";
  import axios from 'axios';

  const tableColumns = ["Identifier", "Name", "Model type", "Environment"];
  export default {

    components: {
      BaseTable
    },

    mounted() {
      axios.get('http://localhost:3000/api/models/').then((response) => {
        console.log(response);

        let results = response.data.results;

        this.table_data = results.map((model) => {
          return {
            identifier: model.id,
            name: model.name,
            "model type": model.type,
            environment: model.environment
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
