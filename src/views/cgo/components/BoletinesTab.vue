<template>
    <div class="tab-content">
      <h2>Segundo Tab</h2>
      <p>Contador: {{ counter }}</p>
      <button @click="increment">Incrementar</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const counter = ref(0);
  const increment = () => counter.value++;
  </script>