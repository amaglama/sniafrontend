<template>
    
    <div class="flex justify-center items-center w-full h-2/3">
        <div class="flex flex-col w-1/3 gap-y-8 border-2 rounded-lg p-8">
            <div class="flex justify-start h-6">
                <svg 
                    class="flex w-6 h-6 hover:text-gray-400" 
                    :onclick="onBack">
                    <path fill="currentColor" :d="mdiArrowULeftBottom" />
                </svg>
            </div>
            <p class="font-bold text-center">
                INGRESE SU EMAIL PARA RECUPERAR SU CONTRASEÑA
            </p>
            <InputForm
                v-model="email"
                label="EMAIL"
                placeholder="Ingrese su email"
                type="email"
                :form-types="validateEmail"
                :errors="errors"
            ></InputForm>  
            <ButtonComp
                label="ENVIAR"
                v-on:click="onSend"
            ></ButtonComp>
            
        </div>
        
    </div>
</template>
<script>
    import InputForm from '@/components/forms/input/InputForm.vue';
    import ButtonComp from '@/components/essencials/ButtonComp.vue';
    import { ref } from 'vue';
    import { validationInputField } from '@/components/forms/validationInput';
    import { MAX_LENGTH_INPUT } from '@/stores/constants/pages';
    import { mdiArrowULeftBottom } from '@mdi/js';
    import goTo from '@/stores/utils/goRoute';

    export default {
        components: {
            InputForm,
            ButtonComp
        },
        setup(){
            const email = ref("");
            const validateEmail = validationInputField("email", true, MAX_LENGTH_INPUT, 0);
            const errors = ref([]);
            const onSend = () => {

            }

            const onBack = () =>{
                goTo("/renca-usuario/cambiar-contrasena");
            }
            return {
                email,
                onSend,
                validateEmail,
                errors,
                mdiArrowULeftBottom,
                onBack
            };
        }
    }
</script>