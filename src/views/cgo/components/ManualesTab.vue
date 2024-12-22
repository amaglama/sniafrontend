<template>
  <div class="tab-content">
    <div class="pb-4" v-for="anuncio in anuncios" :key="anuncio.id">
      <NotaItem :titulo="anuncio.title" :descripcion="anuncio.description" :fecha="formatFecha(anuncio.created_at)"></NotaItem>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import NotaItem from "@/views/cgo/components/NotaItem.vue";
import { getAnunciosByType } from "@/services/anuncios";
const anuncios = ref([]);
const loadAnuncios = async () => {
  try {

    const result = await getAnunciosByType("MANUAL");
    anuncios.value = result;
    console.log(anuncios);
    
  } catch (error) {
    console.error("Error al obtener los anuncios:", error);
  }
};
function formatFecha(fecha){
  let date = new Date(fecha);
  return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
}
  loadAnuncios();
</script>