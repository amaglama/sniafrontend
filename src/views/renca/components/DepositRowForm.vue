<template>
    <FormField 
      :class-name="'w-full px-16'">
        <div class="flex justify-between items-start gap-x-4 h-24">
            <InputForm 
                v-model="depositForm.amount" 
                type="number" 
                placeholder="Monto" 
                :required="true"
                label="Monto"
                class-name="w-56"
                :errors="errors['amount']"
                :form-types="formTypes['amount']"
            />
            <InputForm 
                v-model="depositForm.deposit_date" 
                type="date" 
                placeholder="Fecha deposito" 
                :required="true"
                label="Fecha deposito"
                class-name="w-42"
                :errors="errors['deposit_date']"
                :form-types="formTypes['deposit_date']"
            />
            <InputForm 
                v-model="depositForm.referenceNumber" 
                type="text" 
                placeholder="Numero de deposito" 
                :required="true"
                label="Número de deposito"
                class-name="w-42 max-xl:w-96"
                :errors="errors['referenceNumber']"
                :form-types="formTypes['referenceNumber']"
            />
        </div>
    </FormField>
</template>

<script>
import FormField from "@/components/forms/formfield/FormField.vue";
import InputForm from "@/components/forms/input/InputForm.vue";
import { ref, watch } from "vue";
export default {
  name: "DepositRowForm",
  components: {
    FormField,
    InputForm,
  },
  props: {
    depositForm: {
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
      errors: localErrors,
      formTypes: props.formTypes
    };
  }
};
</script>
