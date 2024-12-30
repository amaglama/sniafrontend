<template>
    <CardBox class="border-2 border-green-500 banner">
        <Titles class="justify-left border-b-2 border-green-500">{{ titulo }}</Titles>
        <div class="flex gap-4">
            <div class="detalles flex w-full gap-5">
                <div class="max-sm:hidden">
                    <div class=" border-2 my-4 shadow">
                        <PdfPreview :url="urlPdf" :width="200"></PdfPreview>
                    </div>
                </div>
                <div class="grow flex flex-col">
                    <p class="text-justify m-4 grow mt-10">{{ descripcion }} </p>
                    <div class="w-full m-4 flex justify-between flex-col">
                        <span class="fond-bold">Adjunto: <span class="italic">{{ pdfName }}</span></span>
                        <div class="text-green-900 fond-bold">
                            <span class="">Publicado el </span><span class="text-sm">{{ fecha }}</span>
                        </div>
                    </div>
                    <div class="flex justify-center pt-2">
                        <button @click="descargarPdf(urlPdf)"
                            class="bg-green-700 text-white font-bold rounded-md hover:bg-secondary px-8 py-2">
                            Ver contenido completo</button>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <!-- <ButtonComp 
                label="Ver Contenido Completo" 
                :on-click="openModal" 
                class-name="bg-terciary hover:bg-secondary text-black font-bold rounded-md"
                ></ButtonComp> -->
        </div>
    </CardBox>
    <!-- <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <PdfPreview :url="urlPdf" :width="550"></PdfPreview>
        <button @click="closeModal" class="text-xs">Cerrar</button>
      </div>
    </div> -->
</template>
<script setup>
import CardBox from "@/components/ComponentsOne/CardBox.vue";
import Titles from "@/components/Titles/TitleForm.vue";
import ButtonComp from "@/components/essencials/ButtonComp.vue";
import BaseButton from "@/components/ComponentsOne/BaseButton.vue";
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
        default: 'Fecha Del Documento'
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

function descargarPdf(url) {
    const urlBase = import.meta.env.VITE_API_URL;
    const name = urlBase + '/announcements/download/' + url.split('/').pop();
    const link = document.createElement('a'); // Crear un elemento <a> dinámicamente
    link.href = name;
    link.download = 'archivo.pdf'; // Nombre del archivo descargado
    link.target = '_blank'; // Nombre del archivo descargado
    document.body.appendChild(link); // Agregarlo temporalmente al DOM
    link.click(); // Disparar el clic para iniciar la descarga
    document.body.removeChild(link); // Eliminar el elemento <a> del DOM

}
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
    background: red;
    padding: 20px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    overflow: auto;
    max-height: 100vh;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.banner {
    background-image: url('@/assets/images/splash.png');
    background-size: cover;
    background-position: top right;
}
</style>
