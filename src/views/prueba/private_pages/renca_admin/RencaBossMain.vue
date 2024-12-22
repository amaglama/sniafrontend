<template>
  
    <router-view></router-view>
    <DelegateConsultants></DelegateConsultants>
</template>

<script>
    import RencaBar from '../../components/RencaBar.vue';
    import DelegateConsultants from './DelegateConsultants.vue';
    export default{
        components: {
            RencaBar,
            DelegateConsultants
        }
    }
</script>