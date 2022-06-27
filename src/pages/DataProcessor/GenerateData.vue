<template>
    <div>
        <div class="row">
            <card>
                <h5 slot="header" class="title">Generate Data</h5>
                <generate-data-form></generate-data-form>
            </card>
        </div>
    </div>
</template>




<script>
    import GenerateDataForm from './GenerateDataForm'
    export default {
        components: {
            GenerateDataForm
        },

        data() {
            return {}
        }
    };

</script>

<style>

</style>