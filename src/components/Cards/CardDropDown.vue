<template>
    <div :class="className">
      <div class="w-full shadow-lg rounded-lg h-fit">
        <h2 
          class="cursor-pointer bg-primary text-white text-center py-2 font-bold rounded-t-lg h-fit"
          @click="toggleContent"
        >
          {{ title }}
        </h2>
        <transition name="slide-fade">
          <div v-if="showContent" class="rounded-b-lg h-fit p-4">
            <slot></slot>
          </div>
        </transition>
      </div>
    </div>
</template>
  
<script setup>
import { ref } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "Haz clic para ver más"
  },
  className: {
    type: String,
    default: "w-full"
  }
});

const showContent = ref(false);

const toggleContent = () => {
  showContent.value = !showContent.value;
};
</script>

<style scoped>
/* Transición personalizada para el contenido */
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.5s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(-40px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-40px);
}
</style>