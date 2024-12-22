<template>
  <div class="flex flex-col justify-center items-center gap-y-16">
    <transition name="slide-down" appear @enter="enter">
      <h1 class="mt-32 text-primary text-4xl font-bold max-xl:mt-8">BIENVENIDO A RENCA</h1>
    </transition>
    <div class="flex justify-center">
      <div class="flex flex-col w-2/3 text-justify gap-y-4">
        <p class="font-bold">ANTECEDENTES:</p>
        <p>{{ row_1 }}</p>
        <p>{{ row_2 }}</p>
      </div>
    </div>
    <div>
    
  </div>
  </div>
</template>

<script>
import { BACKGROUND_ROW_1, BACKGROUND_ROW_2 } from '@/stores/constants/constantsRENCApage';
import { PDFDocument } from 'pdf-lib';




export default {
  name: "RencaPage",
  components: {
  
  },

  setup() {

    

    async function displayPDF(pdfDoc) {
  const pdfContainer = document.getElementById("pdf-container");

  // Vaciar contenedor previo
  pdfContainer.innerHTML = "";

  // Iterar por todas las páginas del PDF
  const pages = pdfDoc.getPages();
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];

    // Crear un canvas para cada página
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    // Obtener dimensiones de la página
    const { width, height } = page.getSize();

    // Ajustar tamaño del canvas
    canvas.width = width;
    canvas.height = height;

    // Dibujar la página en el canvas
    const scale = 1.0; // Escala para el renderizado
    const viewport = { width: width * scale, height: height * scale };
    page.draw(context, {
      width: viewport.width,
      height: viewport.height,
      canvasContext: context,
    });

    // Añadir el canvas al contenedor
    pdfContainer.appendChild(canvas);
  }
}
async function compressPDF(file) {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      const pages = pdfDoc.getPages();
      pages.forEach((page) => {
        const { width, height } = page.getSize();
        page.scale(0.8, 0.8);
      });

      const compressedPDF = await pdfDoc.save();
      return new Blob([compressedPDF], { type: 'application/pdf' });
    }

    async function handleFile(event) {
      const file = event.target.files[0];
      if (!file) return;
      const compressedFile = await compressPDF(file);
      const arrayBuffer = await compressedFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      console.log(pdfDoc); 
      await displayPDF(pdfDoc);
    }

// Llama a displayPDF después de cargar el PDF



    const enter = (el) => {
      el.animate(
        [
          { transform: "translateY(-100%)", opacity: 0 },
          { transform: "translateY(0)", opacity: 1 },
        ],
        {
          duration: 1000,
          easing: "ease-out",
        }
      );
    };

    return {
      row_1: BACKGROUND_ROW_1,
      row_2: BACKGROUND_ROW_2,
      enter,
      handleFile,
      compressPDF,
    };
  },
};
</script>


<!--
<input type="file" accept="application/pdf" @change="handleFile" />
    <div id="pdf-container"></div>
-->