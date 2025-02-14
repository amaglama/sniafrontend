import { formatDateInput } from "@/stores/utils/dateFormats";
import { generateBusinessCode } from "@/stores/utils/generateCodeRenca";

import { formatDateToISO } from "@/stores/utils/dateFormats";
import 
{ 
    validationInputField, 
    validationListField, 
    validationDeposit, 
    validationInputsDeposit, 
    validationPersonal 
} from '@/components/forms/validationInput';
import { MAX_LENGTH_INPUT, MAX_LONG_LENGTH_INPUT, MAX_SHORT_LENGTH_INPUT } from '@/stores/constants/pages';

export const initialForm = {
    request_code : generateBusinessCode(),
    social_reason: '',
    address: '',
    telephone: '',
    cellphone: '',
    email: '',
    state: '',
    province: '',
    municipality: '',
    consultant_type: '',
    image: null,

    type_identification_document: '',
    identification_document: '',
    ci_complement: '',
    ci_expedited: '',
    user_name: '',
    last_name: '',
    second_last_name: '',

    residence_id: -1,
    national_certificate: '',
    emition_date: formatDateInput(Date()),
    visible_address: true,
    visible_telephone: true,
    visible_cellphone: true,
    visible_email: true,
    national_certificate_file: null,
    identification_document_file: null,
    deposits: [],
    personal: []
};

export const initialFormType = {
    request_code : validationInputField("text", true, MAX_SHORT_LENGTH_INPUT),
    social_reason: validationInputField("text", true, MAX_LONG_LENGTH_INPUT),
    address: validationInputField("text", true, MAX_LONG_LENGTH_INPUT),
    telephone: validationInputField("text", false, MAX_SHORT_LENGTH_INPUT, 0, true),
    cellphone: validationInputField("text", true, MAX_SHORT_LENGTH_INPUT),
    email: validationInputField("email", true, MAX_LONG_LENGTH_INPUT),
    state: validationInputField("text", true, MAX_LENGTH_INPUT),
    province: validationInputField("text", true, MAX_LENGTH_INPUT),
    municipality: validationInputField("text", true, MAX_LENGTH_INPUT),
    consultant_type: validationInputField("text", true, MAX_LONG_LENGTH_INPUT),
    image: validationInputField("file", true),

    type_identification_document: validationInputField("text", true, MAX_LONG_LENGTH_INPUT),
    identification_document: validationInputField("text", true, MAX_SHORT_LENGTH_INPUT),
    ci_complement: validationInputField("text", false, MAX_SHORT_LENGTH_INPUT),
    ci_expedited: validationInputField("text", false, MAX_LENGTH_INPUT),
    user_name: validationInputField("text", true, MAX_LONG_LENGTH_INPUT),
    last_name: validationInputField("text", true, MAX_LONG_LENGTH_INPUT),
    second_last_name: validationInputField("text", false, MAX_LONG_LENGTH_INPUT),

    residence_id: validationInputField("number", false),
    national_certificate: validationInputField("text", true, MAX_LONG_LENGTH_INPUT),
    emition_date: validationInputField("date", true, MAX_LONG_LENGTH_INPUT),
    
    category: validationInputField("text", true, MAX_SHORT_LENGTH_INPUT),
    visible_address: validationInputField("boolean", true),
    visible_telephone: validationInputField("boolean", true),
    visible_cellphone: validationInputField("boolean", true),
    visible_email: validationInputField("boolean", true),
    bank_deposit: validationInputField("array", true),
    //experience: validationInputField("array", true),
    //experience: validationInputField("file", true),
    national_certificate_file: validationInputField("file", true),
    
    identification_document_file: validationInputField("file", true),
    deposits: validationListField(validationDeposit, validationInputsDeposit, true),
    personal: validationListField(validationPersonal, validationInputsDeposit, true),

};

export function onSend(form){
    return {
        "type_identification_document": form.type_identification_document,
        "identification_document": form.identification_document,
        "ci_complement": form.ci_complement,
        "ci_expedited": form.ci_expedited,
        "user_name": form.user_name,
        "last_name": form.last_name,
        "second_last_name": form.second_last_name,
        "address": form.address,
        "telephone": form.telephone,
        "cellphone": form.cellphone,
        "email": form.email,
        "national_certificate": form.national_certificate,
        "state_certificate": form.state,
        "emition_date": formatDateToISO(form.emition_date),
        "consultor_type": "freelancer",
        "consultant_type": form.consultant_type,
        "category": form.category,
        "visible_address": form.visible_address,
        "visible_telephone": form.visible_telephone,
        "visible_cellphone": form.visible_cellphone,
        "visible_email": form.visible_email,
        "state": true
    }
}

export function onSendFormData(form){
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
        "province": form.province,
        "municipality": form.municipality,
        "emition_date": formatDateToISO(form.emition_date),
        "visible_address": form.visible_address,
        "visible_telephone": form.visible_telephone,
        "visible_cellphone": form.visible_cellphone,
        "visible_email": form.visible_email,

        "residence_id": form.residence_id//1234567890,
    }
}
export function onSendFiles(form){
    return {
        "photo": form.image,
        "state_certificate_doc": form.national_certificate_file,
        "identification_document_doc": form.identification_document_file,
    }
}