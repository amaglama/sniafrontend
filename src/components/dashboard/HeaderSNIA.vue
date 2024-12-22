<template>
    <header :class="`overflow text-white py-4 h-24 max-xl:h-20 bg-gradient-to-r from-primary to-terciary ${ isNavBarVisible? '':'hidden' } shadow-xl border border-primary`">
      <div class="flex justify-between items-center w-full">
        <div class="w-1/3 flex justify-center items-center">
          <div class="flex">
            <ButtonComp :on-click="toggleLeftbar" :icon="mdiMenu" class-name="bg-secondary border-primary"/>
          </div>
        </div>
        <div class="w-1/3 ">
          <h1 class="text-7xl font-bold text-center max-xl:text-5xl"><span class="text-white">SNIA</span></h1>
        </div>
        <div class="flex items-center justify-end w-1/3 gap-x-8">
          <div v-if="username !== null" class="flex flex-col">
            <div v-if="false" class="w-4 h-4 bg-red-800 rounded-full animate-ping"></div>
            <svg
              :onclick="()=>{
                openBox = !openBox;
              }"
              :viewBox="'0 0 24 24'"
              class="w-10 h-10 hover:text-green-300"
              fill="currentColor">
              <path :d="openBox?  mdiMailboxOpen : mdiMailbox" />
            </svg>
            
            <div v-if="openBox" class="absolute mt-14 z-20 w-48 h-96 overflow-y-auto rounded bg-slate-50 border-y-4 border-x-2 -translate-x-16">
              
            </div>
          </div>
          <div class="flex flex-col gap-y-2 w-48 mr-12">
            <p :class="`font-bold ${username == null? 'hidden' : ''}`">Bienvenido {{ username }}</p>
            <p :class="`font-bold ${username == null? 'hidden' : ''}`">{{ "Administrador" }}</p>
          </div>
        </div>
      </div>
    </header>
  </template>
  
  <script>

  import { inject, ref } from 'vue';
  import ButtonComp from '../essencials/ButtonComp.vue';
  import { mdiMenu, mdiMailbox, mdiMailboxOpen } from '@mdi/js';
  import { getCookie } from '@/stores/utils/cookies';
  
  export default {
    name: "HeaderSNIA",
    components:  {
      ButtonComp
    },
    props: {
 
    },
    setup() {
      const toggleLeftbar = inject('toggleLeftbar');
      const toggleNavbar = inject('toggleNavbar');
      const isNavBarVisible = inject('isNavBarVisible');
      const username = getCookie('username');
      const rol = getCookie('rol');
      const openBox = ref(false);
      return { 
        rol, 
        username, 
        toggleLeftbar, 
        mdiMenu, 
        toggleNavbar, 
        isNavBarVisible, 
        mdiMailbox,
        mdiMailboxOpen,
        openBox
      };
    }
  };
  </script>
<!--
  bg-gradient-to-r from-green-900 to-[#4D9A29] w-full
-->