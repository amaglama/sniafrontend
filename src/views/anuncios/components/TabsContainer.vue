<template>
    <div class="tabs-container">
      <div class="tabs-header">
        <Tab 
          v-for="tab in tabs" 
          :key="tab.id"
          :name="tab.name"
          :isActive="activeTab === tab.id"
          @click="setActiveTab(tab.id)"
        />
      </div>
      <div class="tabs-content">
        <slot :activeTab="activeTab"></slot>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import Tab from '@/views/anuncios/components/Tab.vue';
  
  const props = defineProps({
    initialTab: {
      type: String,
      default: 'tab1'
    },
    tabs: {
      type: Array,
      required: true
    }
  });
  
  const activeTab = ref(props.initialTab);
  
  const setActiveTab = (tabId) => {
    activeTab.value = tabId;
  };
  </script>
  
  <style scoped>
  .tabs-container {
    width: 100%;
    margin: 0 auto;
  }
  
  .tabs-header {
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid #eee;
  }
  
  .tabs-content {
    padding: 20px;
  }
  </style>