import { MAX_DESCRIPTION_INPUT, MAX_LENGTH_INPUT, MAX_LONG_LENGTH_INPUT, MAX_SHORT_LENGTH_INPUT } from "@/stores/constants/pages";

const MIN_LENGTH_PASSWORD = 6;
export const REGEX_EMAIL = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
export function validatePassword(input){
    return input.length < MIN_LENGTH_PASSWORD;
}

function containsOnlyDigits(str) {
    return /^\d+$/.test(str);
}

function validateField(input, validator){
    console.log(validator);
    
    console.log(validator);
    
    const errors = [];
    if (validator === undefined) return errors;
    if (validator.required && (input === undefined || input === null || input === "")) {
        errors.push("El campo es requerido");
        return errors;
    }
    if (validator.type === "text" && input !== "" && validator.isNumber && !containsOnlyDigits(input)) errors.push("El campo solo debe aceptar números"); 
    if (validator.type === "text" && validator.maxLength > -1 && input.length > validator.maxLength) errors.push(`Debe tener como mucho ${validator.maxLength} caracteres`);
    if (validator.type === "text" && validator.minLenght > -1 && input.length < validator.minLength) errors.push(`Campo tener como minimo ${validator.minLenght} caracteres`);
    if (validator.type === "number" && validator.maxLength !== -1 && input > validator.maxLength) errors.push(`Monto maximo superado`);
    if (validator.type === "number" && validator.minLenght !== -1 && input <= validator.minLength) errors.push(`El monto minimo es mas de ${validator.minLength}`);
    if (validator.type === "email" && !REGEX_EMAIL.test(input)) errors.push("Email formato no válido");
    if (validator.type === "password" && validatePassword(input)) errors.push(`La contraseña debe tener al menos ${MIN_LENGTH_PASSWORD} caracteres`)
    return errors;
}

function getErrorsRow(row, validator) {
    const errors = [];
    for (let name in row) {
        if (row.hasOwnProperty(name) && validator[name]) {
            const error = validateField(row[name], validator[name]);
            if (error.length !== 0) errors.push(error);
        }
    }
    return errors;
}

function validateList(input, validator){
    const errors = [];
    for (let item of input){
        const errorsRow = getErrorsRow(item, validator.validationInputs);
        if (errorsRow.length !== 0) errors.push(errorsRow);
    }
    
    return errors;
}

export default function validationInput(input, validator){
    if (!validator) return [];
    switch(validator.typeValidator){
        case "list":
            return validateList(input, validator);
        default:
            return validateField(input, validator);
    }
}

export function validationInputField(type, required = false, maxLength = -1, minLength = -1, isNumber){
    return {
        type: type,
        maxLength: maxLength,
        minLength: minLength,
        required: required,
        isNumber: isNumber,
        typeValidator: "input"
    }
}

/**
 * Crea un objeto de validación para un campo de lista.
 * @param {function} validationFunction - La función de validación personalizada.
 * @param {Object} validationInputs - La validación de los inputs de la lista.
 * @param {boolean} [required=false] - Indica si el campo es obligatorio.
 * @param {number} [maxLength=-1] - La longitud máxima permitida para la lista, -1 por defecto para no dar un maximo.
 * @param {number} [minLength=0] - La longitud mínima permitida para el campo,  0 por defecto para no dar un minimo.
 * @returns {Object} El objeto de validación para lista.
 */
export function validationListField(validationFunction, validationInputs ,required = false, maxLength = -1, minLength = 0) {
    return {
        type: "list",
        maxLength: maxLength,
        minLength: minLength,
        required: required,
        isNumber: false,
        validationFunction: validationFunction,
        typeValidator: "list",
        validationInputs: validationInputs

    };
}


export function validationExperience(form, formValidation){
    const errors = [];
    return errors;
}

export function validationDeposit(form, formValidation){
    const errors = [];
    return errors;
}

export function validationPersonal(form, formValidation){
    const errors = [];
    return errors;
}

export const validationInputsExperience = {
    consultant: validationInputField("number", false),
    job_title: validationInputField("text", true, MAX_LONG_LENGTH_INPUT),
    organization_name: validationInputField("text", true, MAX_LONG_LENGTH_INPUT),
    start_date: validationInputField("date", true, MAX_LONG_LENGTH_INPUT),
    end_date: validationInputField("date", true, MAX_LONG_LENGTH_INPUT),
    description: validationInputField("text", true, MAX_DESCRIPTION_INPUT),
    experienceForm: validationInputField("file", true),
}


export const validationInputsDeposit = {
    consultant: validationInputField("number", false),
    bank_account: validationInputField("number", true),
    amount: validationInputField("number", true, 4000, 0),
    depositDate: validationInputField("date", true, MAX_LONG_LENGTH_INPUT),
    referenceNumber: validationInputField("text", true, MAX_LONG_LENGTH_INPUT, 0),
    state: validationInputField("text", true, MAX_SHORT_LENGTH_INPUT)
}