<template>
  <div>
    <card>
      <h4 slot="header" class="card-title">Production settings</h4>
      <div class="row">
        <div class="col-md-4">
          <label class="control-label">AI Model Production</label>
          <v-select
            :options="models_data"
            v-model="selected_model"
            :filterable="false"
            label="name"
          >
            <li slot="list-footer" class="pagination">
              <base-button  type="secondary" v-on:click="subtractPage()" :disabled="!hasPrevPage">Prev</base-button >
              <base-button  type="secondary" v-on:click="addPage()" :disabled="!hasNextPage">Next</base-button >
            </li>
          </v-select>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <base-button slot="footer" type="primary" fill v-on:click="saveConfig" class="save-button">Save config</base-button>
        </div>
      </div>
    </card>
  </div>
</template>

<script>
  import axios from 'axios';
  import vSelect from "vue-select";
  import 'vue-select/dist/vue-select.css';

  export default {
    components: {
      vSelect
    },
    data() {
      return {
        models_data: [],
        selected_model: "",
        limit: 10,
        offset: 0,
        page: 1,
        pageCount: 0
      }
    },
    mounted() {
      axios.get('http://localhost:3000/api/models/').then((response) => {
        let results = response.data.results;
        this.pageCount = Math.ceil(response.data.count/10);

        this.models_data = results.map((model) => {
          return {
            id: model.id,
            name: `${model.name} - ${model.type}`
          };
        });
      });
    },

    methods: {
      addPage() {
        this.page = this.page +1;
        axios.get(`http://localhost:3000/api/models/?page=${this.page}`).then((response) => {
          let results = response.data.results;
          this.pageCount = Math.ceil(response.data.count/10);
          this.models_data = results.map((model) => {
            return {
              id: model.id,
              name: `${model.name} - ${model.type}`,
              label: `${model.name} - ${model.type}`
            };
          });
        });
      },

      subtractPage() {
        this.page = this.page -1;
        axios.get(`http://localhost:3000/api/models/?page=${this.page}`).then((response) => {
          let results = response.data.results;
          this.pageCount = Math.ceil(response.data.count/10);
          this.models_data = results.map((model) => {
            return {
              id: model.id,
              name: `${model.name} - ${model.type}`,
              label: `${model.name} - ${model.type}`
            };
          });
        });
      },

      saveConfig(event){
        event.preventDefault();

        let packet = {
          model_id: this.selected_model.id
        };
        console.log("packet");
        console.log(packet);

        // se envía llamado al api
        axios.post('http://localhost:3000/api/production/', packet).then((response) => {
          console.log(response);
        });
      }
    },

    computed: {
        hasNextPage() {
          return this.page <= this.pageCount;
        },
        hasPrevPage() {
          return this.page >= 1;
        }
    }
  };

</script>

<style>
.vs__dropdown-toggle {
  border: 1px solid #2b3553;
  background: transparent;
}

.vs__open-indicator {
  fill: #fff;
}
.save-button {
  margin-top: 20px;
}
.vs__selected {
  color: #fff;
}
</style>
