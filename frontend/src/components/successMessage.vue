<template>
 <span v-if="showSuccessMessage">
    <v-alert
            color="green"
            type="success"
            variant="outlined"
            class="mb-2"
    >
    {{message}}
    </v-alert>
  </span>
</template>

<script>
export default {
    props:['message','showSuccessMessage']
}
</script>

<style>

</style>