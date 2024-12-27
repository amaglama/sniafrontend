<template>
    <div class="pb-4" v-for="anuncio in anuncios" :key="anuncio.id">
        <ArticleAnuncio :titulo="anuncio.title" :descripcion="anuncio.description" :fecha="anuncio.fecha"
            :url-pdf="anuncio.url" :pdf-name="anuncio.filename"></ArticleAnuncio>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import ArticleAnuncio from "@/views/anuncios/components/ArticleAnuncio.vue";
import { getAnunciosByTypeAndModule } from "@/services/anuncios";
const anuncios = ref([]);
const props = defineProps({
    id_tipo: {
        type: Number,
        default: 1,
    },
    id_modulo: {
        type: Number,
        default: 1,
    },
})

const loadAnuncios = async () => {
    try {
        const result = await getAnunciosByTypeAndModule(props.id_tipo, props.id_modulo);
        anuncios.value = result;
        console.log(anuncios);

    } catch (error) {
        console.error("Error al obtener los anuncios:", error);
    }
};
loadAnuncios();
</script>