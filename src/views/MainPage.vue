<template>
    <div class="flex pt-2 justify-center">
        <transition
            name="slide-down"
            appear
            @before-enter="beforeEnter"
            @enter="enter">
            <img 
            
                class="mt-12 w-4/12 rounded-[20%] shadow-lg"
                src="../../assets/main_page.jpg"/>
        </transition>
    </div>
</template>
<script>
    export default {
        name: "MainPage",
        components: {

        },
        
        methods: {
        toggleImage() {
        this.showImage = !this.showImage;
        },
        beforeEnter(el) {
         //el.style.transform = "translateY(-100%)";
         //el.style.opacity = "0";
        },
        enter(el, done) {
        const animation = el.animate(
            [
            { transform: "translateY(-100%)", opacity: 0 },
            { transform: "translateY(0)", opacity: 1 },
            ],
            {
            duration: 800,
            easing: "ease-out",
            }
        );
        animation.onfinish = done;
        },
    },
};
</script>

<style>
.slide-down-enter-active {
  transition: all 0.8s ease-out;
}
.slide-down-enter-from {
  transform: translateY(-100%);
  opacity: 0;
}
.slide-down-enter-to {
  transform: translateY(0);
  opacity: 1;
}
</style>