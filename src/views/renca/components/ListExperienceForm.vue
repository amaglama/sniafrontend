<template>
    <div class="p-4 space-y-4">
      <div class="flex gap-x-2"><p>CATEGORIA RECOMENDADA SEGUN LA EXPERIENCIA </p><p class="font-bold">{{ getMinimunCategory(years) }}</p></div>
      <div><p>La experiencia laboral especifica en medio ambiente se suma según el periodo que realizó su experiencia, si se realizó más de una experiencia en un periodo solo se sumará ese periodo, por favor empiece por sus ultimas experiencias realizadas.</p></div>
      <div class="h-fiy overflow-y-auto">
        <div
          v-for="(form, index) in experiencesForm"
          :key="index"
          class="h-fit flex flex-col border border-gray-300 rounded p-4 space-y-2">
          <div class="flex w-full h-fit">
            <ExperienceRowForm 
              :experiences-form="form" 
              :errors="localErrors[index]" 
              :formTypes="formTypes.validationInputs" />
          </div>
          <div class="flex justify-center">
          <ButtonComp
            @click="removeForm(index)"
            color="danger"
            label="Eliminar"
            class-name="border-2"
          />
          </div>
        </div>
      </div>
      <div class="h-fit flex justify-between items-center mx-4">
        <div class="h-12">
          <ButtonComp
            @click="addAndValidateForm"
            label="Agregar Experiencia"
            :icon="mdiPlus"
          />
        </div>
        <div class="flex h-24 border-4 w-40">
          <div class="flex flex-col w-7/12 justify-center px-1">
              <div class="flex justify-between"><strong>días:</strong> <p>{{ currentExperience.days ?? "0" }}</p></div>
              <div class="flex justify-between"><strong>meses:</strong> <p>{{ currentExperience.months ?? "0" }}</p></div>
              <div class="flex justify-between"><strong>años:</strong> <p>{{ currentExperience.years ?? "0" }}</p></div>
          </div>
          <div class="flex w-5/12 justify-center items-center">
            <svg
              :viewBox="'0 0 24 24'"
              class="w-16 h-16 text-emerald-500"
              fill="currentColor">
              <path :d="mdiHeadSnowflakeOutline" />
            </svg>
          </div>
        </div>
      </div>
    </div>
        
  </template>
  
  <script>
  import ExperienceRowForm from "./ExperienceRowForm.vue";
  import ButtonComp from '@/components/essencials/ButtonComp.vue';
  import getYearsOfExperience from '@/stores/utils/getYearsOfExperience';
  import { formatDateInput } from "@/stores/utils/dateFormats";
  import { ref, watch, computed, onMounted  } from "vue";
  import { getMinimunCategory } from "@/stores/constants/constantsRENCA";
  import validationInput from "@/components/forms/validationInput";
  import CardBoxWidget from "@/components/ComponentsOne/CardBoxWidget.vue";
  import { mdiHeadSnowflakeOutline, mdiPlus } from "@mdi/js";
  import BaseIcon from "@/components/ComponentsOne/BaseIcon.vue";
  const names = [
          "consultant",
          "job_title",
          "organization_name",
          "start_date",
          "end_date",
          "description",
          "experienceForm"
      ];
  export default {
    name: "ListExperienceForm",
    components: {
        ExperienceRowForm,
        ButtonComp,
        CardBoxWidget,
        BaseIcon,
    },
    props: {
      experiencesForm: {
        type: Array,
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
      yearsExperience: {
        type: Number,
        required: true
      }
    },
    
    emits: ["update:experiencesForm", 'update:yearsExperience'],
    methods: {
      removeForm(index) {
        this.experiencesForm.splice(index, 1);
      },
    },
    setup(props, {emit}){
      const years = ref(0);
      const localErrors = ref([]); 
      const currentExperience = ref(getYearsOfExperience(props.experiencesForm));
      const localYearsExperience = computed({
        get: () => props.yearsExperience,
        set: (value) => emit('update:yearsExperience', value),
      });
      
      
      watch(() => props.experiencesForm,
        (form, _) => {
          const experience = getYearsOfExperience(form);
          currentExperience.value = experience;
          years.value = Number(experience.years);
          localYearsExperience.value = years.value;
        },
        { deep: true }
      );

      function validateRow(index)  {
        const errors = [];
        for (let name of names){
          if (props.experiencesForm[index][name] === undefined) continue;
            const inputErrors = validationInput(props.experiencesForm[index][name], props.formTypes.validationInputs[name]);
          if (inputErrors.length === 0) continue;
          errors.push({ [name]: inputErrors});
        }
        const errorsValidate =  errors.reduce((acc, current) => {
          return { ...acc, ...current };
        }, {});
        localErrors.value.push(errorsValidate);
        return errors.length === 0;
      }

      function validateAllRows(){
        let isListValid = true;
        localErrors.value = [];
        for (let i = 0; i < props.experiencesForm.length; i++){
          isListValid = isListValid && validateRow(i);
        }
        return isListValid;
      }

      function addAndValidateForm() {
        if (props.experiencesForm.length === 0 || validateAllRows()){
          props.experiencesForm.push({
            consultant: 1,
            job_title: "",
            organization_name: "",
            start_date: formatDateInput(new Date()),
            end_date: formatDateInput(new Date()),
            description: "",
            experienceForm: null,
          });
        }
      }

      onMounted(() =>{
        if (props.experiencesForm.length === 0) addAndValidateForm();
      });
      return { 
        experiencesForm: props.experiencesForm,
        getMinimunCategory,
        years,
        localErrors,
        validateRow,
        addAndValidateForm,
        currentExperience,
        mdiHeadSnowflakeOutline,
        mdiPlus
       };
    },
  };
  </script>
  