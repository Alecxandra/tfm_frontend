<template>
    <div>
        <card>
            <h4 slot="header" class="card-title">Production settings</h4>
            <div class="row">
                <div class="col-md-4">
                    <label class="control-label">AI Model</label>
                    <select  class="form-control">
                      <option disabled value="">Please select one</option>
                      <option value="SGD">NN - Model #1</option>
                      <option value="RMSprop">SVM - Model #2</option>
                      <option value="adam">NN - Model #3</option>
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <base-button slot="footer" type="primary" fill v-on:click="startTraining">Save config</base-button>
                </div>
            </div>
        </card>
    </div>
</template>

<script>

</script>

<style>

</style>