import { http } from '@/services/https';
import { APIS } from '@/stores/constants/urlsBackEnd';

export async function getUsers() {
  try {
    const response = await http.get(APIS.USUARIOS.GET, false, {});
    return response.results;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

export async function getUser(id) {
  if (id === undefined || id === null){
    return {};
  }
  try {
    const response = await http.get(`${APIS.USUARIOS.GET}${id.toString()}/`, false, {});
    return response;
  } catch (error) {
    console.error("Error fetching users:", error);
    return {};
  }
}


export async function getStates(order = "?ordering=name") {
  try {
    const response = await http.get(`${APIS.DEPARTAMENTOS.GET}${order}` , false, {});
    return response.results;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}
