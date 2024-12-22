<template>
    <ListaConsultores filter-type="empresas"/>
</template>
<script>
import ListaConsultores from './ListaConsultores.vue';

    export default {
        name: "EmpresasView",
        components: {
            ListaConsultores
        },
    }
</script>