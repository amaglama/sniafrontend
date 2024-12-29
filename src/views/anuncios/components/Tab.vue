<template>
    <button 
      class="tab-button" 
      :class="{ active: isActive }"
      @click="$emit('click')"
      
    >
      <div class="flex justify-center">
        <p><svg
            :viewBox="'0 0 24 24'"
            class="w-6 h-6 inline mr-2"
            fill="currentColor">
            <path :d="icon" />
        </svg> {{ name }}</p>
      </div>
    </button>
  </template>
  
  <script setup>
  import { mdiFile, mdiFileTableBox, mdiFirebase, mdiFileSign, mdiPaperclip, mdiClipboardFile, mdiFileDownload } from '@mdi/js';
  defineProps({
    name: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: mdiFile
    }
  });
  </script>
  
  <style scoped>
  .tab-button {
    padding: 12px 24px;
    border: solid 1px #e0f1e6;
    border-radius: 5px;
    background: none;
    cursor: pointer;
    font-size: 20px;
    font-weight: 500;
    transition: all 0.3s ease;
    flex: 1;
    color: rgb(56, 142, 60);
  }
  
  .tab-button:hover {
    background-color: #e0f1e6;
    color: #007bff;
    font-weight: 600;
  }
  
  .tab-button.active {
    border-bottom: 5px solid #007bff;
    background: #e0f1e6;
    color: #007bff;
    font-weight: 700;
  }
  </style>