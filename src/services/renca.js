import { http, httpData } from '@/services/https';
import { APIS } from '@/stores/constants/urlsBackEnd';
import { formatDateInput, formatDateToISO } from '@/stores/utils/dateFormats';

export async function getConsultants(url)
{
    try {
        const response = await http.get(url, false, {});
        return response.results;
      } catch (error) {
        console.error("Error fetching users:", error);
        return [];
      }
}

export async function getConsultant(id)
{
    try {
        const response = await http.get(`${APIS.CONSULTANTES.GET}${id.toString()}/`, false, {});
        console.log(`${APIS.CONSULTANTES.GET}${id.toString()}/`);
        console.log(response);
        
        return response;
      } catch (error) {
        console.error("Error fetching users:", error);
        return {};
      }
}

function toDataFormExperience(form){
  return {
    "consultant": form["consultant"],
    "job_title": form["job_title"],
    "organization_name": form["organization_name"],
    "start_date": formatDateInput(form["start_date"]),
    "end_date": formatDateInput(form["end_date"]),
    "description": form["description"],
  }
}

function toDataFormExperiences(experiences){
  const values = [];
  for (let experience of experiences){
    values.push(toDataFormExperience(experience));
  }
  return values;
}

export function toDataFormFiles(experiences, name){
  const files = [];
  for (let experience of experiences){
    files.push(experience[name]);
  }
  return files;
}

export function experienceFormData(values, files){
  const formData = new FormData();
  formData.append("experiences", JSON.stringify(values));
  for (let index in files){
    formData.append(`files[${index}]`, files[index]);
  }
  
  return formData;
}

export async function createExperiences(experiences, textError)
{
    try {
        const values = toDataFormExperiences(experiences);
        const files = toDataFormFiles(experiences, "experienceForm");
        const response = await httpData.post(APIS.EXPERIENCIAS.POST, values, files, false, {}, textError, experienceFormData);
        return response;
      } catch (error) {
        console.error("Error fetching users:", error);
        throw Error("Fallo en guardar experiencias");
      }
}

function toDataFormDeposit(deposit){
  return {
    "consultant": deposit["consultant"],
    "bank_account": deposit["bank_account"],
    "amount": deposit["amount"],
    "deposit_date": formatDateToISO(deposit["deposit_date"]),
    "reference_number": deposit["referenceNumber"],
    "state": deposit["state"]
  };
}

function toDataFormDeposits(deposits){
  const values = [];
  for (let deposit of deposits){
    values.push(toDataFormDeposit(deposit));
  }
  return { "deposits" : values };
}

export async function createDeposits(deposits, textError)
{
    try {
        const response = await http.post(APIS.DEPOSITOS.POST,toDataFormDeposits(deposits), false, {}, textError);
        return response;
      } catch (error) {
        console.error("Error fetching users:", error);
        throw Error("Fallo en guardar depositos");
      }
}


export async function validateConsultant(consultant) {
  try{
    const formValidate = {
      "consultant_id": consultant["id"],
      "approved": true,
      "verified_by": "Admin User"
  };
  
  const response = await http.post(APIS.VALIDAR.POST, formValidate, false, {});
  return response;
  } catch (error){
    console.error(error);
  }
  return {};
}

export async function denyConsultantValidation(consultant, reason) {
  try{
    const formValidate = {
      "consultant_id": consultant["id"],
      "approved": false,
      "reason": reason,
      "verified_by": "Admin User"
  };
  const response = await http.post(APIS.VALIDAR.POST, formValidate, false, {});
  return response;
  } catch (error){
    console.error(error);
  }
  return {};
}

export async function sendEmail(consultant, textError){
  try{
    const formEmail = {
      "email": consultant["email"],
      "name": consultant["user_name"],
      "category": consultant["category"],
    }
    const response = await http.post(APIS.CONSULTANTES.EMAIL, formEmail, false, {}, textError);
    return response;
  } catch (error){
    console.error(error);
    throw Error("Fallo en enviar email");
  }

}