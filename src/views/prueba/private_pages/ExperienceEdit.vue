<template>
    <FormComp
        :form="localExperience"
        :form-types="formTypes"
        :form-errors="formErrors"
        :class-name="'w-[90vw]'"
        :title="`${typeExperienceForm === 'update'? 'EDITAR': 'CREAR'} EXPERIENCIA`"
        :label-submit="typeExperienceForm === 'update'? 'EDITAR': 'CREAR'"
        :prev-success="prevSuccess"
        :on-send-data-form="toDataFormExperience"
        :put-url="putUrl"
        :data-form-func="experienceFormData"
        :on-send-files="toDataFormFiles"
        :is-edit="typeExperienceForm === 'update'"
        :is-data-form="true"
        :wait-time="1000"
        @update:formErrors="handleFormErrors">
    <div class="flex w-full flex-wrap">
        <div class="flex flex-col w-1/2">
            <TitleForm>Titulo</TitleForm>
            <div class="flex w-full">
                <InputForm
                    name="job_title"
                    v-model="localExperience.job_title" 
                    type="text" 
                    placeholder="Titulo de trabajo" 
                    :required="true"
                    :errors="formErrors['job_title']"
                    :form-types="formTypes['job_title']"
                    />
            </div>
        </div>
        <div class="flex flex-col w-1/2">
            <TitleForm>Nombre organización</TitleForm>
            <div class="flex w-full">
                <InputForm
                    name="organization_name"
                    v-model="localExperience.organization_name" 
                    type="text" 
                    placeholder="Nombre organización" 
                    :required="true"
                    :errors="formErrors['organization_name']"
                    :form-types="formTypes['organization_name']"
                    />
            </div>
        </div>
        <div class="flex flex-col w-1/2">
            <TitleForm>Fecha inicio</TitleForm>
            <div class="flex w-full">
                <InputForm
                    name="start_date"
                    v-model="localExperience.start_date" 
                    type="date" 
                    placeholder="Fecha de inicio" 
                    :required="true"
                    :errors="formErrors['start_date']"
                    :form-types="formTypes['start_date']"
                     />
            </div>
        </div>
        <div class="flex flex-col w-1/2">
            <TitleForm>Fecha fin</TitleForm>
            <div class="flex w-full">
                <InputForm
                    name="end_date"
                    v-model="localExperience.end_date" 
                    type="date" 
                    placeholder="Fecha fin" 
                    :required="true"
                    :errors="formErrors['end_date']"
                    :form-types="formTypes['end_date']"
                     />
            </div>
        </div>
        <div class="flex flex-col w-full">
            <TitleForm>Descripción</TitleForm>
            <div class="flex w-full">
                <InputForm
                    name="description"
                    v-model="localExperience.description" 
                    type="textarea" 
                    placeholder="Descripción" 
                    :required="true"
                    :errors="formErrors['description']"
                    :form-types="formTypes['description']"
                    class-name="w-full"
                     />
            </div>
        </div>
        <div class="flex flex-col w-1/2">
            <TitleForm>Fecha fin</TitleForm>
            <div class="flex w-full">
                <FileForm
                    v-model="localExperience.certificate_file"
                    label="Certificado de trabajo"
                    :required="true"
                    :errors="formErrors['certificate_file']"
                    :form-types="formTypes['certificate_file']"
                    :max-size-file="MAX_FILE_SIZE"
                    :files-allowed="filesAllowed"
                    />
            </div>
        </div>
    </div>

    </FormComp>
</template>

<script>
    import { reactive, ref } from 'vue';
    import { formatDateTime, formatDateInput } from '@/stores/utils/dateFormats';
    import TitleForm from '@/components/Titles/TitleForm.vue';
    import TableComp from '@/components/table/TableComp.vue';
    import FormComp from '@/components/forms/FormComp.vue';
    import InputForm from '@/components/forms/input/InputForm.vue';
    import ImageUploaderForm from '@/components/forms/ImageUploader/ImageUploaderForm.vue';
    import FileForm from '@/components/forms/file/FileForm.vue';
    import { filesAllowed, MAX_FILE_SIZE } from '@/stores/constants/constantsRENCA';
    import { APIS } from '@/stores/constants/urlsBackEnd';
    import { validationInputField } from '@/components/forms/validationInput';
    import { MAX_LONG_LENGTH_INPUT, MAX_DESCRIPTION_INPUT  } from '@/stores/constants/pages';

    const consultant = ref({});
    export default{
        components: {
            TitleForm,
            TableComp,
            FormComp,
            InputForm,
            ImageUploaderForm,
            FileForm
        },
        props: {
            experience: {
                type: Number,
                required: true
            },
            typeExperienceForm: {
                type: String,
                default: "update"
            },
            closeExperience:  {
                type: Function,
                default: () => {}
            },
        },
        setup(props){
            const putUrl = `${APIS.EXPERIENCIAS.PUT}${props.experience.id}/`;
            const localExperience = ref({
                "id": props.experience.id,
                "description": props.experience.description,
                "start_date": props.experience.start_date,
                "end_date": props.experience.end_date,
                "certificate_file": props.experience.certificate_file,
                "organization_name": props.experience.organization_name,
                "job_title": props.experience.job_title,
                "consultant": props.experience.consultant,
            })
            const formTypes = {
                id: validationInputField("number", false),
                consultant: validationInputField("number", false),
                job_title: validationInputField("text", true, MAX_LONG_LENGTH_INPUT),
                organization_name: validationInputField("text", true, MAX_LONG_LENGTH_INPUT),
                start_date: validationInputField("date", true, MAX_LONG_LENGTH_INPUT),
                end_date: validationInputField("date", true, MAX_LONG_LENGTH_INPUT),
                description: validationInputField("text", true, MAX_DESCRIPTION_INPUT),
                certificate_file: validationInputField("file", true),
            };
            const formErrors = reactive({
                id: [],
                consultant: [],
                job_title: [],
                organization_name: [],
                start_date: [],
                end_date: [],
                description: [],
                certificate_file: [],
            });

            function toDataFormExperience(form){
                return {
                    "id": form["id"],
                    "consultant": form["consultant"],
                    "job_title": form["job_title"],
                    "organization_name": form["organization_name"],
                    "start_date": formatDateInput(form["start_date"]),
                    "end_date": formatDateInput(form["end_date"]),
                    "description": form["description"],
                }
            }
            function toDataFormFiles(form){
                return [
                    form["certificate_file"]
                ];
            }
            function prevSuccess(){
                props.closeExperience();
            }
            function experienceFormData(values, files){
                const formData = new FormData();
                for (let value in values){
                    formData.append(value, values[value])
                }
                formData.append(`certificate_file]`, files[0]);
                return formData;
            }

            const handleFormErrors = (errors) => {
                Object.keys(formErrors).forEach((key) => {
                    formErrors[key] = errors[key] || [];
                });
            };
            return {
                consultant,
                formatDateTime,
                formatDateInput,
                formTypes,
                formErrors,
                localExperience,
                filesAllowed,
                prevSuccess,
                putUrl,
                toDataFormExperience,
                experienceFormData,
                toDataFormFiles,
                handleFormErrors,
                MAX_FILE_SIZE
            };
        }
    }
</script>