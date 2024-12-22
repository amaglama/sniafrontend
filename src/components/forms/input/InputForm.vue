<script setup>
import FormControl from '@/components/ComponentsOne/FormControl.vue';
import { computed, ref, watch } from 'vue';
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
  autocomplete: {
    type: String,
    default: null
  },
  maxlength: {
    type: String,
    default: null
  },
  placeholder: {
    type: String,
    default: null
  },
  modelValue: {
    type: [String, Number, Boolean, Date],
    default: ''
  },
  type: {
    type: String,
    default: 'text'
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
    default: () => []
  },
  formTypes: {
    type: Object,
    default: {}
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  isToUpperCase: {
    type: Boolean,
    default: true,
  },
  isNumber:{
    type: Boolean,
    default: false,
  },
  max:{
    type: String,
    default: null
  },
  min:{
    type: String,
    default: null
  },
  validateFunc:{
    type: Function,
    default: (_) => true
  }
});
const firstTouch = ref(true);

const emit = defineEmits(['update:modelValue', 'setRef']);


const localErrors = ref([]); 

const filterToNumbers = (value) => {
  return value.replace(/[^0-9]/g, ''); // Elimina cualquier carácter no numérico
};

const computedValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    
    let updatedValue = value;
    if ((props.type === "text" || props.type === "textarea") && props.isToUpperCase){
      updatedValue = updatedValue.toUpperCase();
    }
    if (props.isNumber){
      updatedValue = "";
    }
    emit('update:modelValue', updatedValue);
    if (firstTouch.value) {
      firstTouch.value = false;
    }
    else{
      if (Object.keys(props.formTypes).length > 0){
        localErrors.value = validationInput(value, props.formTypes);
      }
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

</script>

<template>
  <div :class="`h-20 ${className}`">
    <p>{{ `${label} ${required && label? '*' : ''}` }}</p>
    <FormControl
      :id="id"
      v-model="computedValue"
      :maxlength="maxlength"
      :required="required"
      :placeholder="`${placeholder} ${required ? '*' : ''}`"
      :type="type"
      :class="`${localErrors.length > 0 ? 'border border-warning placeholder-warning rounded-md' : ''}`"
      :disabled="disabled"
      :max="max"
      :min="min"
      :color="disabled? 'bg-gray-300': 'bg-white'"
    />
    <p :class="`text-warning ${localErrors.length > 0 ? '' : 'hidden'}`">
      {{ localErrors.join(', ') }}
    </p>
  </div>
</template>
