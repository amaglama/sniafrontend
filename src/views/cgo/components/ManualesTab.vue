<template>
    <div class="tab-content">
      <h2>Tercer Tab</h2>
      <ul>
        <li v-for="(item, index) in items" :key="index">
          {{ item }}
        </li>
      </ul>
      <button @click="addItem">Agregar Item</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const items = ref(['Item 1', 'Item 2', 'Item 3']);
  const addItem = () => {
    items.value.push(`Item ${items.value.length + 1}`);
  };
  </script>