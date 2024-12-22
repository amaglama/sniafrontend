<template>
    <FormComp 
        :form="consultant"
        :form-types="formTypes"
        :form-errors="formErrors"
        :put-url="putUrl"
        :on-send-data-form="onSendFormData"
        :is-edit="true">
        <div class="flex flex-col bg-gray-50 border border-gray-100 w-full h-fit gap-y-4">
            <div class="flex">
                <div class="flex flex-col w-3/4 gap-y-4">
                    <div class="flex w-full flex-wrap">
                        <div class="flex flex-col w-full">
                            <TitleForm>NOMBRE:</TitleForm>
                            <div class="flex gap-x-2">
                                <InputForm
                                    name="user_name"
                                    v-model="consultant.user_name" 
                                    type="text" 
                                    placeholder="Nombres" 
                                    :required="true"
                                    :errors="formErrors['user_name']"
                                    :form-types="formTypes['user_name']"
                                    />
                                <InputForm
                                    name="user_name"
                                    v-model="consultant.last_name" 
                                    type="text" 
                                    placeholder="Apellido Paterno" 
                                    :required="true"
                                    :errors="formErrors['last_name']"
                                    :form-types="formTypes['last_name']"
                                    />
                                <InputForm
                                    name="user_name"
                                    v-model="consultant.second_last_name" 
                                    type="text" 
                                    placeholder="Apellido Materno" 
                                    :required="true"
                                    :errors="formErrors['second_last_name']"
                                    :form-types="formTypes['second_last_name']"
                                    />
                            </div>
                        </div>
                        <div class="flex flex-col w-1/2">
                            <TitleForm>CI:</TitleForm>
                            <div class="flex gap-x-2">
                                <InputForm
                                    name="identification_document"
                                    v-model="consultant.identification_document" 
                                    type="text" 
                                    placeholder="Documento Identidad" 
                                    :required="true"
                                    :errors="formErrors['identification_document']"
                                    :form-types="formTypes['identification_document']"
                                    :on-set="onChangeTypeIdentificationDocument"
                                    />
                                <InputForm
                                    name="ci_complement"
                                    v-model="consultant.second_last_name" 
                                    type="text" 
                                    placeholder="Complemento" 
                                    :errors="formErrors['ci_complement']"
                                    :form-types="formTypes['ci_complement']"
                                    :disabled="consultant.type_identification_document != type_identification_document[0]"
                                    class-name="w-32"
                                    />
                                <SelectForm
                                    name="ci_expedited"
                                    v-model="consultant.ci_expedited" 
                                    :options="states.map(s => s['code'])"
                                    :errors="formErrors['ci_expedited']"
                                    :form-types="formTypes['ci_complement']"
                                    :disabled="consultant.type_identification_document != type_identification_document[0]"
                                    class-name="w-20 pr-2"
                                    />
                            </div>
                        </div>
                        <div class="flex flex-col w-1/2">
                            <TitleForm>SOLICITUD:</TitleForm>
                            <p> {{ consultant["request_code"] }}</p>
                        </div>
                    </div>
                    <div class="flex flex-col w-1/2 pr-4">
                        <TitleForm>TIPO DE CONSULTANTE:</TitleForm>
                        <SelectForm
                                name="consultant_type"
                                v-model="consultant.consultant_type" 
                                :options="consultor_types"
                                :errors="formErrors['consultant_type']"
                                :form-types="formTypes['consultant_type']"
                                />
                    </div>
                    <div class="flex w-full">
                        <div class="flex flex-col w-1/3">
                            <TitleForm>PROFESION:</TitleForm>
                            <div class="flex">
                                <InputForm
                                    name="national_certificate"
                                    v-model="consultant.national_certificate" 
                                    type="text" 
                                    placeholder="Certificado nacional"
                                    :required="true" 
                                    :errors="formErrors['national_certificate']"
                                    :form-types="formTypes['national_certificate']"
                                    />
                            </div>
                        </div>
                        <div class="flex flex-col w-1/3">
                            <TitleForm>FECHA EMISION:</TitleForm>
                            <div class="flex">
                                <InputForm
                                    name="emition_date"
                                    :v-model="formatDateInput(consultant.emition_date)" 
                                    type="text" 
                                    placeholder="Fecha emisión"
                                    :required="true" 
                                    :errors="formErrors['emition_date']"
                                    :form-types="formTypes['emition_date']"
                                    />
                            </div>
                        </div>
                        <div class="flex flex-col w-1/3">
                            <TitleForm>CATEGORIA:</TitleForm>
                            <div class="flex">
                                <SelectForm
                                    name="category"
                                    v-model="consultant.category" 
                                    :options="categories"
                                    :errors="formErrors['category']"
                                    :form-types="formTypes['category']"
                                    :required="true"
                                    class-name="w-16"
                                    />
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col w-full">
                        <TitleForm>DIRECCION:</TitleForm>
                        <div class="flex w-1/2">
                            <InputForm
                                name="address"
                                v-model="consultant.address" 
                                type="text" 
                                placeholder="Dirección"
                                :required="true" 
                                :errors="formErrors['address']"
                                :form-types="formTypes['address']"
                                class-name="w-full"
                                />
                        </div>
                    </div>
                    <div class="flex w-full justify-start">
                        <div class="flex flex-col w-1/3">
                            <TitleForm>CELULAR:</TitleForm>
                            <div class="flex">
                                <InputForm
                                    name="cellphone"
                                    v-model="consultant.cellphone" 
                                    type="text" 
                                    placeholder="Celular"
                                    :required="true" 
                                    :errors="formErrors['cellphone']"
                                    :form-types="formTypes['cellphone']"
                                    />
                            </div>
                        </div>
                        <div class="flex flex-col w-1/3">
                            <TitleForm>TELEFONO:</TitleForm>
                            <div class="flex">
                                <InputForm
                                    name="telephone"
                                    v-model="consultant.telephone" 
                                    type="text" 
                                    placeholder="Telefono"
                                    :errors="formErrors['telephone']"
                                    :form-types="formTypes['telephone']"
                                    />
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col w-full">
                        <TitleForm>EMAIL:</TitleForm>
                        <div class="flex">
                            <InputForm
                                name="email"
                                v-model="consultant.email" 
                                type="text" 
                                placeholder="Email"
                                :required="true" 
                                :errors="formErrors['email']"
                                :form-types="formTypes['email']"
                                />
                        </div> 
                    </div>
                    <div class="flex w-full">
                        <div class="flex w-full">
                            <p class="flex flex-col"><TitleForm>FECHA SOLICITUD:</TitleForm> {{ formatDateTime(consultant["created_at"]) }}</p>
                        </div> 
                    </div>
                </div>
                <div class="flex justify-center items-center w-1/4 h-64 bg-gray-100">
                    <ImageUploaderForm
                        v-model="consultant.photo"
                        name="photo"
                        :required="true"
                        :errors="formErrors['photo']"
                        :form-types="formTypes['photo']"
                        ></ImageUploaderForm>
                </div>
            </div>
        </div>
    </FormComp>
</template>

<script>
    import { getConsultant } from '@/services/renca';
    import { ref, onMounted, reactive, watch } from 'vue';
    import { formatDateTime, formatDateInput } from '@/stores/utils/dateFormats';
    import ButtonComp from '@/components/essencials/ButtonComp.vue';
    import TitleForm from '@/components/Titles/TitleForm.vue';
    import TableComp from '@/components/table/TableComp.vue';
    import { encryptMe } from '@/stores/utils/encryption';
    import FormComp from '@/components/forms/FormComp.vue';
    import InputForm from '@/components/forms/input/InputForm.vue';
    import SelectForm from '@/components/forms/select/SelectForm.vue';
    import { getStates } from '@/services/users';
    import { consultor_types, categories, type_identification_document } from '@/stores/constants/constantsRENCA';
    import ImageUploaderForm from '@/components/forms/ImageUploader/ImageUploaderForm.vue';
    import { validationInputField } from '@/components/forms/validationInput';
import { APIS } from '@/stores/constants/urlsBackEnd';
import { MAX_DESCRIPTION_INPUT, MAX_LENGTH_INPUT, MAX_LONG_LENGTH_INPUT, MAX_SHORT_LENGTH_INPUT } from '@/stores/constants/pages';
import { formatDateToISO } from '@/stores/utils/dateFormats';
    const consultant = ref({});
    export default{
        components: {
            ButtonComp,
            TitleForm,
            TableComp,
            FormComp,
            InputForm,
            SelectForm,
            ImageUploaderForm
        },
        props: {
            idSelected: {
                type: Number,
                required: true
            },
            typeConsultantForm: {
                type: String,
                default: "REGISTRO"
            }
        },
        setup(props){
            const id = props.idSelected? props.idSelected: null;
            const states = ref([]);
            const isApproved = reactive({
                note: false,
                work_certificades: false,
                photo: false,
                deposit: false
            });
  
            const isApprovedAll = ref(false);

            watch(() => Object.values(isApproved), (newForm)=>{
                isApprovedAll.value = newForm.reduce((a, b) => a && b, true);
            }, {deep: true})
            const loadConsultant = async () => {
                if (id !== null) {
                    const consultantEdit = await getConsultant(id);
                    consultant.value = consultantEdit;
                }
            };

            const loadStates = async () => {
                const newStates = await getStates();
                states.value = newStates;
            };

            onMounted(() => {
                loadConsultant();
                loadStates();
            });

            function onChangeTypeIdentificationDocument(_){
                consultant.ci_complement = "";
                consultant.ci_expedited = "";
            }

            function onSendFormData(form){
                return {
                    "request_code": form.request_code,
                    "type_identification_document": form.type_identification_document,
                    "identification_document": form.identification_document,
                    "user_name": form.user_name,
                    "last_name": form.last_name,
                    "address": form.address,
                    "email": form.email,
                    "consultant_type": form.consultant_type,
                    "category": form.category,
                    "second_last_name": form.second_last_name,
                    "ci_complement": form.ci_complement,
                    "ci_expedited": form.ci_expedited,
                    "telephone": form.telephone,
                    "cellphone": form.cellphone,
                    "national_certificate": form.national_certificate,
                    "state_certificate": form.state,
                    "emition_date": formatDateToISO(form.emition_date),
                    "visible_address": form.visible_address,
                    "visible_telephone": form.visible_telephone,
                    "visible_cellphone": form.visible_cellphone,
                    "visible_email": form.visible_email,
                    "state": true,
                    "residence_id": form.residence_id,
                }
            }


    

            const formTypes = {
                request_code : validationInputField("text", true, MAX_SHORT_LENGTH_INPUT),
                type_identification_document: validationInputField("text", true, MAX_LONG_LENGTH_INPUT),
                identification_document: validationInputField("text", true, MAX_SHORT_LENGTH_INPUT),
                ci_complement: validationInputField("text", false, MAX_SHORT_LENGTH_INPUT),
                ci_expedited: validationInputField("text", false, MAX_LENGTH_INPUT),
                user_name: validationInputField("text", true, MAX_LONG_LENGTH_INPUT),
                last_name: validationInputField("text", true, MAX_LONG_LENGTH_INPUT),
                second_last_name: validationInputField("text", false, MAX_LONG_LENGTH_INPUT),
                address: validationInputField("text", true, MAX_LONG_LENGTH_INPUT),
                telephone: validationInputField("text", false, MAX_SHORT_LENGTH_INPUT, 0, true),
                cellphone: validationInputField("text", true, MAX_SHORT_LENGTH_INPUT),
                email: validationInputField("email", true, MAX_LONG_LENGTH_INPUT),
                state: validationInputField("text", true, MAX_LENGTH_INPUT),
                residence_id: validationInputField("number", false),
                national_certificate: validationInputField("text", true, MAX_LONG_LENGTH_INPUT),
                emition_date: validationInputField("date", true, MAX_LONG_LENGTH_INPUT),
                consultant_type: validationInputField("text", true, MAX_LONG_LENGTH_INPUT),
                category: validationInputField("text", true, MAX_SHORT_LENGTH_INPUT),
                visible_address: validationInputField("boolean", true),
                visible_telephone: validationInputField("boolean", true),
                visible_cellphone: validationInputField("boolean", true),
                visible_email: validationInputField("boolean", true),
                national_certificate_file: validationInputField("file", true),
                image: validationInputField("file", true),
                identification_document_file: validationInputField("file", true),
            };
            const formErrors = ref({});

            return {
                consultant,
                formatDateTime,
                formatDateInput,
                isApproved,
                isApprovedAll,
                encryptMe,
                formTypes,
                formErrors,
                onChangeTypeIdentificationDocument,
                states,
                consultor_types,
                categories,
                type_identification_document,
                putUrl: APIS.CONSULTANTES.PUT,
                onSendFormData,
            };
        }
    }
</script>