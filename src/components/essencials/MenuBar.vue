<template>
    <div class="text-white h-24 bg-terciary  w-full text-2xl font-bold flex shadow-lg max-2xl:text-xl max-xl:text-base max-xl:h-16">
        <div :class="`fixed z-10 w-96 h-64 pointer-events-none`">
          <NotificationBar 
            color="danger" 
            :class="`${showCaducate ? '' : 'hidden'} pointer-events-auto`">
            <b>Error Sesión Caducada.</b> Ingrese de nuevo.
          </NotificationBar>
        </div>
        <nav class="flex w-full items-center">
            <ul class="w-1/2 h-8 flex justify-around space-x-4 max-lg:w-3/4 max-xl:pl-4">
              <li><a href="/" class="transition-opacity duration-500 hover:opacity-75 hover:text-gray-50">INICIO</a></li>
              <li v-if="isAllowed('usuarios')"><a href="/usuarios" class="transition-opacity duration-500 hover:opacity-75 hover:text-gray-50">USUARIOS</a></li>
              <li class="mb-3"><a href="/RENCA" class="transition-opacity duration-500 hover:opacity-75 hover:text-gray-50">RENCA</a></li>
              <li class="mb-3"><a href="/renca-usuario" class="transition-opacity duration-500 hover:opacity-75 hover:text-gray-50">USUARIO RENCA</a></li>
              <li class="mb-3"><a href="/pngca" class="transition-opacity duration-500 hover:opacity-75 hover:text-gray-50">PNGCA</a></li>
              <li class="mb-3"><a href="/cgo" class="transition-opacity duration-500 hover:opacity-75 hover:text-gray-50">CGO</a></li>
              <li v-if="isAllowed('anuncios')"><a href="/anuncios" class="transition-opacity duration-500 hover:opacity-75 hover:text-gray-50">ANUNCIOS</a></li>
              <li v-if="isAllowed('pronacops')" class="mb-3"><a href="/" class="transition-opacity duration-500 hover:opacity-75 hover:text-gray-50">PRONACOPs</a></li>
              <li v-if="isAllowed('proybol91196')" class="mb-3"><a href="/" class="transition-opacity duration-500 hover:opacity-75 hover:text-gray-50">PROY BOL/91196</a></li>
              <li v-if="isAllowed('sneia')" class="mb-3"><a href="/" class="transition-opacity duration-500 hover:opacity-75 hover:text-gray-50">SNEIA</a></li>
              <li v-if="isAllowed('sncca')" class="mb-3"><a href="/" class="transition-opacity duration-500 hover:opacity-75 hover:text-gray-50">SNCCA</a></li>
              <li v-if="isAllowed('formulario_fnca')" class="mb-3"><a href="/" class="transition-opacity duration-500 hover:opacity-75 hover:text-gray-50">FORMULARIOFNCA</a></li>
            </ul>
            <ul class="w-1/2 h-8 flex justify-end space-x-4 mr-4">
              <li><a href="/login" class="transition-opacity duration-500 hover:opacity-75 hover:text-gray-50">INICIAR SESIÓN</a></li>
            </ul>
        </nav>
    </div>
  </template>
  
  <script>
  import { isAllowed } from '@/stores/utils/isAllowed';
  import NotificationBar from '../ComponentsOne/NotificationBar.vue';
  import { ref, inject } from 'vue';
  export default {
    name: "MenuBar",
    components:{
      NotificationBar
    },
    data(){
      const showCaducate = ref(inject("sessionCaducate"));
      return {isAllowed, showCaducate};
    }
  };
  </script>

<!--
bg-gradient-to-r from-yellow-400 to-yellow-300
-->