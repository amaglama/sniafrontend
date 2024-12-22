<template>
    <FormComp
        :title="title"
        :post-url="postUrl"
        :on-send="onSend"
        :form-errors="formErrors"
        :is-data-form="false"
        :form="form"
        :form-types="formTypes"
        :wait-time="3000"
        :prev-success="prevSuccess"
        >
        <FormField label="DATOS DEL CONSULTOR UNIPERSONAL:">
            <div class="gap-y-4">
                <div class="flex flex-wrap gap-y-4">
                    <div class="flex w-full flex-nowrap">
                        <div class="flex flex-col w-full justify-around p-1 lg:gap-y-4">
                            <div class="flex w-full justify-between flex-wrap">
                                <div class="w-1/3">
                                    <div class="flex">
                                        <SelectForm
                                            name="type_identification_document"
                                            v-model="form.type_identification_document" 
                                            :options="type_identification_document"
                                            :required="true"
                                            label="Documento de Identidad"
                                            :errors="formErrors['type_identification_document']"
                                            :form-types="formTypes['type_identification_document']"
                                            :on-set="onChangeTypeIdentificationDocument"
                                            class-name="w-52"
                                            />
                                    </div>    
                                </div>
                                <div class="w-1/3">
                                    <div class="flex">
                                        <InputForm
                                            name="identification_document"
                                            v-model="form.identification_document" 
                                            type="text" 
                                            placeholder="Número de Identidad" 
                                            :required="true"
                                            label="Número de Identidad"
                                            :errors="formErrors['identification_document']"
                                            :form-types="formTypes['identification_document']"
                                            maxlength="16"
                                            />
                                    </div>
                                </div>
                                <div class="w-1/3">
                                    <div class="flex justify-between">
                                        <InputForm
                                            name="ci_complement"
                                            v-model="form.ci_complement"
                                            type="text" 
                                            placeholder=""  
                                            label="Complemento"
                                            :errors="formErrors['ci_complement']"
                                            :form-types="formTypes['ci_complement']"
                                            :disabled="form.type_identification_document != type_identification_document[0]"
                                            class-name="w-28"
                                            />
                                        <SelectForm
                                            name="ci_expedited"
                                            v-model="form.ci_expedited" 
                                            :options="states.map(s => s['code'])"
                                            label="Expedido"
                                            :errors="formErrors['ci_expedited']"
                                            :form-types="formTypes['ci_complement']"
                                            :disabled="form.type_identification_document != type_identification_document[0]"
                                            class-name="w-20"
                                            />
                                    </div>
                                </div>
                               
                            </div>
                            <div class="flex">
                                <div class="flex w-1/3">
                                    <InputForm
                                        name="first_name"
                                        v-model="form.first_name" 
                                        type="text" 
                                        placeholder="Nombres" 
                                        :required="true"
                                        label="Nombres"
                                        :errors="formErrors['first_name']"
                                        :form-types="formTypes['first_name']"
                                        class-name=""
                                        />
                                </div>
                                <div class="flex w-1/3">
                                    <InputForm
                                        name="last_name"
                                        v-model="form.last_name" 
                                        type="text" 
                                        placeholder="Apellido Paterno" 
                                        :required="true"
                                        label="Apellido Paterno"
                                        :errors="formErrors['last_name']"
                                        :form-types="formTypes['last_name']"
                                        class-name=""
                                        />
                                </div>
                                <div class="flex w-1/3">
                                    <InputForm
                                        name="second_last_name"
                                        v-model="form.second_last_name" 
                                        type="text" 
                                        placeholder="Apellido Materno" 
                                        label="Apellido Materno"
                                        :errors="formErrors['second_last_name']"
                                        :form-types="formTypes['second_last_name']"
                                        class-name=""
                                        />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex my-4">
                    <div class="w-1/2">
                        <InputForm
                            name="cellphone"
                            v-model="form.cellphone" 
                            type="text" 
                            placeholder="Nro. de Celular" 
                            :required="true"
                            label="Nro. de Celular"
                            :errors="formErrors['cellphone']"
                            :form-types="formTypes['cellphone']"
                            class-name="w-48"
                            />
                    </div>
                    <div class="w-1/2">
                        <InputForm
                            name="email"
                            v-model="form.email" 
                            type="text" 
                            placeholder="Email" 
                            :required="true"
                            :is-to-upper-case="false"
                            label="Email"
                            :errors="formErrors['email']"
                            :form-types="formTypes['email']"
                            class-name="w-96"
                            />
                    </div>
                    
                    
                </div>
                
            </div>
        </FormField>
    </FormComp>
</template>
<script>
    import FormField from '@/components/ComponentsOne/FormField.vue';
    import InputForm from '@/components/forms/input/InputForm.vue';
    import SelectForm from '@/components/forms/select/SelectForm.vue';
    import FormComp from '@/components/forms/FormComp.vue';
    import { validationInputField } from '@/components/forms/validationInput';
    import { ref, reactive, onMounted } from 'vue';
    import { MAX_LONG_LENGTH_INPUT, MAX_SHORT_LENGTH_INPUT, MAX_LENGTH_INPUT } from '@/stores/constants/pages';
    import { type_identification_document, consultor_types } from '@/stores/constants/constantsRENCA';
    import { APIS } from '@/stores/constants/urlsBackEnd';
    import { getStates, getUser } from '@/services/users';
import { useRoute } from 'vue-router';
import { decryptMe } from '@/stores/utils/encryption';

    export default {
        components: {
            FormField,
            SelectForm,
            InputForm,
            FormComp
        },
        props: {
            title: {
                type: String,
                default: ""
            },
            user: {
                type: String,
                default: "renca"
            },
            prevSuccess: {
                type: Function,
                default: () => {}
            }
        },
        setup(props){
            const route = useRoute();
            const id = route.query.id? Number(decryptMe(route.query.id)) : null;
            let isUpdate = ref(props.isUpdate);
            if (id !== null){
                isUpdate.value = true;
            }

            const typeUser = {
                "renca": "CONSULTOR RENCA",
                "admin": "CONSULTOR RENCA",//"Administrador",
            }
            const form = reactive({
                type_identification_document: '',
                identification_document: '',
                ci_complement: '',
                ci_expedited: '',
                first_name: '',
                last_name: '',
                second_last_name: '',
                cellphone: '',
                email: '',
                type: typeUser[props.user]
            });

            console.log(typeUser[props.user])

            const formTypes = reactive({
                type_identification_document: validationInputField("text", true, MAX_LONG_LENGTH_INPUT),
                identification_document: validationInputField("text", true, MAX_SHORT_LENGTH_INPUT),
                ci_complement: validationInputField("text", false, MAX_SHORT_LENGTH_INPUT),
                ci_expedited: validationInputField("text", false, MAX_LENGTH_INPUT),
                first_name: validationInputField("text", true, MAX_LONG_LENGTH_INPUT),
                last_name: validationInputField("text", true, MAX_LONG_LENGTH_INPUT),
                second_last_name: validationInputField("text", false, MAX_LONG_LENGTH_INPUT),
                cellphone: validationInputField("text", true, MAX_SHORT_LENGTH_INPUT),
                email: validationInputField("email", true, MAX_LONG_LENGTH_INPUT),
                type: validationInputField("text", true)
            });
            const formErrors = ref({});
            const states = ref([]);

            const loadUser = async () => {
                console.log(id)
                if (id !== null) {
                    const user = await getUser(id);
                    console.log(user)
                    form.first_name = user.first_name;
                    form.type_identification_document = user.type_identification_document;
                    form.identification_document = user.identification_document;
                    form.ci_complement = user.ci_complement;
                    form.ci_expedited = user.ci_expedited;
                    form.first_name = user.first_name;
                    form.last_name = user.last_name;
                    form.second_last_name = user.second_last_name;
                    form.username = user.username;
                    form.email = user.email;
                    form.type = user.type;
                    form.cellphone = user.cellphone;
                }
            };


            const loadStates = async () =>{
                const newStates = await getStates();
                states.value = newStates;
            };
            

            onMounted(() => {
                loadStates();
                loadUser();
            });

            function onChangeTypeIdentificationDocument(_){
                form.ci_complement = "";
                form.ci_expedited = "";
            }

            function onChangeState(name){
                const state = states.value.find(s => s["name"].toUpperCase() === name);
                if (state){
                    form.residence_id = state["id"];
                }
            }

            function onSend(form){
                return {
                    "first_name": form.first_name,
                    "last_name": form.last_name,
                    "second_last_name": form.second_last_name,
                    "email": form.email,
                    "username": `${form.first_name}.${form.last_name}`,
                    "password": form.identification_document,
                    "type": form.type,
                    "type_identification_document": form.type_identification_document,
                    "identification_document": form.identification_document,
                    "ci_complement": form.ci_complement,
                    "ci_expedited": form.ci_expedited,
                    "cellphone": form.cellphone,
                    "group_id": 1,
                    "menus_ids": [],
                    "permissions_ids": []
                    
                }
            }


            return {
                title: props.title,
                form,
                formTypes,
                formErrors,
                states,
                type_identification_document,
                onChangeTypeIdentificationDocument,
                onChangeState,
                consultor_types,
                postUrl: APIS.USUARIOS.POST,
                onSend,
                prevSuccess: props.prevSuccess
            };
        }
    }
</script>