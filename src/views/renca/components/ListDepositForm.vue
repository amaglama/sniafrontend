<template>
  <div class="p-4 space-y-4">
    <div v-if="typeForm === REGISTRATION">
      CATEGORIA {{ category }} COSTO DE INSCRIPCIÓN: {{ amountsCategories.inscripcion[category] }} BS
    </div>
    <div v-if="typeForm === UPDATE">
      COSTO DE ACTUALIZACIÓN: {{ amountsCategories.actualizacion }} BS
    </div>
    <div v-if="typeForm === RENOVATION">
      COSTO DE RENOVACIÓN: {{ amountsCategories.renovacion[category] }} BS
    </div>
    <div class="h-48 overflow-y-auto">
      <div
        v-for="(form, index) in depositsForm"
        :key="index"
        class="flex justify-between border border-gray-300 rounded pb-4 px-4 h-fit"
      >
        <div class="flex w-5/6">
          <!-- Pasar cada formulario al componente hijo -->
          <DepositRowForm 
            :deposit-form="form" 
            :errors="localErrors[index]" 
            :formTypes="formTypes.validationInputs"/>
        </div>
        <div class="flex w-1/6 items-center">
          <ButtonComp
            @click="removeForm(index)"
            color="danger"
            label="Eliminar"
            class-name="border-2 h-12"
          />
        </div>
      </div>
    </div>
    <div class="h-12">
        <ButtonComp
          @click="addAndValidateForm"
          label="Agregar Deposito"
          :icon="mdiPlus"
        />
    </div>
  </div>
</template>

<script>
import DepositRowForm from './DepositRowForm.vue';
import ButtonComp from '@/components/essencials/ButtonComp.vue';
import { onMounted, ref, } from "vue";
import { amountsCategories, RENOVATION, REGISTRATION, UPDATE } from '@/stores/constants/constantsRENCA';
import validationInput from "@/components/forms/validationInput";
import { getMinimunCategory } from '@/stores/constants/constantsRENCA';
import { formatDateInput } from '@/stores/utils/dateFormats';
import { mdiPlus } from "@mdi/js";
const names = [
          "consultant",
          "bank_account",
          "amount",
          "depositDate",
          "referenceNumber",
          "state",
];

export default {
  name: "ListDepositForm",
  components: {
    DepositRowForm,
    ButtonComp,
  },
  props: {
    depositsForm: {
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
  emits: ["update:depositsForm"],
  methods: {
    removeForm(index) {
      this.depositsForm.splice(index, 1);
    },
  },
  setup(props){
    const localErrors = ref([]); 
    function validateRow(index)  {
        const errors = [];
        for (let name of names){
          //if (name == "bank_account"){}
          if (props.depositsForm[index][name] === undefined) continue;
            const inputErrors = validationInput(props.depositsForm[index][name], props.formTypes.validationInputs[name]);
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
        for (let i = 0; i < props.depositsForm.length; i++){
          isListValid = isListValid && validateRow(i);
        }
        return isListValid;
    }

    function addAndValidateForm() {
      if (validateAllRows()){
        props.depositsForm.push({
          consultant: 1,
          bank_account: 1,
          amount: null,
          deposit_date: formatDateInput(Date()),
          referenceNumber: "",
          state: "PENDING",
        });
      }
    }

    onMounted(()=>{
      if (props.depositsForm.length === 0) addAndValidateForm();
    });

    return {
      addAndValidateForm,
      depositsForm: props.depositsForm,
      localErrors,
      getMinimunCategory,
      amountsCategories,
      mdiPlus,
      typeForm: props.typeForm,
      RENOVATION,
      UPDATE,
      REGISTRATION
    }
  }
};
</script>
