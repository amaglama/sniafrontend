<template>
    <div class="flex w-full h-full ">
      <!-- Barra lateral -->
      <div 
        :class="[
          'leftbar bg-gray-800 text-white h-screen max-2xl:h-[85vh] flex flex-col overflow-y-auto transition-all duration-500',
          isLeftbarVisible ? 'p-5 w-64' : 'w-0']"
          @transitionend="handleTransitionEnd">
        <h1 
          v-if="isAnimationCompleted && menuOptionsPublic.length > 0" 
          :class="`${isLeftbarVisible? '' : 'invisible'} text-xl font-bold mb-4`">
          Menú
        </h1>
        <FormField 
          label="Menu"
          v-if="isAnimationCompleted && menuOptionsPublic.length > 0" 
          :class="`${isLeftbarVisible? '' : 'invisible'} ${menuOptionsPublic.length > 0? '' : 'hidden'}`">
          <ul>
            <li v-for="(item, key) in menuOptionsPublic" :key="key">
              <ul>
                <li v-for="(subItem, subKey) in item" :key="subKey" class="mt-2">
                  <template v-if="isSubMenu(subItem)">+
                    <span class="font-semibold">{{ subKey }}</span>
                    <ul>
                      <li v-for="(link, linkKey) in subItem" :key="linkKey" class="mt-2 hover:opacity-80">
                        <router-link :to="link" class="ml-4 text-green-400">&#xb7; {{ linkKey }}</router-link>
                      </li>
                    </ul>
                  </template>
                  <template v-else>
                    <li class="mt-2 hover:opacity-80">
                      <router-link :to="subItem" class="font-semibold text-green-100">{{ subKey }}</router-link>
                    </li>
                  </template>
                </li>
                
              </ul>
            </li>
          </ul>
        </FormField>
        <FormField 
          label="Opciones" 
          v-if="isAnimationCompleted && menuOptions.length > 0" 
          :class="`${isLeftbarVisible? '' : 'invisible'} ${menuOptions.length > 0? '' : 'hidden'}`">
          <ul>
            <li v-for="(option, index) in menuOptions" :key="index" class="hover:opacity-80">
              <router-link :to="option.url" class="hover:text-gray-300">{{ option.title }}</router-link>
            </li>
          </ul>
        </FormField>
        <FormField 
          label=""
          v-if="isAnimationCompleted && options.length > 0"  
          :class="`${isLeftbarVisible? '' : 'invisible'} ${options.length > 0? '' : 'hidden'}`">
          <ul>
            <li v-for="(option, index) in options" :key="index" class="hover:opacity-80">
              <a
                class="hover:text-gray-300"
                @click="() => option.onClick(option.url)">
                  {{ option.title }}
            </a>
            </li>
          </ul>
        </FormField>
      </div>
      <div class="flex-1 w-full h-[100vh] overflow-y-auto">
          <MenuBar></MenuBar>
          <div class="h-[100vh] overflow-y-auto">
            <RouterView />
          </div>
          <div class="h-24"></div>
      </div>
      

    </div>
</template>

<script>
import { inject } from 'vue';
import { ref, watch } from 'vue';
import MenuBar from '../essencials/MenuBar.vue';
import FormField from '../ComponentsOne/FormField.vue';
import { GENERAL_LIST, LISTS, LISTS_PUBLIC } from '@/stores/constants/constants';
import { PAGES_PATH } from '@/stores/constants/pages';
import { isAllowed } from '@/stores/utils/isAllowed';
import { encryptMe } from '@/stores/utils/encryption';
import { logout } from '@/services/auth';
import goTo from '@/stores/utils/goRoute';
import { getCookie } from '@/stores/utils/cookies';
import RencaBar from '@/views/renca/components/RencaBar.vue';

  const directoryPath = location.pathname;
  let key = "";

  const onClicks = {
    "Configuración": (url) => {
      const id_user = getCookie("id_user");
      const newUrl = `${url}?id=${encryptMe(id_user)}`;
      goTo(newUrl);
    },
    "Cerrar Sesión": (url) => {
      logout();
      goTo(url);
    },
    "PDF Informe": (url) => {
      goTo(url);
    },
  }


  
  const isSubMenu = (element) => "object" === typeof element;
    export default {
    name: "LeftBar",
    components: {
      MenuBar,
      FormField,
      RencaBar,
    },
    data() {
      const directoryPathsRENCAPublic = [
        "/registro-personal",
        "/registro-empresas",
        "/tramites-pendientes",
        "/tramites-renca",
        "/solicitud-renovacion",
        "/cuentas-bancarias-autorizadas",
        "/lista-unipersonales",
        "/lista-empresas",
        "/renca-dashboard",
      ];

      const directoryPathsUsuarioRENCAPublic = [
        "/renca-usuario/cambiar-contrasena",
        "/renca-usuario/renovacion-usuario",
        "/renca-usuario/actualizar-usuario",
      ];

      const directoryPathsRencaJefeRENCAPublic = [
        "/renca-jefe"
      ];

      if (directoryPath === PAGES_PATH["renca-jefe"] || directoryPathsRencaJefeRENCAPublic.find(a => a === directoryPath) !== undefined){
        key = "renca-jefe";
      }

      if (directoryPath === PAGES_PATH["renca-usuario"] || directoryPathsUsuarioRENCAPublic.find(a => a === directoryPath) !== undefined){
        key = "renca-usuario";
      }
      if (directoryPath === PAGES_PATH["renca"] || directoryPathsRENCAPublic.find(a => a === directoryPath) !== undefined){
        key = "renca";
      }
      if (directoryPath === PAGES_PATH["usuarios"] || directoryPath == "/usuario-registro"){
        key = "usuarios";
      }

      if (directoryPath === PAGES_PATH["anuncios"] || directoryPathsRENCAPublic.find(a => a === directoryPath) !== undefined){
        key = "anuncios";
      }

      //For private menus
      const menuOptions = ref(
        key === "" || !isAllowed(key)? [] :
        Object.entries(LISTS[key]).map(([title, url]) => ({
          title,
          url,
        }))
      );

      //For general menus
      const options = ref(
        key === "" && isAllowed("/")? [] :
        Object.entries(GENERAL_LIST).map(([title, url]) => ({
          title,
          url,
          onClick: onClicks[title]
        }))
      );
      if (directoryPath == "/RENCA" || directoryPath.includes("/renca")) key = "renca";
      
      //For public menus
      const menuOptionsPublic = ref(
        key === ""? {} :
        Object.entries(LISTS_PUBLIC[key]).map(([title, object]) => {
          return ({
            [title]: object
        })})
      );

      const isLeftbarVisible = inject("isLeftbarVisible");

      const isAnimationCompleted = ref(true);
      const handleTransitionEnd = () => {
        isAnimationCompleted.value = this.isLeftbarVisible;
      };
      /*
      watch(
        () => this.isLeftbarVisible,
        (newValue) => {
          console.log(newValue)
          if (!newValue) {
            isAnimationCompleted.value = false;
          }
        }
      );
*/

      return {
        isLeftbarVisible: isLeftbarVisible,
        menuOptions: menuOptions,
        options: options,
        menuOptionsPublic: menuOptionsPublic,
        isSubMenu,
        handleTransitionEnd, 
        isAnimationCompleted
      };
    },
    methods: {
    }
    };
</script>


<style>
  
  .leftbar {
    @apply transition-transform duration-300;
  }
</style>

<!--

                <div v-if="isObject(subItem)">
                    <span>{{ subKey }}</span>
                  <ul>
                    <li v-for="(link, linkKey) in subItem" :key="linkKey">
                      <a :href="link" class="text-blue-500 hover:underline">{{ linkKey }}</a>
                    </li>
                  </ul>
                </div>
                <div v-else>
                  <a :href="subItem" class="text-blue-500 hover:underline">{{ subKey }}</a>
                </div>

-->