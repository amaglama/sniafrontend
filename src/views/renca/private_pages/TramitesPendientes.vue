<template>
    <ConsultantsView 
        filterConsultant="PENDIENTES" 
        :options="[ 'see' ]"
        :urlConsultant="url">
    </ConsultantsView>
</template>

<script>
    import ConsultantsView from '../components/ConsultantsView.vue';
    import FilterTable from '@/views/renca/filters/FilterTable.vue';
    import { APIS } from '@/stores/constants/urlsBackEnd';
    export default {
        name: "TramitesPendientes",
        components: {
            ConsultantsView,
            FilterTable,
        },
        setup(){
            return {
                url: APIS.CONSULTANTES.GET
            }
        }
    }
</script>
