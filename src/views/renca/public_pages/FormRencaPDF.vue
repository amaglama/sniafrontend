<template>
    <div class="form-renca-pdf h-[1200px]" ref="pdfContent">
      <div class="header">
        <div class="logo">
          <img src="../../../../assets/MMAYALOGO.jpg" alt="escudo_bolivia" />
        </div>
        <div class="texts">
          <div class="title">
            <h1>FORMULARIO DE INSCRIPCIÓN</h1>
            <h1>RENCA</h1>
          </div>
        </div>
        <div class="code">
          <p class="label">Código Formulario</p>
          <p class="form-code">2024-UUYGZI</p>
        </div>
      </div>
  
      <!-- Datos del Consultor -->
      <div class="section">
        <h3>DATOS DEL CONSULTOR UNIPERSONAL</h3>
        <table>
          <tbody>
            <tr>
              <td><strong>Documento de Identidad:</strong> CÉDULA DE IDENTIDAD - 12312312 - EXT - LP</td>
              <td><strong>Nombre Completo:</strong> LIZ FABIOLA LEMUS ARUQUIPA</td>
            </tr>
            <tr>
              <td><strong>Domicilio Legal:</strong> ZONA VALLE HERMOSO CALLE LOS PINOS NO. 567, LA PAZ</td>
              <td><strong>Residencia:</strong> LA PAZ</td>
            </tr>
            <tr>
              <td><strong>Teléfono fijo:</strong> 12312345</td>
              <td><strong>No. de Celular:</strong> 79998899</td>
            </tr>
            <tr>
              <td><strong>Email:</strong> liz.lemus@gmail.com</td>
              <td><strong>Título en Provisión Nacional:</strong> INGENIERO EN MEDIO AMBIENTE</td>
            </tr>
            <tr>
              <td><strong>Fecha de Emisión:</strong> 12/04/2023</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Categoría del Consultor -->
      <div class="section">
        <h3>CATEGORÍA DEL CONSULTOR UNIPERSONAL</h3>
        <table>
          <tbody>
            <tr>
              <td><strong>Tipo:</strong> UNIPERSONAL NACIONAL</td>
              <td><strong>Categoría:</strong>A</td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Requisitos -->
      <div class="section">
        <h3>REQUISITOS CONSULTOR UNIPERSONAL NACIONAL</h3>
        <table>
          <thead>
            <tr>
              <th>N°</th>
              <th>Requisito</th>
              <th>Respaldo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Nota de solicitud de inscripción, dirigida a la Dirección General de Medio Ambiente y Cambios Climáticos, debidamente firmada por el solicitante, adjuntando el Formulario de Solicitud de Inscripción obtenido del Sistema Nacional de Información Ambiental (http://snia.mmaya.gob.bo), en calidad de Declaración Jurada.</td>
              <td>Físico</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Copia de Título Profesional</td>
              <td>Digital</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Exclusivamente para las categorías B, con un mínimo de 2 años, y C, con un mínimo de 5 años: se requiere la presentación de copias de certificados laborales que acrediten experiencia específica en el sector ambiental.</td>
              <td>Digital</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Copia de Cédula de Identidad vigente.</td>
              <td>Digital</td>
            </tr>
            <tr>
              <td>5</td>
              <td>Fotografía digital reciente en formato JPG, con dimensiones de 4x4, fondo azul, sin el uso de gafas ni sombreros.</td>
              <td>Digital</td>
            </tr>
            <tr>
              <td>6</td>
              <td>Comprobante de Depósito Bancario Original, que indique el número de depósito.</td>
              <td>Físico</td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Declaración -->
      <div class="section">
        <h3>DECLARACIÓN JURADA Y FIRMA</h3>
        <table>
          <tbody>
            <tr>
              <td colspan="2">
                <p>
                  Yo <strong>LIZ FABIOLA LEMUS ARUQUIPA</strong>, con Cédula de Identidad
                  <strong>12312312 - LP</strong>, juro la exactitud y veracidad de la información
                  detallada en el presente documento y los respaldos adjuntos.
                </p>
              </td>
            </tr>
            <tr>
              <td colspan="2" style="text-align: center; padding-top: 0;">
                <div class="signature" style="margin-top: 70px;">
                  <div class="signature-line" style="margin-top: 0; height: 1px; background-color: #000; width: 50%; margin: 0 auto;"></div>
                  <p style="margin-top: 5px;">LIZ FABIOLA LEMUS ARUQUIPA</p>
                  <p style="margin-top: 2px;">12312312 - LP</p>
                </div>
              </td>
  
            </tr>
            <tr>
              <td colspan="2" style="text-align: center;">
                <p><strong>Lugar y fecha:</strong> La Paz, 21/11/2024</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
  
      <button :class="`${hideButton? 'hidden': ''}`" class="generate-pdf-btn" @click="generatePDF">Generar PDF</button>
    </div>
  </template>
  
  <script>
  import goTo from "@/stores/utils/goRoute";
import { waitAndExecute } from "@/stores/utils/waitAndExecute";
import html2pdf from "html2pdf.js";
  import { ref } from "vue";


  export default {
    name: "FormRencaPDF",
    methods: {
      generatePDF() {
        this.hideButton = true;
        const content = this.$refs.pdfContent; // Referencia al contenido HTML
        const options = {
          margin: [2, 17, 10, 10], // Márgenes simétricos
          filename: "formulario_inscripcion_renca.pdf", // Nombre del archivo PDF
          image: { type: "jpeg", quality: 1.0 }, // Máxima calidad de imagen
          html2canvas: {
            scale: 2, // Aumenta la calidad
            useCORS: true, // Asegura que las imágenes externas se carguen
          },
          jsPDF: { unit: "mm", format: "legal", orientation: "portrait" }, // Formato A4
        };
  
        html2pdf().set(options).from(content).save(); // Generar y guardar el PDF
        waitAndExecute(()=>{
            goTo("/renca-pdf");
        }, 2000);
        
      },
    },
    setup(){
        const hideButton = ref(false);
        return {
            hideButton
        };
    }
  };
  </script>
  
  <style scoped>
  /* Estilos principales */
  .form-renca-pdf {
    font-family: "Roboto", sans-serif;
    background: #f9f9f9;
    color: #333;
    padding: 20px;
    border-radius: 4px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 800px;
    background: white;
  }
  
  .header {
    display: flex; /* Cambia el diseño a flex para control más preciso */
    align-items: center; /* Alinea verticalmente los elementos */
    justify-content: space-between; /* Distribuye el espacio horizontalmente */
    padding: 5px 10px; /* Reduce el espaciado interno */
    border-bottom: 1px solid #ddd; /* Línea separadora */
  }
  
  .logo img {
    height: 60px; /* Reduce el tamaño de la imagen */
    width: auto; /* Mantiene proporciones */
  }
  
  .header .logo img {
    height: 100px; /* Tamaño ajustado para la imagen */
    justify-self: left; /* Centrar en la columna */
  }
  
  .texts {
    text-align: center;
    flex: 1; /* Ocupa espacio proporcional */
  }
  
  .title h1 {
    font-size: 16px; /* Reduce el tamaño de los títulos */
    margin: 2px 0; /* Reduce los márgenes */
  }
  
  .texts .title h1 {
    font-size: 16px;
    margin: 5px 0;
    font-weight: bold;
  }
  
  .header .texts {
    text-align: center;
  }
  
  .header .title h1 {
    font-size: 18px;
    margin: 0;
    font-weight: bold;
    color: #01488f;
  }
  
  .code {
    text-align: right;
  }
  
  .code .label {
    font-size: 12px; /* Reduce el tamaño de la etiqueta */
    margin: 0; /* Elimina márgenes */
  }
  
  .code .form-code {
    font-size: 14px; /* Reduce el tamaño del código */
    font-weight: bold;
    margin: 0; /* Elimina márgenes */
  }
  
  .section {
    margin-top: 3px;
  }
  
  .section h3 {
    background: #bee2e4; /* Color de fondo */
    color: #000;
    padding: 5px 8px; /* Reduce el espacio interno (arriba/abajo e izquierda/derecha) */
    border-radius: 4px;
    margin-bottom: 5px; /* Reduce el espacio inferior */
    margin-top: 5px; /* Elimina espacio superior adicional */
    font-size: 14px;
    font-weight: bold;
  }
  .signature {
    margin-top: 100px;
    text-align: center;
  }
  
  .signature-line {
    height: 1px;
    background: #333;
    margin: 10px auto;
    width: 30%;
  }
  
  .generate-pdf-btn {
    background-color: #00509e;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 20px;
  }
  
  .generate-pdf-btn:hover {
    background-color: #003366;
  }
  .tableRequisitos {
    width: 100%; /* Ocupa el ancho completo */
    border-collapse: collapse; /* Elimina espacios entre bordes */
    font-size: 5px; /* Tamaño de fuente reducido */
    margin-top: 4px; /* Espacio superior reducido */
  }
  
  table {
    width: 100%; /* Ocupa el ancho completo */
    border-collapse: collapse; /* Elimina espacios entre bordes */
    font-size: 12px; /* Tamaño de fuente reducido */
    margin-top: 5px; /* Espacio superior reducido */
  }
  
  table th,
  table td {
    padding: 4px 7px 7px 15px; /* Reduce el espacio interno */
    border: 0.5px solid #ccc; /* Bordes más delgados */
    text-align: left; /* Alineación del texto */
  }
  
  table th {
    background: #e8f6f8; /* Color de fondo más claro */
    color: #000; /* Texto negro */
    font-weight: bold; /* Resalta encabezados */
  }
  
  table tbody tr:nth-child(even) {
    background: #f9f9f9; /* Fondo alternado */
  }
  
  table tbody tr:nth-child(odd) {
    background: #ffffff; /* Fondo blanco */
  }
  
  table tbody tr:hover {
    background: #d4f0f2; /* Fondo resaltado al pasar el cursor */
    cursor: pointer; /* Cambia el cursor al pasar */
  }
  
  
  
  </style>
  