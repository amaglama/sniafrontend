<template>
    <ConsultantsView 
        filterConsultant="ATENDIDOS"
        :urlConsultant="url"/>
</template>

<script>
    import ConsultantsView from '../components/ConsultantsView.vue';
    import { APIS } from '@/stores/constants/urlsBackEnd';
    export default {
        name: "TramitesAtendidos",
        components: {
            ConsultantsView,
        },
        setup(){
            return {
                url: APIS.CONSULTANTES_RENCA.GET
            }
        }
    }
</script>
