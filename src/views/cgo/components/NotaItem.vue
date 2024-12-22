<template>
    <CardBox class="border-2">
        <Titles class="justify-center border-b-2">{{ titulo }}</Titles>
        <div class="flex justify-stretch border-b-2 gap-4">
            <div class="detalles">
                <p class="text-justify">{{ descripcion }}</p>
            </div>
            <div class="document grow">
                <PdfPreview :url="urlPdf" :width="300"></PdfPreview>
            </div>
        </div>
        <div class="text-center">{{ pdfName }}</div>
    </CardBox>
</template>
<script setup>
import CardBox from "@/components/ComponentsOne/CardBox.vue";
import Titles from "@/components/Titles/TitleForm.vue";
import PdfPreview from "@/views/cgo/components/PdfPreview.vue";

defineProps({
    titulo: {
        type: String,
        default: 'Titulo del articulo'
    },
    descripcion: {
        type: String,
        default: 'Descripcion Del Documento'
    },
    pdfName: {
        type: String,
        default: 'Nombre Del Documento'
    },
    urlPdf: {
        type: String,
        default: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf'
    },
});
</script>