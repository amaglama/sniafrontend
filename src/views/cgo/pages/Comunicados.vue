<template>
    <CardBox class="border-1 m-2" :hasTable="false">
        <div class="bg-terciary m-0 p-5 text-center text-white">
            <span class="font-bold">{{ titulo }}</span>
        </div>
        <div>
            <TabsContainer :tabs="comunicados" :initialTab="2">
                <template #default="{ activeTab }">
                    <TabAnuncio v-if="activeTab === 2" :id_modulo="1" :id_tipo="2"/>
                    <TabAnuncio v-if="activeTab === 4" :id_modulo="1" :id_tipo="4"/>
                    <TabAnuncio v-if="activeTab === 3" :id_modulo="1" :id_tipo="3"/>
                </template>
            </TabsContainer>
        </div>
    </CardBox>
</template>
<script setup>
import CardBox from "@/components/ComponentsOne/CardBox.vue";
import TabsContainer from '@/views/anuncios/components/TabsContainer.vue';
import TabAnuncio from "@/views/anuncios/components/TabAnuncio.vue";
import { comunicados } from "@/services/anuncios";
import { ref } from 'vue';

const titulo = "COMISION GUBERNAMENTAL DEL OZONO-BOLIVIA";
</script>