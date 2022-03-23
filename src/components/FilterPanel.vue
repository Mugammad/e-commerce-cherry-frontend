<template>
    <div class="filterPanel">
        <router-link class="filterLink" to="/products">PRODUCTS<span class="borderLink"></span></router-link>
    </div>
</template>

<script>
export default {

}
</script>

<style>
    .filterPanel{
        width: 200px;
        min-height: 100%;
        background: var(--pink);
        text-align: left;
    }
    .filterLink{
        font-weight: bold;
        display: flex;
        flex-direction: column;
        width: fit-content;
        justify-content: center;
    }
    .filterPanel .filterLink{
        font-size: 1.5rem;
    }
    .borderLink, .borderLinkTop{
        border-bottom: 2px solid var(--brown);
        width: 1%;
        opacity: 0;
        transition: 0.2s;
    }
    .borderLink{
        padding-top: 2px;
    }
    .borderLinkTop{
        padding-bottom: 2px;
    }
    a.router-link-exact-active{
        color: var(--brown) !important;
    }
    a.router-link-exact-active>.borderLink, a.router-link-exact-active>.borderLinkTop{
        opacity: 1;
        width: 100%;
        transition: 0.5s;
    }
</style>