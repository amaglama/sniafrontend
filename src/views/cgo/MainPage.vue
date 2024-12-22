<template>
    <div class="flex flex-col justify-center items-center gap-y-16">
      <transition name="slide-down" appear @enter="enter">
        <h1 class="mt-32 text-primary text-4xl font-bold">BIENVENIDO A CGO</h1>
      </transition>
    </div>
  </template>
  
  <script>
  import LeftBar from "@/components/dashboard/LeftBar.vue";
  export default {
    name: "RencaPage",
    components: {
      LeftBar,
    },
    setup() {
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
        enter,
      };
    },
  };
  </script>
  