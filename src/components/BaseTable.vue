<template>
  <table class="table tablesorter" :class="tableClass">
    <thead :class="theadClasses">
    <tr>
      <slot name="columns">
        <th v-for="column in columns" :key="column">{{column}}</th>
      </slot>
    </tr>
    </thead>
    <tbody :class="tbodyClasses">
    <tr v-for="(item, index) in data" :key="index">
      <slot :row="item">
        <td v-for="(column, index) in columns"
            :key="index"
            v-if="hasValue(item, column)">
          {{itemValue(item, column)}}
        </td>
        <td>
          <template v-if="item['model type'] === 'SVM_CLASSIFIER'">
            <base-button class="option-buttons" @click="$router.push(`/model-svm-detail/${item['identifier'] }`)">
              <i class="tim-icons icon-molecule-40"></i>
            </base-button>
            <base-button class="option-buttons" @click="$router.push(`model-svm-dashboard/${item['identifier'] }`)">
              <i class="tim-icons icon-chart-bar-32"></i>
            </base-button>
          </template>
          <template v-if="item['model type'] === 'NNW_CLASSIFIER'">
            <base-button class="option-buttons" @click="$router.push(`/model-nn-detail/${item['identifier'] }`)">
              <i class="tim-icons icon-molecule-40"></i>
            </base-button>
            <base-button  class="option-buttons" @click="$router.push(`model-nn-dashboard/${item['identifier'] }`)">
              <i class="tim-icons icon-chart-bar-32"></i>
            </base-button>
          </template>
        </td>
      </slot>
    </tr>
    </tbody>
  </table>
</template>
<script>
  export default {
    name: 'base-table',
    props: {
      columns: {
        type: Array,
        default: () => [],
        description: "Table columns"
      },
      data: {
        type: Array,
        default: () => [],
        description: "Table data"
      },
      type: {
        type: String, // striped | hover
        default: "",
        description: "Whether table is striped or hover type"
      },
      theadClasses: {
        type: String,
        default: '',
        description: "<thead> css classes"
      },
      tbodyClasses: {
        type: String,
        default: '',
        description: "<tbody> css classes"
      }
    },
    computed: {
      tableClass() {
        return this.type && `table-${this.type}`;
      }
    },
    methods: {
      hasValue(item, column) {
        return item[column.toLowerCase()] !== "undefined";
      },
      itemValue(item, column) {
        return item[column.toLowerCase()];
      }
    }
  };
</script>

<style>
  .option-buttons {
    margin-right: 10px !important;
  }
</style>
