<template>
    <div class="flex">
        <div class="flex flex-col w-3/4 gap-y-4">
            <div class="flex w-full">
                <div class="flex w-1/2">
                    <p class="flex flex-col justify-start"><TitleForm>NOMBRE:</TitleForm>{{ consultant["name"] }} {{ consultant["last_name"] }} {{ consultant["second_last_name"] }}</p>
                </div>
                <div class="flex flex-col w-1/2">
                    <p><TitleForm>CI:</TitleForm> {{ consultant["identification_document"] }} {{ consultant["ci_complement"] }} {{ consultant["ci_expedited"] }}</p>
                </div>
            </div>
            <div class="flex w-full">
                <div class="flex flex-col w-full">
                    <p class="flex flex-col"><TitleForm>DIRECCION:</TitleForm> {{ consultant["address"] }}</p>
                </div>
            </div>
            <div class="flex w-full justify-start">
                <div class="flex flex-col w-1/2">
                    <p class="flex flex-col"><TitleForm>CELULAR:</TitleForm> {{ consultant["cellphone"] }}</p>
                </div>
                <div class="flex flex-col w-1/2s">
                    <p class="flex flex-col"><TitleForm>TELEFONO:</TitleForm> {{ consultant["telephone"] }}</p>
                </div>
            </div>
            <div class="flex w-full justify-start">
                <div class="flex w-full">
                    <p class="flex flex-col"><TitleForm>EMAIL:</TitleForm> {{ consultant["email"] }}</p>
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
            
            
            <div class="flex w-full justify-start">
                <div class="flex w-full">
                    <p class="flex flex-col"><TitleForm>FECHA SOLICITUD:</TitleForm> {{ formatDateTime(consultant["created_at"]) }}</p>
                </div> 
            </div>
        </div>
        <div class="w-1/4 h-64 bg-gray-400">
            <img :src="consultant['photo']"/>
        </div>
    </div>
    <div v-if="canEditConsultant">
        <ButtonComp
            label="EDITAR"
            v-on:click="() => openEdit = true"
        ></ButtonComp>
    </div>
    <div class="h-0.5 bg-gray-400 rounded-full"></div>
    <div class="flex flex-col h-fit overflow-y-auto gap-y-2">
        <TitleForm>DEPOSITOS</TitleForm>
        <TableComp 
        :headers="[
            {'id' : 'id'},
            {'amount' : 'MONTO'},
            {'deposit_date' : 'FECHA DEPOSITO'},
            {'reference_number' : 'NUMERO DE REFERENCIA'},
        ]" 
        :items="(consultant['deposits'] ?? []).sort((r1,r2) => r1['deposit_date'] < r2['deposit_date'])" 
        :exclude="['id']"
        label="DEPOSITOS"
        :format-cell="{
            'deposit_date': (v) => formatDateInput(v)
        }"
        :options="canEditDeposits? ['update'] : []"
        v-on:click-edit="selectDeposit"
        ></TableComp>
    </div>
    <div class="h-0.5 bg-gray-400 rounded-full"></div>
    <div class="h-fit overflow-y-auto">
        <TitleForm>EXPERIENCIA</TitleForm>
        <TableComp 
        :headers="[
            {'id' : 'id'},
            {'job_title' : 'TITULO'},
            {'organization_name' : 'ORGANIZACION'},
            {'start_date' : 'FECHA INICIO'},
            {'end_date' : 'FECHA FIN'},
            {'state_certificate_doc': 'state_certificate_doc'},
            {'description' : 'DESCRIPCION'},
            
        ]" 
        :items="(consultant['experiences'] ?? []).sort((r1,r2) => r1['end_date'] < r2['end_date'])" 
        :exclude="['id', 'state_certificate_doc']"
        label="DEPOSITOS"
        :class-cell="{
            'description': 'w-96 break-all'
        }"
        :options="canEditExperiences? ['update','see'] : ['see']"
        v-on:click-edit="selectExperience"
        >
        <template #see="{ idSelected }">
            <PdfViewer :pdf-url="(consultant['experiences'] ?? []).find(e => e['id'] === idSelected)"></PdfViewer>
        </template>
    </TableComp>
    </div>
</template>

<script>
    import TableComp from '@/components/table/TableComp.vue';
    import PdfViewer from '@/components/pdf-visualizer/PdfViewer.vue';
    import TitleForm from '@/components/Titles/TitleForm.vue';
    import ButtonComp from '@/components/essencials/ButtonComp.vue';
    import { formatDateInput, formatDateTime } from '@/stores/utils/dateFormats';
    export default {
        components: {
            TableComp,
            TitleForm,
            PdfViewer,
            ButtonComp
        },
        props: {
            form : {
                type: Object,
                default: {}
            },
            selectDeposit: {
                type:Function,
                default: () => {}
            },
            selectExperience: {
                type:Function,
                default: () => {}
            },
            canEditConsultant: {
                type: Boolean,
                default: true
            },
            canEditDeposits: {
                type: Boolean,
                default: true
            },
            canEditExperiences: {
                type: Boolean,
                default: true
            },
        },
        setup (props){
            return {
                consultant: props.form,
                formatDateInput,
                formatDateTime,
                selectDeposit: props.selectDeposit,
                selectExperience: props.selectExperience,
                canEditConsultant: props.canEditConsultant,
                canEditDeposits: props.canEditDeposits,
                canEditExperiences: props.canEditExperiences,
            }
        }
    }
</script>