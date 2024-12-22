<script setup>
  import { inject } from 'vue'
  import LayoutGuest from '@/layouts/LayoutGuest.vue'
  import LoginUser from '../components/LoginUser.vue';

  const toggleLeftbar = inject('toggleLeftbar');
  const toggleNavbar = inject('toggleNavbar');
  const isLeftbarVisible = inject("isLeftbarVisible");
  const isNavBarVisible = inject('isNavBarVisible');

  if (isLeftbarVisible.value) toggleLeftbar();
  if (isNavBarVisible.value) toggleNavbar();
  
  const prevLogin = () => {
    if (!isLeftbarVisible.value) toggleLeftbar();
    if (!isNavBarVisible.value) toggleNavbar();
  }
</script>

<template>
  <LayoutGuest class="background-container">
    <LoginUser
      url="/"
      :prev-login="prevLogin">
    </LoginUser>
    
  </LayoutGuest>
</template>
<style>
.background-container {
  width: 100%;
  height: 100vh;
  background-image: url('../../../../assets/background_login.jpg');
  background-size: cover;
  background-position: center;
}
</style>
