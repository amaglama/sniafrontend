<template>
    <div class="tab-content">
      <h2>Primer Tab</h2>
      <input v-model="inputText" type="text" placeholder="Escribe algo">
      <p>Texto ingresado: {{ inputText }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const inputText = ref('');
  </script>