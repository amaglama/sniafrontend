<script setup>
import { containerMaxW } from '@/config.js'
const props = defineProps({
  className: {
    type :String,
    default: '',
  }
});
</script>

<template>
  <section :class="className !== ''? '' : `p-6 ${containerMaxW}`">
    <slot />
  </section>
</template>
