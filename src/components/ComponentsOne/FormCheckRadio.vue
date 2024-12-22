<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'checkbox',
    validator: (value) => ['checkbox', 'radio', 'switch'].includes(value)
  },
  label: {
    type: String,
    default: null
  },
  modelValue: {
    type: [Array, String, Number, Boolean],
    default: null
  },
  inputValue: {
    type: [String, Number, Boolean],
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const computedValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  }
})

const inputType = computed(() => (props.type === 'radio' ? 'radio' : 'checkbox'))
</script>

<template>
  <label :class="`flex items-center space-x-2 cursor-pointer`">
    <input
      v-model="computedValue"
      :type="inputType"
      :name="name"
      :value="inputValue"
      class="w-5 h-5 text-green-500 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2 ml-4 mt-4"
    />
    <span class="text-gray-700">{{ label }}</span>
  </label>
</template>
