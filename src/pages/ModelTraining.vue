<template>
    <div>
        <div class="row">
            <div class="generate-button">
                <base-button slot="footer" type="primary" fill @click="redirectToGenerateData()">Create model</base-button>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <card class="card">
                    <h4 slot="header" class="card-title">AI Models</h4>
                    <div class="table-response">
                        <models-table></models-table>
                    </div>
                </card>
            </div>
        </div>

    </div>
</template>

<script>
import ModelsTable from "./ModelTraining/ModelsTable";
import router from "../router";

export default {
    components: {
        ModelsTable
    },

    data() {
        return {}
    },

    methods: {
        redirectToGenerateData(){
            router.push('/create-model');
        }
    },
};
</script>

<style>
    .generate-button {
        text-align: right;
        flex: auto;
        margin-right: 15px;
        margin-bottom: 20px;
    }
</style>