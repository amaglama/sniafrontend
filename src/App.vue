<script setup>

</script>

<template>
  <HeaderSNIA></HeaderSNIA>
  <LeftBar></LeftBar>
</template>
<script>
    import HeaderSNIA from '@/components/dashboard/HeaderSNIA.vue';
    import LeftBar from '@/components/dashboard/LeftBar.vue';
    import { provide } from 'vue';
    import { ref } from 'vue';
    export default {
        name: "App",
        components: {
            HeaderSNIA,
            LeftBar
        },
        setup() {
            const user = {
                name: 'EL ADMIN',
                rank: 'Administrador',
                permissions: ['usuarios']
            };
            const leftbarVisible = localStorage.getItem("leftBarVisible") === "true";
            const isLeftbarVisible = ref(leftbarVisible);
            const isNavBarVisible = ref(true);

            provide('sessionCaducate', false);

            provide('mainUser', user);
            provide('isLeftbarVisible', isLeftbarVisible);
            provide('isNavBarVisible', isNavBarVisible);
            provide('toggleLeftbar', () => {
                isLeftbarVisible.value = !isLeftbarVisible.value;
                localStorage.setItem("leftBarVisible", isLeftbarVisible.value);
            });
            provide('toggleNavbar', () => {
                isNavBarVisible.value = !isNavBarVisible.value;
            });
        },
        
    };
</script>