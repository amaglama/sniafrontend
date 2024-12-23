<script setup>
import { mdiAccount, mdiFolderUpload, mdiCheck, mdiDelete, mdiCog } from '@mdi/js'
import SectionMain from '@/components/ComponentsOne/SectionMain.vue'
import CardBox from '@/components/ComponentsOne/CardBox.vue'
import BaseButton from '@/components/ComponentsOne/BaseButton.vue'
import BaseButtons from '@/components/ComponentsOne/BaseButtons.vue'
//import SectionTitle from '@/components/ComponentsOne/SectionTitle.vue'
import SectionTitleLineWithButton from '@/components/ComponentsOne/SectionTitleLineWithButton.vue'
import validationInput from './validationInput'
import goTo from '@/stores/utils/goRoute'
import { ref, computed, watch } from 'vue'
import { defaultDataToFormData, http, httpData } from '@/services/https';
import { waitAndExecute } from '@/stores/utils/waitAndExecute';
import NotificationBar from '../ComponentsOne/NotificationBar.vue'
import CardBoxModal from '../ComponentsOne/CardBoxModal.vue'
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  form: {
    type: Object,
    default: null,
    required: true
  },
  formTypes: {
    type: Object,
    default: null,
    required: true
  },
  formErrors: {
    type: Object,
    default: null,
    required: true
  },
  labelSubmit: {
    type: String,
    default: "CONFIRMAR",
  },
  hiddenSubmit: {
    type: Boolean,
    default: false,
  },
  disabledSubmit: {
    type: Boolean,
    default: false
  },
  iconLeft: {
    type: String,
    default: mdiAccount,
  },
  iconRight: {
    type: String,
    default: mdiCog,
  },
  redirectTo: {
    type: String,
    default: "/",
  },
  postUrl: {
    type: String,
    default: ""
  },
  putUrl: {
    type: String,
    default: ""
  },
  deleteUrl: {
    type: String,
    default: ""
  },
  isEdit: {
    type: Boolean,
    default: false
  },
  onSend: {
    type: Function,
    default: (form) => form
  },
  onSendDataForm: {
    type: Function,
    default: (form) => form
  },
  dataFormFunc: {
    type: Function,
    default: defaultDataToFormData
  },
  onSendFiles: {
    type: Function,
    default: (form) => form
  },
  isDataForm: {
    type: Boolean,
    default: false,
  },
  prevSuccess: {
    type: Function,
    default: async () => {}
  },
  loadingAlert: {
    type: String,
    default: ""
  },
  successAlert: {
    type: String,
    default: ""
  },
  errorData: {
    type: String,
    default: ""
  },
  className: {
    type: String,
    default: ""
  },
  waitTime: {
    type: Number,
    default: 2000
  },
});

const loadingData = ref(props.loadingAlert);
const errorData = ref(props.errorData);
const successData = ref(props.successAlert);
const isModalDeleteActive = ref(false);

const emit = defineEmits(['update:formErrors']); // Declarar emisor de eventos

watch(() => props.loadingAlert,
  (newValue) => {
    loadingData.value = newValue;
  }
);

watch(() => props.errorData,
  (newValue) => {
    errorData.value = newValue;
  }
);

watch(() => props.successAlert,
  (newValue) => {
    successData.value = newValue;
  }
);

const redirect = computed({
  get: () => props.redirectTo
});

const isEdit = computed({
  get: () => props.isEdit
});
const postUrl = computed({
  get: () => props.postUrl
});

const putUrl = computed({
  get: () => props.putUrl
});
const deleteUrl = computed({
  get: () => props.deleteUrl
});

const validateForm = () => {
  const errors = {};
  for (let name in props.form) {
    const inputErrors = validationInput(props.form[name], props.formTypes[name]);
    
    if (inputErrors.length > 0) {
      errors[name] = inputErrors;
    }
  }
  emit('update:formErrors', errors);
  return errors;
};

function post(form)
{

  try{

    if (!props.isDataForm){
      console.log(datas,files);
      http.post(postUrl.value, props.onSend(form), false,  {}, errorData);
    }
    else{
      const datas = props.onSendDataForm(form);
      const files = props.onSendFiles(form);
      console.log(datas,files);
      
      httpData.post(postUrl.value, datas, files, false, {}, errorData, props.dataFormFunc, true);
    }
  }
  catch (e){
   console.error(e);
  }
  
}

function put(form)
{
  try{
    if (!props.isDataForm){
      http.put(`${putUrl.value}${form.id}`, form, false, {}, errorData);
    }
    else{
      const datas = props.onSendDataForm(form);
      const files = props.onSendFiles(form);
      httpData.put(`${putUrl.value}${form.id}`, datas, files, false, {}, errorData, props.dataFormFunc, true);
    }
  }
  catch (e){
   console.error(e);
  }
}

function deleteItem(id)
{
  http.delete(`${deleteUrl.value}${id}/`, false, {}, errorData);
}


const validateAndSubmit = () => {
    const errors = validateForm(); 
    
    if (Object.keys(errors).length > 0){
      console.log("Ingreso....", errors);
      
        return;
    }
    if (!isEdit.value && postUrl === ""){
      return;
    }
    if (isEdit.value && putUrl === ""){
      return;
    }
    loadingData.value = "Guardando datos.";
console.log(props.form);

    if (isEdit.value){
      put(props.form);
    }else{
      post(props.form);
    }
    
    waitAndExecute(()=> {
      loadingData.value = "";
      if (errorData.value === ""){
        successData.value = "Datos ingresados exitosamente.";
        waitAndExecute(async ()=> {
          successData.value = "";
          await props.prevSuccess();
        }, props.waitTime);
      }
      waitAndExecute(async ()=> {
        errorData.value = "";
      }, props.waitTime);
    }, props.waitTime);
}

function deleteQuestion(){
  if (deleteUrl.item === ""){
    return;
  }
  deleteItem(props.form.id);
  waitAndExecute(()=> {
    goTo(redirect.value);
  }, 1000);
}

function openModalDelete(){
  isModalDeleteActive.value = true;
}
</script>

<template>
    <div>
      <CardBoxModal v-model="isModalDeleteActive" title="Advertencia eliminar" button="danger" button-label="Si" has-cancel :on-confirm="deleteQuestion">
        <p>¿Desea eliminarlo?</p>
      </CardBoxModal>
        <SectionMain :class-name="className">
        <SectionTitleLineWithButton :icon="iconLeft" :icon-right="iconRight"  :title="title" main>
        </SectionTitleLineWithButton>
        <CardBox class="border-2" form @submit.prevent="validateAndSubmit">
            <slot></slot>
            <template #footer>
            <div :class="`fixed z-10 w-96 h-64 -translate-y-36 top-48 right-4 ${ (loadingData !== '' || successData !== '' || errorData !== '')? '' : 'pointer-events-none'}`">
              <NotificationBar 
                color="info" 
                :icon="mdiFolderUpload" 
                :class="`${loadingData !== ''? '': 'hidden'}`"
                :duration="waitTime">
                <b>Subiendo</b> {{ loadingData }}
              </NotificationBar>
              <NotificationBar 
                color="success" 
                :icon="mdiCheck" 
                :class="`${successData !== ''? '': 'hidden'}`"
                :duration="waitTime">
                <b>Exito</b> {{ successData }}
              </NotificationBar>
              <NotificationBar 
                color="danger" 
                :icon="mdiDelete" 
                :class="`${errorData !== ''? '': 'hidden'}`"
                :duration="waitTime">
                <b>Fallo</b> {{  errorData }}
              </NotificationBar>
            </div>
            <BaseButtons class="flex justify-center">
                  <BaseButton 
                    type="submit" 
                    :onclick="validateAndSubmit" 
                    color="primary" 
                    :class="hiddenSubmit? 'hidden' : ''"
                    :label="labelSubmit" 
                    :disabled="disabledSubmit" />
                  <div v-if="isEdit">
                    <BaseButton 
                    type="button" 
                    :onclick="openModalDelete" 
                    color="info" 
                    label="BORRAR" 
                    class="bg-terciary border-terciary"
                    :disabled="disabledSubmit" />
                  </div>
            </BaseButtons>
            </template>
        </CardBox>
        </SectionMain>
    </div>
</template>
<!--
<SectionTitle>Registro de usuario de SNIA</SectionTitle>
-->