<template>
    <div class="flex flex-col text-xl">
        <div 
            :class="`flex justify-center font-bold text-3xl p-4 rounded-t-xl border border-green-700 bg-green-400 text-green-700`">
            <p>VISTA PREVIA {{ typeConsultantForm }} N° {{ consultant["request_code"] }}</p>
        </div>
        <div class="flex flex-col bg-gray-50 w-full h-fit gap-y-4 p-16 border border-gray-700">
            <div class="flex">
                <div class="flex flex-col w-3/4 gap-y-4 max-xl:w-5/6">
                    <div class="flex w-full flex-wrap">
                        <div class="flex w-1/3 max-xl:w-full">
                            <p class="flex flex-col justify-start break-all"><TitleForm>NOMBRE:</TitleForm>{{ consultant["user_name"] }} {{ consultant["last_name"] }} {{ consultant["second_last_name"] }}</p>
                        </div>
                        <div class="flex flex-col w-1/3 max-xl:w-1/2">
                            <p><TitleForm>N. DE IDENTIDAD:</TitleForm> {{ consultant["identification_document"] }} {{ consultant["ci_complement"] }} {{ consultant["ci_expedited"] }}</p>
                        </div>
                        <div class="flex flex-col w-1/3 max-xl:w-1/2">
                            <p><TitleForm>DOC. DE IDENTIDAD:</TitleForm> {{ consultant["type_identification_document"] }}</p>
                        </div>
                    </div>
                    <div class="flex w-full">
                        <div class="flex flex-col w-1/2">
                            <div class="flex flex-col">
                                <div class="flex gap-x-2">
                                    <TitleForm>DIRECCION:</TitleForm>
                                    <p class="opacity-50">{{ ` ${consultant["visible_address"]? 'visible': 'no visible'}`  }}</p>
                                </div>
                                <p>{{ consultant["address"] }}</p>
                            </div>
                        </div>
                        <div class="flex flex-col w-1/2">
                            <p class="flex flex-col"><TitleForm>DEPARTAMENTO:</TitleForm> {{ consultant["state"] }}</p>
                        </div>
                    </div>
                    <div class="flex w-full">
                        <div class="flex flex-col w-1/2">
                            <p class="flex flex-col"><TitleForm>MUNICIPIO:</TitleForm> {{ consultant["municipality"] }}</p>
                        </div>
                        <div class="flex flex-col w-1/2">
                            <p class="flex flex-col"><TitleForm>PROVINCIA:</TitleForm> {{ consultant["province"] }}</p>
                        </div>
                    </div>
                    <div class="flex w-full justify-start">
                        <div class="flex flex-col w-1/2">
                            <div class="flex flex-col">
                                <div class="flex gap-x-2">
                                    <TitleForm>CELULAR:</TitleForm>
                                    <p class="opacity-50">{{ ` ${consultant["visible_cellphone"]? 'visible': 'no visible'}`  }}</p>
                                </div>
                                <p>{{ consultant["cellphone"] }}</p>
                            </div>
                        </div>
                        <div class="flex flex-col w-1/2s">
                            <div class="flex flex-col">
                                <div class="flex gap-x-2">
                                    <TitleForm>TELEFONO:</TitleForm>
                                    <p class="opacity-50">{{ ` ${consultant["visible_telephone"]? 'visible': 'no visible'}`  }}</p>
                                </div>
                                <p>{{ consultant["telephone"] }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="flex w-full justify-start">
                        <div class="flex w-full">
                            <div class="flex flex-col">
                                <div class="flex gap-x-2">
                                    <TitleForm>EMAIL:</TitleForm>
                                    <p class="opacity-50">{{ ` ${consultant["visible_email"]? 'visible': 'no visible'}`  }}</p>
                                </div>
                                <p>{{ consultant["email"] }}</p>
                            </div>
                        </div> 
                    </div>
                    <div class="flex w-full">
                        <div class="flex w-1/2">
                            <p class="flex flex-col"><TitleForm>PROFESION:</TitleForm> {{ consultant["national_certificate"] }}</p>
                        </div>
                        <div class="flex w-1/2">
                            <p class="flex flex-col"><TitleForm>FECHA EMISION:</TitleForm> {{ formatDateInput(consultant["emition_date"]) }}</p>
                        </div>
                    </div>
                    <div class="flex w-full">
                        <div class="flex w-1/2">
                            <p class="flex flex-col"><TitleForm>TIPO DE CONSULTANTE:</TitleForm> {{ consultant["consultant_type"] }}</p>
                        </div>
                        <div class="flex w-1/2">
                            <p class="flex flex-col"><TitleForm>CATEGORIA:</TitleForm> {{ consultant["category"] }}</p>
                        </div>
                    </div>
                    <div class="flex w-full">
                        <div class="flex w-1/2">
                            <p class="flex flex-col">
                                <TitleForm>FOTOCOPIA N. DE IDENTIDAD:</TitleForm> 
                                {{ consultant["identification_document_file"]?.name ?? "" }} 
                                <svg
                                    :viewBox="'0 0 24 24'"
                                    class="w-8 h-8 text-red-400"
                                    fill="currentColor">
                                    <path :d="mdiFile" />
                                </svg>
                            </p>
                        </div>
                        <div class="flex w-1/2">
                            <p class="flex flex-col">
                                <TitleForm>DOCUMENTO TITULO PROFESIONAL:</TitleForm> 
                                {{ consultant["national_certificate_file"]?.name ?? "" }}
                                <svg
                                    :viewBox="'0 0 24 24'"
                                    class="w-8 h-8 text-red-400"
                                    fill="currentColor">
                                    <path :d="mdiFile" />
                                </svg>
                            </p>
                            
                        </div>
                    </div>
                </div>
                <div class="w-1/4 h-64 max-xl:w-1/6 max-xl:h-1/6 bg-gray-400">
                    <img :src="imageSrc"/>
                </div>
            </div>
            <div class="h-0.5 bg-gray-400 rounded-full"></div>
            <div class="flex flex-col h-fit overflow-y-auto gap-y-2">
                <TitleForm>DEPOSITOS</TitleForm>
                <TableComp 
                :headers="[
                    {'amount' : 'MONTO'},
                    {'deposit_date' : 'FECHA DEPOSITO'},
                    {'referenceNumber' : 'NUMERO DE REFERENCIA'},
                ]" 
                :items="(consultant['deposits'] ?? []).sort((r1,r2) => r1['deposit_date'] < r2['deposit_date'])" 
                label="DEPOSITOS"
                :format-cell="{
                    'deposit_date': (v) => formatDateTime(v)
                }"
                ></TableComp>
            </div>
            <div class="h-0.5 bg-gray-400 rounded-full"></div>
            <div class="h-fit overflow-y-auto">
                <TitleForm>EXPERIENCIA</TitleForm>
                <TableComp 
                :headers="[
                    {'job_title' : 'TITULO'},
                    {'organization_name' : 'ORGANIZACION'},
                    {'start_date' : 'FECHA INICIO'},
                    {'end_date' : 'FECHA FIN'},
                    {'state_certificate_doc': 'state_certificate_doc'},
                    {'description' : 'DESCRIPCION'},
                    
                ]" 
                :items="(consultant['experiences'] ?? []).sort((r1,r2) => r1['end_date'] < r2['end_date'])" 
                :exclude="['state_certificate_doc']"
                label="DEPOSITOS"
                :class-cell="{
                    'description': 'w-96 break-all'
                }"
                :options="['see']"
                >
                <template #see="{ idSelected }">
                    <PdfViewer :pdf-url="(consultant['experiences'] ?? []).find(e => e['id'] === idSelected)"></PdfViewer>
                </template>
            </TableComp>
            </div>
        </div>

    </div>
</template>

<script>
    import { ref } from 'vue';
    import { formatDateTime, formatDateInput } from '@/stores/utils/dateFormats';
    import ButtonComp from '@/components/essencials/ButtonComp.vue';
    import TitleForm from '@/components/Titles/TitleForm.vue';
    import TableComp from '@/components/table/TableComp.vue';
    import CheckForm from '@/components/forms/Switch/CheckForm.vue';
    import InputForm from '@/components/forms/input/InputForm.vue';
    import CardBoxModal from '@/components/ComponentsOne/CardBoxModal.vue';
    import PdfViewer from '@/components/pdf-visualizer/PdfViewer.vue';
    import { mdiFile } from '@mdi/js'
    export default{
        components: {
            ButtonComp,
            TitleForm,
            TableComp,
            CheckForm,
            CardBoxModal,
            PdfViewer,
            InputForm,
        },
        props: {
            consultantPreview: {
                type: Object,
                required: true
            },
            typeConsultantForm: {
                type: String,
                default: "REGISTRO"
            }
        },
        setup(props){
            const consultant = ref(props.consultantPreview);

            const imageSrc = ref(null);
            
            if (consultant.value['image'] && consultant.value['image'] != null) {
                
                const reader = new FileReader();
                reader.onload = () => {
                    imageSrc.value = reader.result;
                };
                reader.onerror = () => {
                console.error("Error al leer el archivo.");
                };
                reader.readAsDataURL(consultant.value['image']);
            } else {
                imageSrc.value = null;
            }
            return {
                consultant,
                formatDateTime,
                formatDateInput,
                imageSrc,
                mdiFile,
            };
        }
    }
</script>