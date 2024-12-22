<template>
    <div class="flex justify-center">
        <div class="w-1/2">
            <FormComp
                title="CAMBIAR CONTRASEÑA"
                label-submit="CAMBIAR"
                :form="form"
                :form-types="formTypes"
                :form-errors="formErrors"
                :post-url="postUrl"
                :icon-left="mdiLock"
                :icon-right="mdiSafe">
                <div class="flex gap-x-12">
                    <div class="flex flex-col w-1/2 gap-y-12">
                        <InputForm
                            v-model="form.password"
                            :form-types="formTypes['password']"
                            :errors="formErrors['password']"
                            label="CONTRASEÑA"
                            placeholder="CONTRASEÑA"
                            :required="true"
                            type="password"
                        ></InputForm>
                        <InputForm
                            v-model="form.newPassword"
                            :form-types="formTypes['password']"
                            :errors="formErrors['password']"
                            label="REPETIR CONTRASEÑA"
                            placeholder="REPETIR CONTRASEÑA"
                            :required="true"
                            type="password"
                        ></InputForm>
                    </div>
                    <div class="flex w-1/2 border justify-center items-center">
                        <p :class="`flex justify-center font-bold ${form.password === form.newPassword? 'text-green-400' : 'text-red-400'}`">
                            <svg v-if="form.password === form.newPassword" class="w-8 h-8 text-green-400">
                                <path fill="currentColor" :d="mdiCheckOutline" />
                            </svg>
                            <svg v-if="form.password !== form.newPassword" class="w-8 h-8 text-red-400">
                                <path fill="currentColor" :d="mdiWindowClose" />
                            </svg>
                            Las contraseñas coinciden.
                        </p>
                    </div>
                </div>
                
            </FormComp>
        </div>  
    </div>
    <div class="flex justify-center">
        <div class="text-sky-600 hover:text-sky-800">
            <a href="/renca-usuario/recuperar-contrasena">olvido su contraseña</a>
        </div>
    </div>
</template>

<script>
    import { validationInputField } from '@/components/forms/validationInput';
    import { ref, reactive } from 'vue';
    import FormComp from '@/components/forms/FormComp.vue';
    import { APIS } from '@/stores/constants/urlsBackEnd';
    import InputForm from '@/components/forms/input/InputForm.vue';
    import { MAX_LENGTH_INPUT } from '@/stores/constants/pages';
    import { mdiLock, mdiSafe, mdiCheckOutline, mdiWindowClose } from '@mdi/js';
        
    export default{
        components: {
            FormComp,
            InputForm
        },
        setup(){
            const form = reactive({
                password: "",
                newPassword: ""
            });

            const formTypes = {
                password: validationInputField("password", true, MAX_LENGTH_INPUT, 6),
                newPassword: validationInputField("password", true, true, MAX_LENGTH_INPUT, 6),
            }

            const formErrors = ref({});
            return {
                form,
                formTypes,
                formErrors,
                postUrl: APIS.USER_RENCA.PASSWORD,
                mdiLock,
                mdiSafe,
                mdiCheckOutline,
                mdiWindowClose,
            };

        }
    };
</script>