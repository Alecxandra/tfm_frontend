<template>
  <div>
    <input type="file" @change="uploadFile" ref="file">
    <base-button @click="submitFile">Save data</base-button>
  </div>

</template>

<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        file: null
      }
    },

    methods: {
      uploadFile(){
        console.log("upload file")
        this.file = this.$refs.file.files[0];
      },
      submitFile() {
        const formData = new FormData();
        formData.append('file', this.file);
        axios.post('http://localhost:3000/api/upload-data/', formData).then((response) => {
          console.log(response);
        });
      }
    }

  }
</script>

<style>

</style>
