<template>
    <CardBox class="border-1 m-2" :hasTable="false">
        <div class="bg-terciary m-0 p-5 text-center text-white">
            <span class="font-bold">{{ titulo }}</span>
        </div>
        <div>
            <TabsContainer :tabs="marcoLegal" :initialTab="5">
                <template #default="{ activeTab }">
                    <div v-for="tab in marcoLegal">
                        <TabAnuncio v-if="activeTab === tab.id" :id_modulo="2" :id_tipo="tab.id"/>
                    </div>
                </template>
            </TabsContainer>
        </div>
    </CardBox>
</template>
<script setup>
import CardBox from "@/components/ComponentsOne/CardBox.vue";
import TabsContainer from '@/views/anuncios/components/TabsContainer.vue';
import TabAnuncio from "@/views/anuncios/components/TabAnuncio.vue";
import { marcoLegal } from "@/services/tiposAnuncios";
import { ref } from 'vue';

const titulo = "COMISION GUBERNAMENTAL DEL OZONO-BOLIVIA";
</script>