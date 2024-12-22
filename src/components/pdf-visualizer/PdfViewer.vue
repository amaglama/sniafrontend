<template>
    <div class="">
      <PDFViewer 
        style='height: 100vh; width: 100vw'
        :source="pdfUrl"
        
        />
    </div>
  </template>
  
  <script>
  
  import { ref, onMounted } from 'vue';
  import PDFViewer from 'pdf-viewer-vue'
  export default {
    name: 'PdfViewer',
    components:{
      PDFViewer
    },
    props: {
      pdfUrl: {
        type: String,
        required: true,
      },
    },
    setup(props) {
  
  
      return {
        pdfUrl: props.pdfUrl
      };
    },
  };
  </script>
  
