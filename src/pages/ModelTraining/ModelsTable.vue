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

  const tableColumns = ["Identifier", "Name", "Model type", "Environment"];
  export default {

    components: {
      BaseTable,
      Paginate
    },

    mounted() {
      axios.get('http://localhost:3000/api/models/').then((response) => {
        console.log(response);

        let results = response.data.results;
        this.pageCount = Math.ceil(response.data.count/10);

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
        table_columns: tableColumns,
        page: 0,
        pageCount: 0
      }
    },
    methods: {
      changePage() {
        axios.get(`http://localhost:3000/api/models/?page=${this.page}`).then((response) => {
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
