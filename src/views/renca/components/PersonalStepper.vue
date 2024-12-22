<template>
  <div class="flex flex-col">
    <div class="flex justify-center">
      <div class="flex justify-center my-2 min-w-[60vw">
        <div v-for="(_, index) in steps" :key="index" class="flex items-center max-w-sm">
          <div
            class="flex items-center justify-center w-10 h-10 rounded-full border-2"
            :class="{
              'bg-terciary text-white border-terciary': currentStep > index,
              'bg-gray-200 text-gray-500 border-gray-300': currentStep < index,
              'bg-secondary text-white font-bold border-2 border-white': currentStep === index,
            }"
          >
            {{ index + 1 }}
          </div>
          <div
            v-if="index < steps.length - 1"
            class="flex-grow h-2 w-72"
            :class="{
              'bg-terciary': currentStep > index,
              'bg-gray-300': currentStep <= index,
            }"></div>
        </div>
      </div>
    </div>

    <div class="w-full rounded-lg overflow-y-auto h-[40vw]">
      <div>
        <RegistroPersonalStepperForm 
          ref="registroForm" 
          :currentStep="currentStep"
          :type-form="typeForm"/>
      </div>
      <div class="flex justify-center">
        <div class="flex justify-between w-3/5 mt-1">
          <ButtonComp
            @click="prevStep"
            :disabled="currentStep === 0"
            color="contrast"
            label="Anterior"
          />
          <ButtonComp
            @click="validateAndNextStep"
            :disabled="currentStep === steps.length - 1"
            label="Siguiente"
          />
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import ButtonComp from '@/components/essencials/ButtonComp.vue';
import RegistroPersonalStepperForm from '../public_pages/formulario_inscripcion/RegistroPersonalStepperForm.vue';
import { ref } from 'vue';
//import NotificationBar from '@/components/ComponentsOne/NotificationBar.vue';
//import { mdiAccount } from '@mdi/js';
export default {
  name: "PersonalStepper",
  components: {
    RegistroPersonalStepperForm,
    ButtonComp,

  },
  props: {
    typeForm: {
      type: String,
      default: "update",
    }
  },
  setup(props) {
    const steps = [
      { title: 'Paso 1' },
      { title: 'Paso 2' },
      { title: 'Paso 3' },
      { title: 'Paso 4' },
    ];
    const currentStep = ref(0);
    const errorData = ref(false);
    const registroForm = ref(null);
    const validateAndNextStep = async () => {
      const isValid = await registroForm.value?.validateStep?.(currentStep.value);
      if (isValid) {
        if (currentStep.value < steps.length - 1) {
          currentStep.value++;
        }
      } else {
        errorData.value = true;
      }
    };

    const prevStep = () => {
      if (currentStep.value > 0) {
        currentStep.value--;
      }
    };

    return {
      steps,
      currentStep,
      registroForm,
      validateAndNextStep,
      prevStep,
      errorData,
      typeForm: props.typeForm
    };
  },
};
</script>
