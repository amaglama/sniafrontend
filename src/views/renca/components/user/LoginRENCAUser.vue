<script setup>
  import LoginUser from '@/views/users/components/LoginUser.vue';
  import goTo from '@/stores/utils/goRoute';

  const goToInscription = () =>{
    goTo("/renca-inscribir-usuario");
  }
</script>

<template>
    <div class="flex flex-col items-center h-[400px]">
        <p class="text-blue-800 mt-2 hover:text-blue-400" v-on:click="goToInscription">¿Desea registrarse?</p>
        <LoginUser
          class-name="w-[20vw] h-24"
          :is-card-class-applied="false"
          url="/renca-usuario"
          section-class-name="flex items-center justify-center">
        </LoginUser>
        
    </div>
    

</template>

