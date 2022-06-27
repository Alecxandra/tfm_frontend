<template>
    <div>

        <div class="row">
            <div class="col-md-12">
                <card>
                    <h4 slot="header" class="card-title">Create Support Vector Machine Model</h4>
                    <create-s-v-m-model></create-s-v-m-model>
                </card>
            </div>
        </div>

        <div class="row">
            <card>
                <h4 slot="header" class="card-title">Create Neural Network Model</h4>
                <create-n-n-model></create-n-n-model>
            </card>

        </div>

    </div>
</template>

<script>
import CreateSVMModel from "./CreateSVMModel";
import CreateNNModel from "./CreateNNModel";

export default {
    components: {
        CreateNNModel,
        CreateSVMModel,
    },

    data() {
        return {}
    }
}

</script>

<style>

</style>