<script setup>
import { computed, watch, ref } from 'vue';
import FormFilePicker from '@/components/ComponentsOne/FormFilePicker.vue';
import validationInput from '../validationInput';
const props = defineProps({
  name: {
    type: String,
    default: null
  },
  id: {
    type: String,
    default: null
  },
  modelValue: {
    type: [File, String],
    default: null
  },
  required: Boolean,
  className: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  errors: {
    type: Array,
    default: []
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  filesAllowed: {
    type: Array,
    default: []
  },
  maxSizeFile: {//In bytes
    type: Number,
    default: 0
  },
  formTypes: {
    type: Object,
    default: {}
  },
});
const firstTouch = ref(true);
const emit = defineEmits(['update:modelValue', 'setRef', 'update:validationError']);

const computedValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value);
  }
});


const acceptValue = props.filesAllowed.join(',');
const validationError = ref(null);
const localErrors = ref([]); 
const handleValidationError = (error) => {
  validationError.value = error
}


watch(computedValue, (newValue) => {
  if (newValue) {
    const isValidFile = props.filesAllowed.some((allowedType) => {
      const extension = `${newValue.name.split('.').pop()}`;
      return allowedType ===`.${extension}`;
    }) !== undefined;
    //size value is Byte
    if ( props.maxSizeFile > 0 && newValue.size > props.maxSizeFile ){
      validationError.value = `El archivo es muy grande, ${props.maxSizeFile / 1024} kb maximo`;
      emit('update:modelValue', null); 
      return;
    }
    if (!isValidFile) {
      validationError.value = `El archivo debe ser de tipo: ${props.filesAllowed.join(', ')}`;
      emit('update:modelValue', null); 
    } else {
      validationError.value = null;
    }
    if (Object.keys(props.formTypes).length > 0){
        localErrors.value = validationInput(newValue, props.formTypes);
    }
  }
});

watch(() => props.errors, (newErrors) => {
  localErrors.value = newErrors || [];
}, { immediate: true });

watch(() => props.modelValue, (newValue) => {
  if (!firstTouch && Object.keys(props.formTypes).length > 0){
    localErrors.value = validationInput(newValue, props.formTypes);
  }
}, { immediate: true });

function allowedFunc(value){
  const fileType = `.${value.name.split('.').pop()}`;
  return props.filesAllowed.length == 0 || props.filesAllowed.find(f => f == fileType) !== undefined;
}
</script>

<template>
  <div :class="`h-20 w-[28vw] max-xl:w-[50vw] pt-1 ${className}`">
    <FormFilePicker 
      :allow-func="allowedFunc"
      @update:validationError="handleValidationError"
      :message-error="`El archivo debe ser de tipo: ${props.filesAllowed.join(', ')}`"
      :label="`${label} ${ required? '*' : ''  }`"
      color="primary"
      v-model="computedValue"
      :accept="acceptValue || '*'"
      :class="`${localErrors.length > 0 ? 'border-2 border-warning rounded-md' : ''}`" />
    <p :class="`text-warning ${localErrors.length > 0 ? '' : 'hidden'}`">
      {{ localErrors.join(', ') }}
    </p>
    <p v-if="validationError" class="text-red-500">{{ validationError }}</p>
  </div>
</template>
