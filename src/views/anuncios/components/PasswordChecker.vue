<template>
    <div class="flex justify-center items-center p-2 border w-64 h-40 m-4">
      <div>
        <p v-if="!arePasswordsEqual" class="text-warning">* Las contraseñas no coinciden</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  const props = defineProps({
    arePasswordsEqual: {
      type: Boolean,
      default: true,
      required: true,
    },
    password: {
      type: String,
      default: "",
      required: true,
    },
    passwordRepited: {
      type: String,
      default: "",
      required: true,
    }
  });
  
  const arePasswordsEqual = computed(() => props.password === props.passwordRepited);
  </script>
  