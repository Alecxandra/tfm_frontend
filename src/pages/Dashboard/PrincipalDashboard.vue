<template>
  <div></div>
</template>

<script>
import axios from "axios";

export default {
  mounted() {
    console.log('mounted');
    axios.get('http://localhost:3000/api/current-model/').then((response) => {
      console.log(response);

      let results = response.data

      if (results.type == 'NNW_CLASSIFIER') {
        this.$router.push({
          path: `/model-nn-dashboard/${results.id}`
        });
      } else {
        this.$router.push({
          path: `/model-svm-dashboard/${results.id}`
        });
      }
    });
  }
}
</script>

<style>

</style>
