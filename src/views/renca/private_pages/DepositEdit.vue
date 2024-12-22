<template>
    <FormComp
        :form="localDeposit"
        :form-types="formTypes"
        :form-errors="formErrors"
        :class-name="'w-[90vw]'"
        :title="`${typeDepositForm === 'update'? 'EDITAR': 'CREAR'} DEPOSITO`"
        :label-submit="typeDepositForm === 'update'? 'EDITAR': 'CREAR'"
        :is-edit="true"
        :put-url="putUrl"
        :is-data-form="false"
        :on-send="formDeposit"
        :prev-success="prevSuccess"
        :wait-time="1000"
        @update:formErrors="handleFormErrors">
    <div class="flex w-full flex-wrap">
        <div class="flex flex-col w-1/2">
            <TitleForm>Cuenta bancaria</TitleForm>
            <div class="flex w-full">
                <InputForm
                    name="bank_account"
                    v-model="localDeposit.bank_account" 
                    type="number" 
                    placeholder="Deposito Bancario" 
                    :required="true"
                    :errors="formErrors['bank_account']"
                    :form-types="formTypes['bank_account']"
                    />
            </div>
        </div>
        <div class="flex flex-col w-1/2">
            <TitleForm>Monto</TitleForm>
            <div class="flex w-full">
                <InputForm
                    name="amount"
                    v-model="localDeposit.amount" 
                    type="number" 
                    placeholder="Deposito Bancario" 
                    :required="true"
                    :errors="formErrors['amount']"
                    :form-types="formTypes['amount']"
                    />
            </div>
        </div>
        <div class="flex flex-col w-1/2">
            <TitleForm>Fecha deposito</TitleForm>
            <div class="flex w-full">
                <InputForm
                    name="deposit_date"
                    v-model="localDeposit.deposit_date" 
                    type="date" 
                    placeholder="Fecha deposito" 
                    :required="true"
                    :errors="formErrors['deposit_date']"
                    :form-types="formTypes['deposit_date']"
                     />
            </div>
        </div>
        <div class="flex flex-col w-1/2">
            <TitleForm>Numero de referencia</TitleForm>
            <div class="flex w-full">
                <InputForm
                    name="reference_number"
                    v-model="localDeposit.reference_number" 
                    type="text" 
                    placeholder="Numero de referencia" 
                    :required="true"
                    :errors="formErrors['reference_number']"
                    :form-types="formTypes['reference_number']"
                     />
            </div>
        </div>
    </div>

    </FormComp>
</template>

<script>
    import { reactive, ref } from 'vue';
    import { formatDateTime, formatDateInput } from '@/stores/utils/dateFormats';
    import TitleForm from '@/components/Titles/TitleForm.vue';
    import TableComp from '@/components/table/TableComp.vue';
    import FormComp from '@/components/forms/FormComp.vue';
    import InputForm from '@/components/forms/input/InputForm.vue';
    import ImageUploaderForm from '@/components/forms/ImageUploader/ImageUploaderForm.vue';
    import { APIS } from '@/stores/constants/urlsBackEnd';
    import { validationInputField } from '@/components/forms/validationInput';
    import { MAX_LONG_LENGTH_INPUT, MAX_SHORT_LENGTH_INPUT } from '@/stores/constants/pages';
    import { formatDateToISO } from '@/stores/utils/dateFormats';
    const consultant = ref({});
    export default{
        components: {
            TitleForm,
            TableComp,
            FormComp,
            InputForm,
            ImageUploaderForm
        },
        props: {
            deposit: {
                type: Number,
                required: true
            },
            typeDepositForm: {
                type: String,
                default: "update"
            },
            closeDeposit:  {
                type: Function,
                default: () => {}
            },
        },
        setup(props){
            const localDeposit = ref({
                "id": props.deposit.id,
                "amount": props.deposit.amount,
                "bank_account": props.deposit.bank_account,
                "reference_number": props.deposit.reference_number,
                "deposit_date": formatDateInput(props.deposit.deposit_date),
            })
            
            const formTypes = {
                id: validationInputField("number", false),
                consultant: validationInputField("number", false),
                bank_account: validationInputField("number", true),
                amount: validationInputField("number", true, 10000, 0),
                deposit_date: validationInputField("date", true, MAX_LONG_LENGTH_INPUT),
                reference_number: validationInputField("text", true, MAX_LONG_LENGTH_INPUT, 0),
                state: validationInputField("text", true, MAX_SHORT_LENGTH_INPUT),
            };
            const formErrors = reactive({
                id: [],
                consultant:[],
                bank_account: [],
                amount: [],
                deposit_date: [],
                reference_number: [],
                state: [],
            });
            function formDeposit(deposit){
                return {
                    "consultant": deposit["consultant"],
                    "bank_account": deposit["bank_account"],
                    "amount": deposit["amount"],
                    "deposit_date": formatDateToISO(deposit["deposit_date"]),
                    "reference_number": deposit["reference_number"],
                    "state": deposit["state"]
                };
            }

            function prevSuccess(){
                props.closeDeposit();
            }
            const handleFormErrors = (errors) => {
                Object.keys(formErrors).forEach((key) => {
                    formErrors[key] = errors[key] || [];
                });
            };
            return {
                consultant,
                formatDateTime,
                formatDateInput,
                formTypes,
                formErrors,
                localDeposit,
                putUrl: APIS.DEPOSITOS.PUT,
                formDeposit,
                prevSuccess,
                handleFormErrors
            };
        }
    }
</script>