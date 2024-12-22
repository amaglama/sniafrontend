<template>
    <div class="m-1 flex-x-auto mb-32">
        <div>
            
            <div v-if="typeFilter == 'rencaFilter'">
                <FilterTable 
                    :items="consultants" 
                    @update:items-filtered="consultantsFilter = $event"/>
            </div>
            <div v-if="typeFilter == 'rencaFilterSuccesses'">
                <FilterTableSucesses 
                    :items="consultants" 
                    @update:items-filtered="consultantsFilter = $event"/>
            </div>
            
        </div>
        <TableComp
            :headers="headers" 
            :items="consultantsFilter.length == 0? consultants: consultantsFilter" 
            :options="options" 
            :format-cell="formatCell"
            :edit-redirect="`/RENCA`"
            :exclude="exclude"
            label="Trámite"
            >
            <template #see="{ idSelected }">
                <ConsultantForm :idSelected="idSelected"/>
            </template>
        </TableComp>
    </div>
</template>

<script>
    import TableComp from '@/components/table/TableComp.vue';
    import FilterTable from '../filters/FilterTable.vue';
    import FilterTableSucesses from '../filters/FilterTableSucesses.vue';
    import { getConsultants } from '@/services/renca';
    import { ref, onMounted  } from 'vue';
    import ConsultantForm from '../private_pages/ConsultantForm.vue';
    import { formatDateTime } from '@/stores/utils/dateFormats';

    export default {
        name: "TramitesPendientes",
        components: {
            TableComp,
            FilterTable,
            FilterTableSucesses,
            ConsultantForm
        },
        props: {
            filterConsultant: {
                type: String,
                default: null
            },
            typeFilter: {
                type: String,
                default: "rencaFilter"
            },
            options: {
                type: Array,
                default: []
            },
            urlConsultant: {
                type: String,
                default: null
            }
        },
        setup(props){
            function filterConsultants(result){
                if (props.filterConsultant !== null){
                    return result.filter(r => r.filter === props.filterConsultant);
                }
                return result;
            } 
            const consultants = ref([]);
            const consultantsFilter = ref([]);
            const loadConsultants = async () => {
                if (props.urlConsultant === null){
                    return [];
                }
                try {
                    const result = await getConsultants(props.urlConsultant);
                    filterConsultants([]);
                    consultants.value = result.sort((r1,r2) => r1["created_at"] < r2["created_at"]);
                } catch (error) {
                    console.error("Error al obtener los usuarios:", error);
                }
                return [];
            };
            onMounted(() => {
                loadConsultants();
            });
            return {
                consultants: consultants,
                consultantsFilter: consultantsFilter,
                typeFilter: props.typeFilter,
                options: props.options,
            };
        },
        data() {
            return {
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
                } 
            }
        }
    }
    
</script>

