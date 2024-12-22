<script setup>
import { computed } from 'vue'
import FormCheckRadio from '@/components/ComponentsOne/FormCheckRadio.vue'

const props = defineProps({
  type: {
    type: String,
    default: 'checkbox',
    validator: (value) => ['checkbox', 'radio', 'switch'].includes(value)
  },
  className: {
    type: String,
    default: null
  },
  isColumn: Boolean,
  modelValue: {
    type: [Array, String, Number, Boolean],
    default: null
  },
  label: {
        type: String,
        default: "",
    },

})

const emit = defineEmits(['update:modelValue'])

const computedValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  }
})
</script>

<template>
  <div :class="`flex items-center justify-center ${className}`">
    <p>{{ `${label}` }}</p>
    <FormCheckRadio
      v-model="computedValue"
      :type="type"
      name="checkbox-group"
      :input-value="false"
      class="mr-6 mb-3 last:mr-0"
    />
  </div>
</template>
