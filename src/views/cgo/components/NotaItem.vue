<template>
    <CardBox class="border-2">
        <Titles class="justify-center border-b-2">{{ titulo }}</Titles>
        <div class="flex justify-stretch border-b-2 gap-4">
            <div class="detalles">
                <p class="text-justify m-4">{{ descripcion }}</p>
                <span>Adjunto: <span class="font-medium text-blue-600 dark:text-blue-500 hover:underline"> Resolución Ministerial Nº {{ Math.floor(Math.random()*1000)  }}/2023</span></span>

                <div class="mt-10 text-green-900"> <span class="fond-bold">Fecha de Publicación </span> <span class="fond-bold text-sm">{{ fecha }}</span></div>
            </div>
            <!-- <div class="document grow">
                <PdfPreview :url="urlPdf" :width="300"></PdfPreview>
            </div> -->
        </div>
        <div>
            <div class="flex h-12 justify-end">
            <ButtonComp 
                label="Ver Contenido Completo" 
                :on-click="openModal" 
                class-name="bg-terciary hover:bg-secondary text-black font-bold rounded-md"
                ></ButtonComp>
        </div>
        </div>
    </CardBox>
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <PdfPreview :url="urlPdf" :width="550"></PdfPreview>
        <button @click="closeModal" class="text-xs">Cerrar</button>
      </div>
    </div>
</template>
<script setup>
import CardBox from "@/components/ComponentsOne/CardBox.vue";
import Titles from "@/components/Titles/TitleForm.vue";
import ButtonComp from "@/components/essencials/ButtonComp.vue";
import CardBoxModal from "@/components/ComponentsOne/CardBoxModal.vue";
import PdfPreview from "@/views/cgo/components/PdfPreview.vue";
import { computed, ref } from "vue";

defineProps({
    titulo: {
        type: String,
        default: 'Titulo del articulo'
    },
    descripcion: {
        type: String,
        default: 'Descripcion Del Documento'
    },
    fecha: {
        type: String,
        default: 'Descripcion Del Documento'
    },
    pdfName: {
        type: String,
        default: 'Nombre Del Documento'
    },
    urlPdf: {
        type: String,
        default: ''
    },
});
// Controla la visibilidad del modal
const showModal = ref(false);

// Método para cerrar el modal
const closeModal = () => {
  showModal.value = false;
};
const openModal = () => {
    showModal.value = true;
};
</script>
<style>
/* Estilo del overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* Estilo del contenido del modal */
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  display: flex; 
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>
