<template>
    <div class="background">
        <div class="login">
            <div v-if="!successful" class="beforeConfirm">
                <div class="text">
                    <h2>{{ action }}</h2>
                </div>
                <div class="confirmButtons">
                    <button class="cancelBtn" @click="this.$emit('cancelAction')">Cancel</button>
                    <button @click="this.$emit('confirmAction')" id="addProductBtn" :disabled="loading">
                        <pulse-loader :loading="loading" color="#826251" size="0.5rem"></pulse-loader>
                        <span v-show="!loading">Proceed</span>
                    </button>
                </div>
            </div>
            <div v-if="successful" class="afterConfirm">
                <div class="text">
                    <h2>{{ actionSuccess }}</h2>
                </div>
                <div class="confirmButtons">
                    <button @click="this.$emit('cancelAction')" id="addProductBtn" :disabled="loading">
                        <pulse-loader :loading="loading" color="#826251" size="0.5rem"></pulse-loader>
                        <span v-show="!loading">Close</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
export default {
    props: [
        'action',
        'actionSuccess',
        'successful',
        'loading'
    ],
    components: {
        PulseLoader
    }
}
</script>

<style>
    .cancelBtn{
        font-size: 1rem;
        margin-top: 2.5rem;
    }
</style>