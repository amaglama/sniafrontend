<template>
    <div class="text-white h-24 bg-terciary  w-full text-xl font-bold flex shadow-lg">
        <div :class="`fixed z-10 w-96 h-64 pointer-events-none`">
          <NotificationBar 
            color="danger" 
            :class="`${showCaducate ? '' : 'hidden'} pointer-events-auto`">
            <b>Error Sesión Caducada.</b> Ingrese de nuevo.
          </NotificationBar>
        </div>
        <nav class="flex w-full items-center">
            <ul class="w-3/4 h-8 flex justify-around space-x-4">
              <li><a href="/" class="transition-opacity duration-500 hover:opacity-75 hover:text-gray-50">INICIO</a></li>
              <li><a href="/renca" class="transition-opacity duration-500 hover:opacity-75 hover:text-gray-50">RENCA</a></li>
              <li><a href="/renca-marco-legal" class="transition-opacity duration-500 hover:opacity-75 hover:text-gray-50">MARCO LEGAL</a></li>
              <li class="relative group">
                <a
                  href="#"
                  class="transition-opacity duration-500 hover:opacity-75 hover:text-gray-50 inline-block">
                  REQUISITOS RENCA
                </a>
                  <ul
                    class="absolute left-0 mt-2 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 invisible group-hover:visible z-10 w-48">
                    <li>
                      <a
                        href="/renca-requisitos/requerimiento-inscripcion"
                        class="block px-4 py-2 text-gray-700 hover:bg-primary hover:text-white">
                        Inscripcion
                      </a>
                    </li>
                    <li>
                      <a
                        href="/renca-requisitos/requerimiento-inscripcion"
                        class="block px-4 py-2 text-gray-700 hover:bg-primary hover:text-white">
                        Renovacion
                      </a>
                    </li>
                    <li>
                      <a
                        href="/renca-requisitos/requerimiento-inscripcion"
                        class="block px-4 py-2 text-gray-700 hover:bg-primary hover:text-white">
                        Actualizacion
                      </a>
                    </li>
                  </ul>
              </li>
              <li><a href="/renca-biblioteca-virtual" class="transition-opacity duration-500 hover:opacity-75 hover:text-gray-50">BIBLIOTECA VIRTUAL</a></li>
              <li><a href="/renca-comunicados" class="transition-opacity duration-500 hover:opacity-75 hover:text-gray-50">COMUNICADOS</a></li>
            </ul>
            <ul class="w-1/4 h-8 flex justify-end space-x-4 mr-4">
              <li><a href="/login" class="transition-opacity duration-500 hover:opacity-75 hover:text-gray-50">INICIAR SESIÓN</a></li>
            </ul>
        </nav>
    </div>
  </template>
  
  <script>
  import { isAllowed } from '@/stores/utils/isAllowed';
  import NotificationBar from '@/components/ComponentsOne/NotificationBar.vue';
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