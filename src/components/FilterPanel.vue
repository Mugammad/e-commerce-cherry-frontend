<template>
    <div class="filterPanel">
        <div class="heading">
            <h2>{{heading.toUpperCase()}}</h2>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        'heading'
    ]
}
</script>

<style>
    .filterPanel .heading{
        border-bottom: 3px solid var(--brown);
        height: 45px;
        display: flex;
        align-items: center;
    }
    .filterPanel{
        width: 200px;
        min-height: 100%;
        background: var(--pink);
        text-align: left;
        margin-right: 1rem;
    }
    .filterLink{
        font-weight: bold;
        display: flex;
        flex-direction: column;
        width: fit-content;
        justify-content: center;
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