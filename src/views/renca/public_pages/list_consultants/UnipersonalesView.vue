<template>
    <ListaConsultores filter-type="unipersonales"/>
</template>
<script>
import ListaConsultores from './ListaConsultores.vue';

    export default {
        name: "UnipersonalesView",
        components: {
            ListaConsultores
        },
    }
</script>