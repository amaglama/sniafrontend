<template>
    <CardBoxModal 
        v-model="isListOpen" 
        title="Lista de consultantes RENCA" 
        button="primary" 
        button-label="VOLVER"
        class-name="h-fit">
        <FilterTable 
                    :items="consultants" 
                    @update:items-filtered="consultantsFilter = $event"/>
        <TableComp
            :headers="headersConsultants"
            :items="consultantsFilter.length == 0? consultants: consultantsFilter"
            v-on:click-row="onClickRow"
            :class-row="classRow">
        </TableComp>
    </CardBoxModal>
    <div class="p-4 space-y-4">
        <div class="h-fit overflow-y-auto">
            <div class="flex flex-col items-center gap-y-8">
                <ButtonComp
                    @click="openModalList"
                    label="Agregar Miembro"
                    :icon="mdiPlus"
                />
                <div class="w-full">
                    <TableComp
                        :headers="headers"
                        :items="items"
                        :buttons-cell="{
                            Eliminar: itemDelete
                        }"
                        :buttons-name="[
                            'Eliminar'
                        ]"
                    >
                    </TableComp>
                </div>
            
            </div>
        </div>
    </div>
  </template>
  
  <script>
    import ButtonComp from '@/components/essencials/ButtonComp.vue';
    import { onMounted, ref, } from "vue";
    import { amountsCategories, RENOVATION, REGISTRATION, UPDATE } from '@/stores/constants/constantsRENCA';
    import { getMinimunCategory } from '@/stores/constants/constantsRENCA';
    import { mdiPlus } from "@mdi/js";
    import TableComp from '@/components/table/TableComp.vue';
    import CardBoxModal from '@/components/ComponentsOne/CardBoxModal.vue';
    import { APIS } from '@/stores/constants/urlsBackEnd';
    import { getConsultants } from '@/services/renca';
    import FilterTable from '../filters/FilterTable.vue';
  
  export default {
    name: "ListPersonalForm",
    components: {
      ButtonComp,
      TableComp,
      CardBoxModal,
      FilterTable
    },
    props: {
      consultantsForm: {
        type: Array,
        required: true,
      },
      category: {
          type: String,
          required: true,
      },
      errors: {
          type: Array,
          default: () => []
      },
      formTypes: {
          type: Object,
          default: {}
      },
      typeForm: {
          type: String,
          default: "post" 
      },
    },
    emits: ["update:consultantsForm"],
    setup(props){
        const isListOpen = ref(false);
        const consultants = ref([]);
        const consultantsFilter = ref([]);
    
        function openModalList() {
            isListOpen.value = true;
        }

        const onLoadConsultants = async () => {
            try {
                consultants.value = [];
                const resultRenca = await getConsultants(APIS.CONSULTANTES_RENCA.GET);
                console.log(resultRenca)
                for (let consultant of resultRenca){
                    consultants.value.push({
                        "id": consultant.id,
                        "user_name": `${consultant.user_name} ${consultant.last_name} ${consultant.second_last_name}`,
                        "category": consultant.category,
                        "email": consultant.email,
                        "identification_document": consultant.identification_document,
                        "type_identification_document": consultant.type_identification_document,
                        "ci_complement": consultant.ci_complement,
                        "ci_expedited": consultant.ci_expedited,
                        "cellphone": consultant.cellphone,
                        "request_code": consultant.request_code,
                        "national_certificate": consultant.national_certificate
                    });
                }
            } catch (error) {
                console.error("Error al obtener los usuarios:", error);
            }
        };

        const onClickRow = (id) =>{
            const consultant = consultants.value.find(c => c.id === id);
            if (consultant && props.consultantsForm.find(c => c.id === id) === undefined) props.consultantsForm.push(consultant);
        }

        const classRow = (_) =>{
            return "hover:bg-secondary hover:text-white";
        }

        const itemDelete = (item) => {
            let index = 0;
            
            for (let consultant of props.consultantsForm){
                if (consultant.id === item.id) break;
                index = index + 1;
            }

            props.consultantsForm.splice(index, 1);


            props.consultantsForm = []; 
        }
    
        onMounted(()=>{
            onLoadConsultants();
        });
    
        return {
            isListOpen,
            openModalList,
            consultantsForm: props.consultantsForm,
            getMinimunCategory,
            amountsCategories,
            mdiPlus,
            typeForm: props.typeForm,
            RENOVATION,
            UPDATE,
            REGISTRATION,
            headers: [
                {"request_code": "Nro. RENCA"},
                {"user_name": "Nombre Completo"},
                {"national_certificate": "Profesión"},
            ],
            items: props.consultantsForm,
            headersConsultants: [
                {"user_name": "Nombre Completo"},
                {"request_code": "Codigo"},
                {"category": "Categoria"},
                {"national_certificate": "Profesión"},
            ],
            consultants,
            consultantsFilter,
            onClickRow,
            classRow,
            itemDelete
        }
    }
  };
  </script>
  