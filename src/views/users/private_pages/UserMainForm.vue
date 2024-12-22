<template>
  <UserForm
        title="USUARIO REGISTRO"
        user="admin"
        :prev-success="prevSuccess"
  ></UserForm>
</template>
<script>

import FormField from '@/components/forms/formfield/FormField.vue';
import FormComp from '@/components/forms/FormComp.vue';
import { ref, watch, onMounted, computed } from 'vue';
import { reactive } from 'vue';
import InputForm from '@/components/forms/input/InputForm.vue';
import SelectForm from '@/components/forms/select/SelectForm.vue';
import { validationInputField } from '@/components/forms/validationInput';
import { MAX_LENGTH_INPUT } from "@/stores/constants/pages";
import { useRoute } from 'vue-router';
import { decryptMe } from '@/stores/utils/encryption';
import { getUser } from '@/services/users';
import { APIS } from '@/stores/constants/urlsBackEnd';
import NotificationBar from '@/components/ComponentsOne/NotificationBar.vue';
import PasswordChecker from '../components/PasswordChecker.vue';
import UserForm from '../components/UserForm.vue';
import goTo from '@/stores/utils/goRoute';

const POSTURL = APIS.USUARIOS.POST;
const PUTURL = APIS.USUARIOS.PUT;
const DELETEURL = APIS.USUARIOS.DELETE;

export default {
  name: 'UserMainForm',
  components: {
    FormComp,
    FormField,
    SelectForm,
    InputForm,
    NotificationBar,
    PasswordChecker,
    UserForm,
  },
  setup()
  {
    const prevSuccess = () =>{
      goTo("/usuarios");
    }
    return {
      prevSuccess
    };
  }

  
};
</script>