<template>
    <div class="background">
        <div class="login">
            <div class="text">
                <h2>Are you sure you want to {{ action }}</h2>
            </div>
            <div class="confirmButtons">
                <button @click="this.$emit('cancelAction')">Cancel</button>
                <button @click="this.$emit('confirmAction')">Confirm</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>