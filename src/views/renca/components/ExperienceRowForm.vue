<template>
        <div :class="`flex flex-wrap w-full gap-y-2 px-4 h-fit ${experiencesForm['start_date'] > experiencesForm['end_date']?'border-warning':''}`">
            <div class="flex flex-wrap w-full justify-between">
              <InputForm 
                  v-model="experiencesForm.job_title" 
                  type="text" 
                  placeholder="Titulo de trabajo" 
                  :required="true"
                  label="Titulo de trabajo"
                  class-name="w-64"
                  :errors="errors['job_title']"
                  :form-types="formTypes['job_title']"
              />
              <InputForm 
                  v-model="experiencesForm.organization_name" 
                  type="text" 
                  placeholder="Nombre organizacion" 
                  :required="true"
                  label="Nombre organizacion"
                  class-name="w-48"
                  :errors="errors['organization_name']"
                  :form-types="formTypes['organization_name']"
              />
              <InputForm 
                  v-model="experiencesForm.start_date" 
                  type="date" 
                  placeholder="Fecha inicio" 
                  :required="true"
                  label="Fecha inicio"
                  class-name="w-42"
                  :errors="errors['start_date']"
                  :form-types="formTypes['start_date']"
                  :max="formatDateInput(Date())"
                  min="1901-01-01"
                  :validate-func="(value) => {
                    return value < experiencesForm['end_date']
                  }"
              />
              <InputForm 
                  v-model="experiencesForm.end_date" 
                  type="date" 
                  placeholder="Fecha fin" 
                  :required="true"
                  label="Fecha fin"
                  class-name="w-42"
                  :errors="errors['end_date']"
                  :form-types="formTypes['end_date']"
                  :max="formatDateInput(Date())"
                  min="1901-01-01"
                  
              />
            </div>
            <div class="flex w-full justify-between gap-x-4 pt-2">
              <FileForm
                v-model="experiencesForm.experienceForm"
                label="Certificado de trabajo"
                :required="true"
                :errors="errors['experienceForm']"
                :form-types="formTypes['experienceForm']"
                :max-size-file="MAX_FILE_SIZE"
                :files-allowed="filesAllowed"
              />
            </div>
            <div class="flex flex-wrap w-full justify-between gap-x-4 h-40">
              <InputForm 
                v-model="experiencesForm.description" 
                type="textarea" 
                placeholder="Descripcion" 
                :required="true"
                :errors="errors['description']"
                :form-types="formTypes['description']"
                label="Descripcion"
                class-name="w-full"
              />
            </div>      
        </div>

</template>

<script>
import FormField from "@/components/forms/formfield/FormField.vue";
import InputForm from "@/components/forms/input/InputForm.vue";
import FileForm from "@/components/forms/file/FileForm.vue";
import { formatDateInput } from "@/stores/utils/dateFormats";
import { ref, watch } from "vue";
import { filesAllowed } from "@/stores/constants/constantsRENCA";
import { MAX_FILE_SIZE } from "@/stores/constants/constantsRENCA";
export default {
  name: "ExperienceRowForm",
  components: {
    FormField,
    InputForm,
    FileForm,
  },
  props: {
    experiencesForm: {
      type: Object,
      required: true,
    },
    errors: {
        type: Object,
        default: {}
      },
    formTypes: {
        type: Object,
        default: {}
      },
  },
  setup(props){
    const localErrors = ref(props.errors);
    watch(() => props.errors,
        (errors, _) => {
          localErrors.value = errors;
        },
    );
    return {
      formatDateInput,
      errors: localErrors,
      formTypes: props.formTypes,
      filesAllowed,
      MAX_FILE_SIZE
    };
  }
};
</script>