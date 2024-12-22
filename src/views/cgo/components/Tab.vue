<template>
    <button 
      class="tab-button" 
      :class="{ active: isActive }"
      @click="$emit('click')"
    >
      {{ name }}
    </button>
  </template>
  
  <script setup>
  defineProps({
    name: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      default: false
    }
  });
  </script>
  
  <style scoped>
  .tab-button {
    padding: 12px 24px;
    border: none;
    background: none;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.3s ease;
    flex: 1;
    color: rgb(56, 142, 60);
  }
  
  .tab-button:hover {
    background-color: rgb(56, 142, 60);
    color: white;
  }
  
  .tab-button.active {
    border-bottom: 2px solid #007bff;
    color: #007bff;
    font-weight: bold;
  }
  </style>