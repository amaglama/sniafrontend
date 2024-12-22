<template>
    <div class="mt-16">
        <TableComp
            :headers="headers" 
            :items="consultants" 
            :options="options" 
            :format-cell="formatCell"
            :edit-redirect="`/RENCA`"
            :exclude="exclude"
            label="Trámite"
            :class-row="() => ''"
            >
            <template #see="{ idSelected }">
                <BossConsultantView 
                    :idSelected="idSelected">
                </BossConsultantView>
            </template>
        </TableComp>
    </div>
</template>

<script>
    import { ref,onMounted } from 'vue';
    import TableComp from '@/components/table/TableComp.vue';
    import { formatDateTime } from '@/stores/utils/dateFormats';
    import { getConsultants } from '@/services/renca';
    import { APIS } from '@/stores/constants/urlsBackEnd';
    import BossConsultantView from '../../components/boss/BossConsultantView.vue';
    export default {
        name: "DelegateConsultants",
        components: {
            TableComp,
            BossConsultantView
        },
        setup(){
            const consultants = ref([]);
            const loadConsultants = async () => {
                try {
                    consultants.value = [];
                    const result = await getConsultants(APIS.CONSULTANTES.GET);
                    consultants.value = result;
                } catch (error) {
                    console.error("Error al obtener los usuarios:", error);
                }
            };
            onMounted(() => {
                loadConsultants();
            });
            return {
                consultants,
                headers: [
                            {"id" : "id"},
                            {"request_code" : "Codigo Solicitud"},
                            {"name" : "Nombre"}, 
                            {"last_name" : "Apellido Paterno"}, 
                            {"second_last_name" : "Apellido Materno"}, 
                            {"identification_document" : "CI"},  
                            {"email" : "Email"}, 
                            {"consultant_type": "Tipo consultor"},
                            {"created_at": "Fecha de solicitud"}
                        ],
                exclude: [ "id" ],
                formatCell: {
                    "created_at": (v) => formatDateTime(v)
                },
                options: ["see"]
            }
        }
    }
</script>