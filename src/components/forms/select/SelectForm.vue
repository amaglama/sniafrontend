<script setup>
import FormControl from '@/components/ComponentsOne/FormControl.vue';
import { ref, watch, computed } from 'vue';

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: null
  },
  id: {
    type: String,
    default: null
  },
  modelValue: {
    type: [String, Number, Boolean],
    default: ''
  },
  required: Boolean,
  className: {
    type: String,
    default: ''
  },
  options: {
    type: Array,
    default: null
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  errors: {
    type: Array,
    default: () => []
  },
  onSet: {
    type: Function,
    default: (_) => {}
  }
});

const emit = defineEmits(['update:modelValue', 'setRef']);
const localErrors = ref([]); 

watch(() => props.errors, (newErrors) => {
  localErrors.value = newErrors || [];
  
}, { immediate: true });


const computedValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    props.onSet(value);
    emit('update:modelValue', value)

  }
})
</script>

<template>
    <div :class="`h-20 ${className}`">
        <p>{{ `${label} ${ required && label? '*' : ''  }` }}</p>
        <FormControl
            :id="id"
            v-model="computedValue"
            :name="name"
            :options="options"
            :disabled="disabled"
            :class="`${localErrors.length > 0 ? 'border border-warning rounded-md' : ''}`"
            :color="disabled? 'bg-gray-300': 'bg-white'"
            />
          <p :class="`text-warning ${localErrors.length > 0 ? '' : 'hidden'}`">
            {{ localErrors.join(', ') }}
          </p>
    </div>
</template>

