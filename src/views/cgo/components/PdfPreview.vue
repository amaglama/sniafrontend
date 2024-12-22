<script setup>
import { ref } from 'vue'
import { VuePDF, usePDF } from '@tato30/vue-pdf'


const props = defineProps({
    url: {
        type: String,
        default: 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf'
    },
    width: {
        type: Number,
        default: 400
    }
});
const page = ref(1)
const { pdf, pages } = usePDF(props.url)

</script>

<template>
  <div class="border-l-2">
    <div class="flex justify-center items-center">
      <button @click="page = page > 1 ? page - 1 : page">
        Anterior
      </button>
      <span>{{ page }} / {{ pages }}</span>
      <button @click="page = page < pages ? page + 1 : page">
        Siguiente
      </button>
    </div>
    <VuePDF :pdf="pdf" :page="page" :width="width" />
  </div>
</template>