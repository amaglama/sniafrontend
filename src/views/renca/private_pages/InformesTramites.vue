<template>
    <div class="flex flex-col justify-center items-center">
        <h1 class="my-4 text-2xl font-bold">Trámites</h1>
        <div class="flex w-1/2 justify-between m-4">
            <CardBoxWidget
                label="Pendientes"
                :quantity="stats['pendientes']"
                color="bg-red-400"
                :trend="`${Math.floor((stats['pendientes']/(stats['pendientes']+stats['atendidos']+stats['aprobados']))*100)}%`"
                />
            <CardBoxWidget
                label="Atendidos"
                :quantity="stats['atendidos']"
                color="bg-sky-400"
                :trend="`${Math.floor((stats['atendidos']/(stats['pendientes']+stats['atendidos']+stats['aprobados']))*100)}%`"
                />
                <CardBoxWidget
                label="Aprobados"
                :quantity="stats['aprobados']"
                color="bg-emerald-400"
                :trend="`${Math.floor((stats['aprobados']/(stats['pendientes']+stats['atendidos']+stats['aprobados']))*100)}%`"/>
            
        </div>
    </div>
</template>

<script>
import CardBoxWidget from '@/components/stats/CardBoxWidget.vue';
import { getConsultants } from '@/services/renca';
import { ref, onMounted } from 'vue';
import { APIS } from '@/stores/constants/urlsBackEnd';
export default{
    components: {
        CardBoxWidget
    },
    setup(props){
        const stats = ref({
            pendientes: 0,
            atendidos: 16,
            aprobados: 0,
        });
        function filterConsultants(result ,type){
            if (props.filterConsultant !== null){
                return result.filter(r => r.filter === type);
            }
            return result;
        } 
        const consultants = ref([]);
        const consultantsRENCA = ref([]);
        const loadConsultants = async () => {
            try {
                consultants.value = [];
                consultantsRENCA.value = [];
                const result = await getConsultants(APIS.CONSULTANTES.GET);
                filterConsultants([] ,"pendientes");
                consultants.value = result;

                const resultRenca = await getConsultants(APIS.CONSULTANTES_RENCA.GET);
                consultantsRENCA.value = resultRenca;
                stats.value.pendientes = consultants.value.length;
                stats.value.aprobados = resultRenca;
            } catch (error) {
                console.error("Error al obtener los usuarios:", error);
            }
        };
        onMounted(() => {
            loadConsultants();
        });
        return {
            stats
        };
    }
}

</script>