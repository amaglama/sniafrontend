<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { mdiAccount, mdiAsterisk } from '@mdi/js'
import SectionFullScreen from '@/components/ComponentsOne/SectionFullScreen.vue'
import CardBox from '@/components/ComponentsOne/CardBox.vue'
import FormCheckRadio from '@/components/ComponentsOne/FormCheckRadio.vue'
import FormField from '@/components/ComponentsOne/FormField.vue'
import FormControl from '@/components/ComponentsOne/FormControl.vue'
import BaseButton from '@/components/ComponentsOne/BaseButton.vue'
import BaseButtons from '@/components/ComponentsOne/BaseButtons.vue'
import LayoutGuest from '@/layouts/LayoutGuest.vue'

const form = reactive({
  login: 'john.doe',
  pass: 'highly-secure-password-fYjUw-',
  remember: true
})

const router = useRouter()

const submit = () => {
  router.push('/dashboard')
}
</script>

<template>
  <LayoutGuest>
    <SectionFullScreen v-slot="{ cardClass }" bg="purplePink">
      <CardBox :class="cardClass" is-form @submit.prevent="submit">
        <FormField label="Login" help="Please enter your login">
          <FormControl
            v-model="form.login"
            :icon="mdiAccount"
            name="login"
            autocomplete="username"
          />
        </FormField>

        <FormField label="Password" help="Please enter your password">
          <FormControl
            v-model="form.pass"
            :icon="mdiAsterisk"
            type="password"
            name="password"
            autocomplete="current-password"
          />
        </FormField>

        <FormCheckRadio
          v-model="form.remember"
          name="remember"
          label="Remember"
          :input-value="true"
        />

        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="Login" />
            <BaseButton to="/dashboard" color="info" outline label="Back" />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionFullScreen>
  </LayoutGuest>
</template>
