<template>
    <CardBoxModal v-if="openEdit" v-model="openEdit" :title="'Experiencia'" button-label="VOLVER" class="h-full" button="primary" className="w-[80vw] h-[70vw]">
        <ConsultantEdit :id-selected="consultant['id']"></ConsultantEdit>
    </CardBoxModal>
    <CardBoxModal v-if="isDepositOpen" v-model="isDepositOpen" :title="label" button-label="VOLVER" class="h-full" button="primary" className="h-fit w-[30vw]">
        <DepositEdit 
            :deposit="deposit" 
            :close-deposit="() => {
                isDepositOpen = false;
                loadConsultant();
            }">
        </DepositEdit>
    </CardBoxModal>
    <CardBoxModal v-if="isExperienceOpen" v-model="isExperienceOpen" :title="'Deposito'" button-label="VOLVER" class="h-full" button="primary" className="h-fit w-[30vw]">
        <ExperienceEdit 
            :experience="experience"
            :close-experience="() => {
                isExperienceOpen = false;
                loadConsultant();
            }">
        </ExperienceEdit>
    </CardBoxModal>

    <CardBoxModal 
        v-if="confirmConsultant"
        v-model="confirmConsultant" 
        title="Desea registrar el consultante." 
        button="info" 
        button-label="Si"
        cancel-label="No aún"
        :has-cancel="true"
        :on-confirm="validateAndSubmit"
        class-name="h-fit">
        <p>¿Desea habilitar este registro?</p>
    </CardBoxModal>

    <CardBoxModal 
        v-if="denyConsultant"
        v-model="denyConsultant" 
        title="Desea denegar el consultante" 
        button="info" 
        button-label="Si"
        cancel-label="Volver"
        :has-cancel="true"
        :on-confirm="denyConsultantFunc"
        :on-cancel="() => reasonDeny = ''"
        class-name="h-fit w-[40vw]"
        :on-disabled-confirm="reasonDeny === ''">
        <div class="flex flex-col gap-y-4">
            <div class="h-fit">
                <p v-if="!isApproved.note">• No se marco nota de solicitud de inscripción.</p>
                <p v-if="!isApproved.work_certificades">• No se marco certificados de Trabajo de Consultoría Ambiental.</p>
                <p v-if="!isApproved.photo">• No se marco fotografía actualizada digital en formato jpg, a color, fondo azul. </p>
                <p v-if="!isApproved.deposit">• No se marco  comprobante de Depósito Bancario Original. </p>
            </div>
            <div class="h-52 overflow-y-auto">
                <InputForm
                    v-model="reasonDeny"
                    label="RAZÓN"
                    placeholder="INGRESE A LA RAZÓN"
                    type="textarea"
                    :is-to-upper-case="false">
                </InputForm>
            </div>
        </div>
    </CardBoxModal>

    <div class="flex flex-col text-xl">
        <div 
            :class="`flex justify-center font-bold text-3xl p-4 rounded-t-xl
                ${ (typeConsultantForm == 'REGISTRO'? 'bg-green-200 text-green-700 border border-green-700' : 
                        typeConsultantForm == 'ACTUALIZACION'? 'bg-sky-200 text-sky-700 border border-sky-700':'bg-amber-200 text-amber-700 border border-amber-700'  ) }`">
            <p>SOLICITUD DE {{ typeConsultantForm }} N° {{ consultant["request_code"] }}</p>
        </div>
        <div class="flex flex-col bg-gray-50 w-full h-fit gap-y-4 p-16 border border-gray-700 mb-4">
            <ConsultantView
                v-if="Object.entries(consultant).length > 0"
                :form="consultant"
                :select-deposit="selectDeposit"
                :select-experience="selectExperience"
            ></ConsultantView>
            <div :class="`h-0.5 bg-gray-400 rounded-full`"></div>
            <div>
                <TitleForm>REQUISITOS</TitleForm>
                <div :class="`flex flex-col w-full border-4 h-fit gap-y-4 px-4 ${ (isApprovedAll)? 'border-green-400' : 'border-gray-400' }`">
                    <div class="flex w-full h-12">
                        <div class="flex w-1/12 justify-center">
                            N°
                        </div>
                        <div class="flex w-9/12 justify-center">
                            Requisitos
                        </div>
                        <div class="flex w-2/12 justify-center">
                            Cumple
                        </div>
                    </div>
                    <div class="flex w-full">
                        <div class="w-1/12">
                            1
                        </div>
                        <div class="w-9/12">
                            Nota de solicitud de inscripción, dirigida a la Dirección General de Medio Ambiente y Cambios Climáticos, debidamente firmada por el solicitante, adjuntando el Formulario de Solicitud de Inscripción obtenido del Sistema Nacional de Información Ambiental (http://snia.mmaya.gob.bo), en calidad de Declaración Jurada.
                        </div>
                        <div class="flex w-2/12 justify-center">
                            <CheckForm
                                name="note"
                                label=""
                                v-model="isApproved.note"
                                type="checkbox"
                                class-name="">
                            </CheckForm>
                        </div>
                    </div>
                    <div class="flex w-full">
                        <div class="w-1/12">
                            2
                        </div>
                        <div class="w-9/12">
                            Copia de Título Profesional.
                        </div>
                        <div class="flex w-2/12 justify-center">
                            <CheckForm
                                name="work_certificades"
                                label=""
                                v-model="isApproved.work_certificades"
                                type="checkbox"
                                class-name="">
                            </CheckForm>
                        </div>
                    </div>
                    <div class="flex w-full">
                        <div class="w-1/12">
                            3
                        </div>
                        <div class="w-9/12">
                            Fotografía digital reciente en formato JPG, con dimensiones de 4x4, fondo azul, sin el uso de gafas ni sombreros.
                        </div>
                        <div class="flex w-2/12 justify-center">
                            <CheckForm
                                name="photo"
                                label=""
                                v-model="isApproved.photo"
                                type="checkbox"
                                class-name="">
                            </CheckForm>
                        </div>
                    </div>
                    <div class="flex w-full">
                        <div class="w-1/12">
                            4
                        </div>
                        <div class="w-9/12">
                            Comprobante de Depósito Bancario Original, que indique el número de depósito.
                        </div>
                        <div class="flex w-2/12 justify-center">
                            <CheckForm
                                name="deposit"
                                label=""
                                v-model="isApproved.deposit"
                                type="checkbox"
                                class-name="">
                            </CheckForm>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex justify-evenly">
            <ButtonComp
                label="VALIDAR"
                v-on:click="openConfirmConsultant"
                :disabled="!isApprovedAll"
                class-name="rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            </ButtonComp>
            <ButtonComp
                label="DENEGAR"
                :disabled="isApprovedAll"
                v-on:click="openDenyConsultant"
                class-name="bg-warning border-red-400 rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            </ButtonComp>
        </div>

    </div>
</template>

<script>
    import { getConsultant } from '@/services/renca';
    import { ref, onMounted, reactive, watch } from 'vue';
    import { formatDateTime, formatDateInput } from '@/stores/utils/dateFormats';
    import ButtonComp from '@/components/essencials/ButtonComp.vue';
    import TitleForm from '@/components/Titles/TitleForm.vue';
    import CheckForm from '@/components/forms/Switch/CheckForm.vue';
    import InputForm from '@/components/forms/input/InputForm.vue';
    import { encryptMe } from '@/stores/utils/encryption';
    import CardBoxModal from '@/components/ComponentsOne/CardBoxModal.vue';
    import ConsultantEdit from './ConsultantEdit.vue';
    import DepositEdit from './DepositEdit.vue';
    import ExperienceEdit from './ExperienceEdit.vue';
    import { validateConsultant, denyConsultantValidation } from '@/services/renca';
    import ConsultantView from '../components/consultant/ConsultantView.vue';

    export default{
        components: {
            ButtonComp,
            TitleForm,
            CheckForm,
            CardBoxModal,
            ConsultantEdit,
            DepositEdit,
            ExperienceEdit,
            InputForm,
            ConsultantView
        },
        props: {
            idSelected: {
                type: Number,
                required: true
            },
            typeConsultantForm: {
                type: String,
                default: "REGISTRO"
            }
        },
        setup(props){
            const isApproved = reactive({
                note: false,
                work_certificades: false,
                photo: false,
                deposit: false
            });
            const consultant = ref({});
            const openEdit = ref(false);
            const confirmConsultant = ref(false);
            const denyConsultant = ref(false);
            const isApprovedAll = ref(false);
            const isDepositOpen = ref(false);
            const deposit = ref({});
            const isExperienceOpen = ref(false);
            const reasonDeny = ref("");
            const experience = ref({});
            const error = ref("");

            const topics = [
                    `• No se marco nota de solicitud de inscripción.`,

                    `• No se marco certificados de Trabajo de Consultoría Ambiental.`,

                    `• No se marco fotografía actualizada digital en formato jpg, a color, fondo azul.`,

                    `• No se marco comprobante de Depósito Bancario Original.`,
            ];


            watch(() => Object.values(isApproved), (newForm)=>{
                isApprovedAll.value = newForm.reduce((a, b) => a && b, true);
            }, {deep: true});
            /*
            watch(error, (newValue) => {
                //console.log(newValue);
            })
                */

            const loadConsultant = async () => {
                if (props.idSelected !== null && props.idSelected !== -1) {
                    const consultantEdit = await getConsultant(props.idSelected);
                    consultant.value = consultantEdit;
                }
                
            };

            onMounted(() => {
                loadConsultant();
            });

            function openConfirmConsultant(){
                if (!isApprovedAll.value) return;
                confirmConsultant.value = true;
            }

            function openDenyConsultant(){
                if (isApprovedAll.value) return;
                denyConsultant.value = true;
                reasonDeny.value = "No se pudo realizar su aprobación por los siguientes motivos:\n";
                if (!isApproved.note){
                    reasonDeny.value = `${reasonDeny.value}${topics[0]}\n`
                }
                if (!isApproved.work_certificades){
                    reasonDeny.value = `${reasonDeny.value}${topics[1]}\n`
                }
                if (!isApproved.photo){
                    reasonDeny.value = `${reasonDeny.value}${topics[2]}\n`
                }
                if (!isApproved.deposit){
                    reasonDeny.value = `${reasonDeny.value}${topics[3]}\n`
                }
                
            }

            async function validateAndSubmit(){
                if (isApprovedAll.value){
                    await validateConsultant(consultant.value);
                }
            }

            async function denyConsultantFunc(){
                await denyConsultantValidation(consultant.value, reasonDeny.value);
            }

            function selectDeposit(item){
                deposit.value = item;
                isDepositOpen.value = true;
            }

            function selectExperience(item){
                experience.value = item;
                isExperienceOpen.value = true;
            }

            
            return {
                consultant,
                formatDateTime,
                formatDateInput,
                isApproved,
                isApprovedAll,
                encryptMe,
                openEdit,
                confirmConsultant,
                openConfirmConsultant,
                openDenyConsultant,
                validateAndSubmit,
                isDepositOpen,
                deposit,
                selectDeposit,
                experience,
                isExperienceOpen,
                selectExperience,
                loadConsultant,
                denyConsultant,
                denyConsultantFunc,
                reasonDeny,
            };
        }
    }
</script>

<style>
    .dot {
        height: 25px;
        width: 25px;
        background-color: #bbb;
        border-radius: 50%;
        display: inline-block;
    }
</style>