<template>
    <CardBox class="border-1 m-2" :hasTable="false">
      <div class="bg-terciary m-0 p-5 text-center text-white">
        <span class="font-bold">{{ titulo }}</span>
      </div>
        <!-- <TitleForm>SNIA</TitleForm> -->
         <Item></Item>
        <div>
            <TabsContainer :tabs="tabsConfig" :initialTab="'tab1'">
          <template #default="{ activeTab }">
            <FirstTab v-if="activeTab === 'tab1'" />
            <SecondTab v-if="activeTab === 'tab2'" />
            <ThirdTab v-if="activeTab === 'tab3'" />
          </template>
        </TabsContainer>
      </div>
    </CardBox>
</template>
<script setup>
import CardBox from "@/components/ComponentsOne/CardBox.vue";
import TitleForm from "@/components/Titles/TitleForm.vue";
import TabsContainer from '@/views/cgo/components/TabsContainer.vue';
import FirstTab from '@/views/cgo/components/NoticesTab.vue';
import SecondTab from '@/views/cgo/components/BoletinesTab.vue';
import ThirdTab from '@/views/cgo/components/ManualesTab.vue';
import Item from "@/views/cgo/components/NotaItem.vue";
import { ref } from 'vue';

const titulo = "COMISION GUBERNAMENTAL DEL OZONO-BOLIVIA";

// Define las pestañas y el estado activo
const tabsConfig = [
  { id: 'tab1', name: 'Noticias o Comunicados' },
  { id: 'tab2', name: 'Boletines' },
  { id: 'tab3', name: 'Manuales' },
];
</script>
<style>
.tab-content {
  padding: 20px;
}

button {
  padding: 8px 16px;
  margin: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
}

button:hover {
  background-color: #f5f5f5;
}

input {
  padding: 8px;
  margin: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>