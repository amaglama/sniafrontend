<script setup>
    import { ref } from 'vue'
    import SectionFullScreen from '@/components/ComponentsOne/SectionFullScreen.vue'
    import CardBox from '@/components/ComponentsOne/CardBox.vue'
    import FormField from '@/components/ComponentsOne/FormField.vue'
    import FormControl from '@/components/ComponentsOne/FormControl.vue'
    import BaseDivider from '@/components/ComponentsOne/BaseDivider.vue'
    import BaseButton from '@/components/ComponentsOne/BaseButton.vue'
    import NotificationBar from '@/components/ComponentsOne/NotificationBar.vue'
    import { mdiAccount, mdiAsterisk } from '@mdi/js'
    import { useForm } from '@inertiajs/vue3'
    import { login } from '@/services/auth'
    import goTo from '@/stores/utils/goRoute'

    const props = defineProps({
        url: {
            type: String,
            default: "/"
        },
        prevLogin: {
            type: Function,
            default: () => {}
        },
        isCardClassApplied: {
          type: Boolean,
          default: true
        },
        className: {
          type: String,
          default: ""
        },
        sectionClassName: {
          type: String,
          default: null
        }
    });

    const showError = ref(false);
    const form = useForm({
        username: '',
        password: '',
        remember: []
    })
    const submit = () => {
    
    form.transform(data => ({
        ... data,
        remember: form.remember && form.remember.length ? 'on' : ''
        }))
        login({
        username: form.username,
        password: form.password,
        }).then((data) => {
        if (data == null){
            showError.value = true;
        }
        else{
            props.prevLogin();
            goTo(props.url);
        }
        });
    }
</script>

<template>
    <SectionFullScreen v-slot="{ cardClass }" class="flex flex-col" :class-name="sectionClassName !== null? sectionClassName: 'flex min-h-screen items-center justify-center'">
      <CardBox
        :class="`${isCardClassApplied? cardClass: ''}${className} w-96 mb-16 max-[2000px]:mt-6 max-xl:mt-8`"
        is-form
        @submit.prevent="submit"
      >
        <FormField
          label="Nombre de usuario"
          label-for="username"
          help="Por favor ingrese su nombre de usuario"
        >
          <FormControl
            id="username"
            v-model="form.username"
            :icon="mdiAccount"
            type="text"
            required
          />
        </FormField>

        <FormField
          label="Contraseña"
          label-for="password"
          help="Por favor ingrese su contraseña"
        >
          <FormControl
            id="password"
            v-model="form.password"
            :icon="mdiAsterisk"
            type="password"
            autocomplete="current-password"
            required
          />
        </FormField>
        <BaseDivider />
        <div class="flex justify-center">
          <BaseButton
            type="submit"
            color="primary"
            label="INGRESAR"
            :class="{ 'opacity-25': form.processing }"
            :disabled="form.processing"
          />
        </div>
      </CardBox>
      <div  :class="`mb-16 w-96 h-64 pointer-events-none ${showError? '': ''}`">
        <NotificationBar color="danger" :class="`${showError? '': 'hidden'}`">
          <b>Error login.</b> No se pudo realizar el login.
        </NotificationBar>
      </div>
    </SectionFullScreen>
</template>
