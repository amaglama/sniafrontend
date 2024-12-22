<template>
    <div>
        <CardBoxModal v-if="openAsign" v-model="openAsign" :title="'TECNICOS'" button-label="VOLVER" class="h-full" button="primary" className="h-fit">
            <TecnicList v-model:openAsign="openAsign"></TecnicList>
        </CardBoxModal>
        <ConsultantView
        v-if="Object.entries(consultant ?? {}).length > 0"
        :form="consultant"
        :can-edit-consultant="false"
        :can-edit-deposits="false"
        :can-edit-experiences="false">
        </ConsultantView>
        <div>
            <div class="flex justify-center">
                <ButtonComp
                    label="DELEGAR"
                    :icon="mdiAccountArrowLeftOutline"
                    :class-name="'hover:bg-secondary'"
                    v-on:click="onDelegate">

                </ButtonComp>
            </div>
        </div>
    </div>
    
</template>

<script>
    import { ref, onMounted } from 'vue';
    import ConsultantView from '../../components/consultant/ConsultantView.vue';
    import { getConsultant } from '@/services/renca';
    import ButtonComp from '@/components/essencials/ButtonComp.vue';
    import { mdiAccountArrowLeftOutline } from '@mdi/js';
    import CardBoxModal from '@/components/ComponentsOne/CardBoxModal.vue';
    import TecnicList from './TecnicList.vue';
    export default {
        name: "TramitesPendientes",
        components: {
            ConsultantView,
            ButtonComp,
            CardBoxModal,
            TecnicList
        },
        props:{
            idSelected: {
                type: Number,
                required: true,
                default: null
            }
        },
        setup(props){
            const id = props.idSelected;
            const consultant = ref({});
            const openAsign = ref(false);
            const loadConsultant = async () => {
                try {
                    if (id !== null){
                        const result = await getConsultant(id);
                        consultant.value = result;
                        console.log(consultant.value)
                    }
                } catch (error) {
                    console.error("Error al obtener los usuarios:", error);
                }
            };
            const onDelegate = () =>{
                openAsign.value = !openAsign.value;
            }
            onMounted(() => {
                loadConsultant();
            });
            return {
                consultant,
                mdiAccountArrowLeftOutline,
                openAsign,
                onDelegate
            }
        }
    }
</script>