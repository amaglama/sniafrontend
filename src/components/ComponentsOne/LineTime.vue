<template>
    <div>
      <div class="h-0.5 bg-white mt-2" :style="{ width: progress + '%' }"></div>
    </div>
  </template>
<script>
import { ref, onMounted } from 'vue';

export default {
  props: {
    duration: {
      type: Number,
      default: -1
    },
  },
  setup(props) {
    const progress = ref(100);

    const startProgress = () => {
      const interval = 10;
      const decrement = (100 / props.duration) * interval;
      const intervalId = setInterval(() => {
        if (progress.value > 0) {
          progress.value -= decrement;
        } else {
          clearInterval(intervalId);
          progress.value = 0;
        }
      }, interval);
    };
    onMounted(() => {
        if (props.duration >= 0) startProgress();
    });

    return {
      progress,
    };
  },
};
</script>