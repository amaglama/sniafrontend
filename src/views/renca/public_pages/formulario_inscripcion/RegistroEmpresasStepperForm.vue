<!--
:disabled-submit="currentStep !== 2">
-->
<template>
    <div class="h-full">
        <div>
                <FormComp
                    :title="`FORMULARIO ${ typeForm === 'post'? 'INSCRIPCIÓN' : (typeForm === 'update'? 'ACTUALIZACIÓN': 'RENOVACIÓN')} EMPRESA RENCA`"
                    :disabled-submit="false"
                    :post-url="postConst"
                    :form-errors="formErrors"
                    :on-send="onSend"
                    :on-send-data-form="onSendFormData"
                    :on-send-files="onSendFiles"
                    :is-data-form="true"
                    :form="form"
                    :form-types="formTypes"
                    :hidden-submit="currentStep !== 3"
                    :prev-success="prevSuccess"
                    :loading-alert="loadingData"
                    :success-alert="successData"
                    :error-data="errorData"
                    :wait-time="3000"
                    :icon-right="typeForm === 'update'? mdiUploadOutline : mdiAlphaRCircleOutline">
                    <div v-if="currentStep === 0">
                    <div class="flex text-2xl font-bold">
                        <p class="w-1/5"></p>
                        <p class="w-3/5 flex justify-center">CODIGO DE SOLICITUD {{ form.request_code  }}</p>
                        <p class="w-1/5 flex justify-center">
                            <svg
                                :viewBox="'0 0 24 24'"
                                class="w-8 h-8 slow-blink hover:bg-green-200 rounded-xl"
                                fill="currentColor"
                                :onclick="() =>{
                                    isInfoOpen = true;
                                }">
                                <path :d="mdiInformationSlabCircleOutline" />
                            </svg>
                        </p>
                    </div>
                    <FormField label="DATOS DE LA EMPRESA CONSULTORA, UNIDAD AMBIENTAL U ONG:">
                        <div class="flex">
                            <div class="flex flex-col w-2/3 gap-y-4">
                                <div class="flex gap-x-2">
                                    <InputForm
                                        name="social_reason"
                                        v-model="form.social_reason" 
                                        type="text" 
                                        placeholder="Razón social" 
                                        :required="true"
                                        label="Razón social"
                                        :errors="formErrors['social_reason']"
                                        :form-types="formTypes['social_reason']"
                                        class-name="w-1/2"
                                        />
                                    <InputForm
                                        name="address"
                                        v-model="form.address" 
                                        type="text" 
                                        placeholder="Domicilio Legal" 
                                        :required="true"
                                        label="Domicilio Legal"
                                        :errors="formErrors['address']"
                                        :form-types="formTypes['address']"
                                        class-name="w-1/2"
                                        />
                                </div>
                                <div class="flex justify-between">
                                    <InputForm
                                        name="telephone"
                                        v-model="form.telephone" 
                                        type="text" 
                                        placeholder="Teléfono fijo" 
                                        label="Teléfono fijo"
                                        :errors="formErrors['telephone']"
                                        :form-types="formTypes['telephone']"
                                        class-name="w-56"
                                        />
                                    <InputForm
                                        name="cellphone"
                                        v-model="form.cellphone" 
                                        type="text" 
                                        placeholder="Nro. de Celular" 
                                        :required="true"
                                        label="Nro. de Celular"
                                        :errors="formErrors['cellphone']"
                                        :form-types="formTypes['cellphone']"
                                        class-name="w-56"
                                        />
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
                                        class-name="w-56"
                                        />
                                </div>
                                <div class="flex justify-between">
                                    <SelectForm
                                        name="state"
                                        v-model="form.state" 
                                        :options="states.map(s => s['name'].toUpperCase())"
                                        placeholder="Departamento" 
                                        :required="true"
                                        label="Departamento de residencia"
                                        :errors="formErrors['state']"
                                        :form-types="formTypes['state']"
                                        class-name="w-56"
                                        :on-set="onChangeState"
                                        />
                                    <SelectForm
                                        name="province"
                                        v-model="form.province" 
                                        :options="provinces"
                                        placeholder="Provincia" 
                                        :required="true"
                                        label="Provincia"
                                        :errors="formErrors['province']"
                                        :form-types="formTypes['province']"
                                        class-name="w-56"
                                        :on-set="onChangeProvince"
                                        />
                                    <SelectForm
                                        name="municipality"
                                        v-model="form.municipality" 
                                        :options="municipalities"
                                        placeholder="Municipio" 
                                        :required="true"
                                        label="Municipio"
                                        :errors="formErrors['municipality']"
                                        :form-types="formTypes['municipality']"
                                        class-name="w-56"
                                        />
                                </div>
                                <div>
                                    <SelectForm
                                        name="consultant_type"
                                        v-model="form.consultant_type" 
                                        :options="business_types"
                                        :errors="formErrors['consultant_type']"
                                        :form-types="formTypes['consultant_type']"
                                        class-name="w-full"
                                        label="Tipo de empresa"
                                        :required="true"
                                        />
                                </div>

                            </div>
                            <div class="flex flex-col w-1/3 items-center justify-center">
                                <ImageUploaderLogoForm
                                    v-model="form.image"
                                    name="image"
                                    :required="true"
                                    :errors="formErrors['image']"
                                    :form-types="formTypes['image']"/>
                            </div>
                        </div>
                    </FormField>
                    <FormField label="DATOS DEL REPRESENTANTE LEGAL:">
                        <div class="gap-y-4">
                            <div class="flex flex-wrap">
                                    <div class="flex flex-col w-full gap-y-4">
                                        <div class="flex justify-between gap-y-4">
                                            <div class="w-1/3">
                                                <InputForm
                                                    name="user_name"
                                                    v-model="form.user_name" 
                                                    type="text" 
                                                    placeholder="Nombres" 
                                                    :required="true"
                                                    label="Nombres"
                                                    :errors="formErrors['user_name']"
                                                    :form-types="formTypes['user_name']"
                                                    class-name="w-64"
                                                    />
                                            </div>
                                            <div class="w-1/3">
                                                <InputForm
                                                    name="last_name"
                                                    v-model="form.last_name" 
                                                    type="text" 
                                                    placeholder="Apellido Paterno" 
                                                    :required="true"
                                                    label="Apellido Paterno"
                                                    :errors="formErrors['last_name']"
                                                    :form-types="formTypes['last_name']"
                                                    class-name="w-64"
                                                    />
                                            </div>
                                            <div class="w-1/3">
                                                <InputForm
                                                    name="second_last_name"
                                                    v-model="form.second_last_name" 
                                                    type="text" 
                                                    placeholder="Apellido Materno" 
                                                    label="Apellido Materno"
                                                    :errors="formErrors['second_last_name']"
                                                    :form-types="formTypes['second_last_name']"
                                                    class-name="w-64"
                                                    />
                                            </div>
                                           
                                        </div>
                                        <div class="flex w-full justify-between flex-wrap">
                                            <div class="w-1/3">
                                                <SelectForm
                                                    name="type_identification_document"
                                                    v-model="form.type_identification_document" 
                                                    :options="type_identification_document"
                                                    :required="true"
                                                    label="Documento de Identidad"
                                                    :errors="formErrors['type_identification_document']"
                                                    :form-types="formTypes['type_identification_document']"
                                                    :on-set="onChangeTypeIdentificationDocument"
                                                    class-name="w-64"
                                                    />
                                            </div>
                                            <div class="w-1/3">
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
                                                    class-name="w-64"
                                                    />
                                            </div>
                                            <div class="flex w-1/3 justify-between">
                                                <InputForm
                                                    name="ci_complement"
                                                    v-model="form.ci_complement"
                                                    type="text" 
                                                    placeholder=""  
                                                    label="Complemento"
                                                    :errors="formErrors['ci_complement']"
                                                    :form-types="formTypes['ci_complement']"
                                                    :disabled="form.type_identification_document != type_identification_document[0]"
                                                    class-name="w-32"
                                                    />
                                                <SelectForm
                                                    name="ci_expedited"
                                                    v-model="form.ci_expedited" 
                                                    :options="states.map(s => s['code'])"
                                                    label="Expedido"
                                                    :errors="formErrors['ci_expedited']"
                                                    :form-types="formTypes['ci_complement']"
                                                    :disabled="form.type_identification_document != type_identification_document[0]"
                                                    class-name="w-32"
                                                    />
                                            </div>
                                            
                                        </div>
                                    </div>
                         
                            </div>
                       
                          
                        </div>
                    </FormField>
                </div>
                <div v-else-if="currentStep === 1" class="gap-y-8">
                   
                    <FormField label="DATOS DEPOSITOS">
                        <FormField label="Ingrese los datos de deposito" :class="`border-2`">
                            <ListDepositForm 
                                :depositsForm="form.deposits" 
                                name="deposits"
                                :errors="formErrors['deposits']"
                                :form-types="formTypes['deposits']"
                                :category="form.category"
                                :type-form="typeForm"/>
                            
                        </FormField>
                    </FormField>
                    <FormField label="DATOS EQUIPO MULTIDISCIPLINARIO">
                        <ListPersonalForm
                            :consultantsForm="form.personal"
                        ></ListPersonalForm>
                    </FormField>
                </div>
                <div v-else-if="currentStep === 2">
                    <div class="flex flex-col">
                        <div class="flex w-full justify-between bg-gray-200">
                            <p class="m-2">Despues de aprobarse la licencia RENCA, los siguientes campos Domicilio legal, Email, Celular y Teléfono seran visibles en la lista de profesionales del sistema RENCA en <strong>publico</strong> que le pueden servir para futuras contrataciones, a menos que seleccione los campos que no quieres que se muestren, desmarquelos si desean que tales datos sean privados.</p>
                            <ButtonComp :icon="mdiInformation" class-name="hover:text-info"/>
                        </div>
                        <CheckForm
                            name="visible_address"
                            label="Desea que el domicilio Legal sea visible"
                            v-model="form.visible_address"
                            type="checkbox"
                            class-name=""
                            />
                        <CheckForm
                            name="visible_email"
                            label="Desea que el email sea visible"
                            v-model="form.visible_email"
                            type="checkbox"
                            class-name=""
                            />
                        <CheckForm
                            name="visible_cellphone"
                            label="Desea que el celular sea visible"
                            v-model="form.visible_cellphone"
                            type="checkbox"
                            class-name=""
                            />
                        <CheckForm
                            name="visible_telephone"
                            label="Desea que el teléfono sea visible"
                            v-model="form.visible_telephone"
                            type="checkbox"
                            class-name=""
                            />
                    </div>
                </div>
                <div v-else-if="currentStep === 3">
                    <ConsultantPreview :consultant-preview ="form"/>
                </div>
                </FormComp>
        </div>
        <CardBoxModal 
            v-model="isBadCategory" 
            title="Advertencia" 
            button="info" 
            button-label="DE ACUERDO" 
            has-cancel 
            :on-confirm="changeCategory"
            :on-cancel="confirmCancel"
            class-name="h-fit">
            <p>La categoria solicitida es {{ form["category"] }} pero usted posee experiencia para la categoria {{ getMinimunCategory(yearsOfExperience) }}, esta de Acuerdo en cambiar?</p>
        </CardBoxModal>
        <CardBoxModal 
            v-model="insuficcientAmount" 
            title="Costo insuficiente" 
            button="info" 
            button-label="DE ACUERDO"
            class-name="h-fit">
            <p>Los depositos no acumulan la inscripcion, por favor agregue el costo que debe pagarse.</p>
        </CardBoxModal>
        <CardBoxModal 
            v-model="overprice" 
            title="Deposito sobrepasado" 
            button="info" 
            button-label="DE ACUERDO"
            class-name="h-fit">
            <p>La suma de depositos sobrepasan la inscripción {{ form["category"] }}.</p>
        </CardBoxModal>
        <CardBoxModal 
            v-model="isBadData" 
            title="Advertencia campo faltante" 
            button="info" 
            button-label="DE ACUERDO"
            class-name="h-fit">
            <p>Un campo de {{ badData }} No se lleno adecuadamente, por favor reviselo.</p>
        </CardBoxModal>
        <CardBoxModal 
            v-model="isInfoOpen" 
            title="INFO" 
            button="primary" 
            button-label="DE ACUERDO"
            class-name="h-fit">
            <InscripcionRequirements v-if="typeForm === REGISTRATION"></InscripcionRequirements>
            <RenovacionRequirements v-if="typeForm === RENOVATION"></RenovacionRequirements>
            <ActualizacionRequirements v-if="typeForm === UPDATE"></ActualizacionRequirements>
        </CardBoxModal>
    </div>
</template>
<script>
    import FormField from '@/components/forms/formfield/FormField.vue';
    import FormComp from '@/components/forms/FormComp.vue';
    import { ref, computed, onMounted, watch } from 'vue';
    import { reactive } from 'vue';
    import InputForm from '@/components/forms/input/InputForm.vue';
    import SelectForm from '@/components/forms/select/SelectForm.vue';
    import FileForm from '@/components/forms/file/FileForm.vue';
    import validationInput from '@/components/forms/validationInput';
    import { 
        mdiInformation, 
        mdiAlphaRCircleOutline, 
        mdiUploadOutline,
        mdiInformationSlabCircleOutline
    } from '@mdi/js'
    import ButtonComp from '@/components/essencials/ButtonComp.vue';
    import CheckForm from '@/components/forms/Switch/CheckForm.vue';
    import ListDepositForm from '@/views/renca/components/ListDepositForm.vue';
    import ListPersonalForm from '../../components/ListPersonalForm.vue';
    import { APIS } from '@/stores/constants/urlsBackEnd';
    import { formatDateInput } from '@/stores/utils/dateFormats';
    import ImageUploaderLogoForm from '@/components/forms/ImageUploader/ImageUploaderLogoForm.vue';
    import { 
        type_identification_document, 
        business_types, 
        categories, 
        filesAllowed, 
        getInputsBusinessNames, 
        getMinimunCategory, 
        amountsCategories, 
        RENOVATION, 
        REGISTRATION, 
        UPDATE } 
    from '@/stores/constants/constantsRENCA';
    import { getStates } from '@/services/users';
    import CardBoxModal from '@/components/ComponentsOne/CardBoxModal.vue';
    import { createDeposits, sendEmail } from '@/services/renca';
    import { decryptMe } from '@/stores/utils/encryption';
    import ConsultantPreview from '../../private_pages/ConsultantPreview.vue';
    import { debounce, waitAndExecute } from '@/stores/utils/waitAndExecute';
    import { MAX_FILE_SIZE } from '@/stores/constants/constantsRENCA';
    
    import 
    { 
        initialForm, 
        initialFormType,
        onSend, 
        onSendFiles, 
        onSendFormData 
    } 
    from './empresasInscripcion';
    import InscripcionRequirements from '../menu_pages/requirements/InscripcionRequirements.vue';
    import RenovacionRequirements from '../menu_pages/requirements/RenovacionRequirements.vue';
    import ActualizacionRequirements from '../menu_pages/requirements/ActualizacionRequirements.vue';
    export default {
        name: 'UserForm',
        components: {
            FormComp,
            FormField,
            SelectForm,
            InputForm,
            ButtonComp,
            CheckForm,
            ListPersonalForm,
            ListDepositForm,
            ImageUploaderLogoForm,
            FileForm,
            CardBoxModal,
            ConsultantPreview,
            InscripcionRequirements,
            RenovacionRequirements,
            ActualizacionRequirements,
        },
        props: {
            currentStep: {
                type: Number,
                required: true,
            },
            blockNextStep: {
                type: Function,
                default: () => false
            },
            blockPrevStep: {
                type: Function,
                default: () => false
            },
            typeForm: {
                type: String,
                default: "post" 
            },
        },
        emits: ['update:formErrors', 'validate-step'],
        setup(props, {emit}) {
            
            const states = ref([]);
            const provinces = ref(["CAPITAL", "OTRO", "MURILLO"]);
            const municipalities = ref(["CAPITAL", "OTRO", "NUESTRA SEÑORA DE LA PAZ"]);
            const consultants = ref([]);
            const isInfoOpen = ref(false);
            const isBadCategory = ref(false);
            const confirmedCategory = ref(false);
            const insuficcientAmount = ref(false);
            const overprice = ref(false);

            const isBadData = ref(false);
            const badData = ref("");
            const loadingData = ref("");
            const successData = ref("");
            const errorData = ref("");

            const yearsOfExperience = ref(0);
            const loadStates = async () => {
                const newStates = await getStates();
                states.value = newStates;
            };

            onMounted(() => {
                loadStates();
            });

            //if (props.typeForm === "post")
            const form = reactive(initialForm);
            const formTypes = reactive(initialFormType);
            const formErrors = ref({});
            const currentStep = computed(() => currentStep.value);
            const prevNextStep = computed(() => prevNextStep);

            const evaluateFields = (form) => {
                return {};
            };

            watch(form, (newForm) => {
                
                formErrors.value = evaluateFields(newForm);
                //debounce(evaluateFields, 50);
            },
                {deep: true}
            );

            const validateStep = async (step) => {
                const errors = [];
                const names = getInputsBusinessNames()[step];
                for (let name of names){
                    if (form[name] === undefined) continue;
                    const inputErrors = validationInput(form[name], formTypes[name]);
                    if (inputErrors.length === 0) continue;
                    errors.push({ [name]: inputErrors});
                }
                if (step === 0){
                    formErrors.value = evaluateFields(form);
                    if (Object.keys(formErrors.value).length !== 0) {
                        return false;
                    }
                }
                if (step === 1){
                    if (!confirmedCategory.value && form["category"] !== getMinimunCategory(yearsOfExperience.value)){
                        isBadCategory.value = true;
                    }
                    if (form["deposits"].length === 0 || form["deposits"].reduce((m1, m2) => m1 + m2["amount"], 0) < amountsCategories.inscripcion[form["category"]]){
                        insuficcientAmount.value = true;
                        errors.push({"insuficiente": ["No coloco los depositos requeridos."]})
                    }
                    else if (form["deposits"].reduce((m1, m2) => m1 + m2["amount"], 0) > amountsCategories.inscripcion[form["category"]]){
                        overprice.value = true;
                    }
                }
                const errorsValidate =  errors.reduce((acc, current) => {
                    return { ...acc, ...current };
                }, {});

                if (step === 1){
                    if (errorsValidate["experiences"] && errorsValidate["experiences"].length > 0){
                        badData.value = "datos de experiencia";
                        isBadData.value = true;
                    }
                    if (errorsValidate["deposits"] && errorsValidate["deposits"].length > 0){
                        badData.value = "datos de depositos";
                        isBadData.value = true;
                    }
                }
                formErrors.value = errorsValidate;
                return Object.values(errorsValidate).length === 0 || step === 0 || step === 1;
            };

            const changeCategory = () =>{
                form["category"] = getMinimunCategory(yearsOfExperience.value);
            }

            const confirmCancel = () =>{
                const categoryRecommended = getMinimunCategory(yearsOfExperience.value);
                if ((categoryRecommended == "A" || (categoryRecommended == "B" && yearsOfExperience < 2) || (categoryRecommended == "C" && yearsOfExperience < 5))){
                    return;
                }
                confirmedCategory.value = true;
            }

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

            function onChangeProvince(name){

            }

            async function prevSuccess(){
                try {
                    const localValue = localStorage.getItem("temp_id");
                    if (localValue == null){
                        console.error("No se pudo recuperar el id");
                        return;
                    } 
                    const id = Number(decryptMe(localValue));

                    for (let experience of form["experiences"]){
                        experience["consultant"] = id;
                    }

                    for (let deposit of form["deposits"]){
                        deposit["consultant"] = id;
                    }
                  

                    loadingData.value = `${loadingData.value}${loadingData.value === "" ? "": ", "}Cargando depositos`;
                    await createDeposits(form["deposits"], errorData);
                    localStorage.removeItem("temp_id");
                    
                    loadingData.value = `${loadingData.value}, Enviando correo`;
                    await sendEmail(form, errorData);
                    loadingData.value = "";

                    successData.value = "Deposito y experiencias subidos exitosamente y correo enviado.";
                    waitAndExecute(() => {
                        successData.value = "";
                    }, 2000);
                }
                catch(error){
                    loadingData.value =  "";
                    //errorData.value = "Sucedio un error";
                    console.error(error);
                }
            }
        
            return {
                    form, 
                    formTypes, 
                    formErrors, 
                    states,
                    business_types,
                    categories,
                    type_identification_document, 
                    mdiInformation,
                    mdiAlphaRCircleOutline,
                    mdiUploadOutline,
                    mdiInformationSlabCircleOutline,
                    postConst: APIS.CONSULTANTES.POST,
                    validateStep,
                    onSend,
                    onSendFormData,
                    onSendFiles,
                    filesAllowed,
                    isBadCategory,
                    yearsOfExperience,
                    changeCategory,
                    confirmCancel,
                    getMinimunCategory,
                    insuficcientAmount,
                    isBadData,
                    badData,
                    overprice,
                    isInfoOpen,
                    prevSuccess,
                    loadingData,
                    successData,
                    errorData,
                    formatDateInput,
                    onChangeState,
                    onChangeTypeIdentificationDocument,
                    MAX_FILE_SIZE,
                    typeForm: props.typeForm,
                    UPDATE,
                    RENOVATION,
                    REGISTRATION,
                    onChangeProvince,
                    provinces,
                    municipalities,
                };
        }
    }
</script>
 
<style>
.slow-blink {
  animation: blink 3s infinite;
}

@keyframes blink {
  0%, 100% {
    color: #10b981;
  }
  50% {
    color: #ffffff;
  }
}

</style>