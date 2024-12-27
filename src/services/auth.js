import axios from 'axios'
import { getUser, getUsers } from './users';
const VITE_AUTH_URL = import.meta.env.VITE_AUTH_URL;

const loadClientByUsername = async (username) => {
  if (username !== null) {
    const clients = await getUsers();
    return clients.find(c => c.username === username) || null;
  }
  return null;
};

export const login = async (params) => {
  
  try {
    const { data } = await axios.post(`${VITE_AUTH_URL}/login/`, params);
    
    //super-admin
    const permissions = [
      "", 
      "usuarios", 
      "usuario-registro", 
      "renca", 
      "registro-personal", 
      "tramites-pendientes", 
      "tramites-renca", 
      "renca-dashboard", 
      "renca-usuario",
      "cambiar-contrasena",
      "renovacion-usuario",
      "actualizar-usuario",
      "recuperar-contrasena",
      "delegar",
      "renca-jefe",
      "anuncios",
    ];
 
    
    /*
    //renca-user
    const permissions = [
      "renca-usuario",
      "cambiar-contrasena",
      "renovacion-usuario",
      "actualizar-usuario",
      "recuperar-contrasena"
    ];
    */
    
    /*
    //renca-tecnic
    const permissions = [
      "renca", 
      "registro-personal", 
      "tramites-pendientes", 
      "tramites-renca", 
      "renca-dashboard", 
    ];
    */
    
    //super-admin
    document.cookie = `token=${data.token}; path=/; secure; samesite=strict; max-age=14400`;
    document.cookie = `username=${params.username}; path=/; secure; samesite=strict; max-age=14400`;
    document.cookie = `rol=${"Administrador"}; path=/; secure; samesite=strict; max-age=14400`;
    document.cookie = `permissions=${permissions}; path=/; secure; samesite=strict; max-age=14400`;

    /*
    //renca-user
    document.cookie = `token=${data.token}; path=/; secure; samesite=strict; max-age=14400`;
    document.cookie = `username=${params.username}; path=/; secure; samesite=strict; max-age=14400`;
    document.cookie = `rol=${"Usuario RENCA"}; path=/; secure; samesite=strict; max-age=14400`;
    document.cookie = `permissions=${permissions}; path=/; secure; samesite=strict; max-age=14400`;
    */

    /*
    //renca-tecnic
    document.cookie = `token=${data.token}; path=/; secure; samesite=strict; max-age=14400`;
    document.cookie = `username=${params.username}; path=/; secure; samesite=strict; max-age=14400`;
    document.cookie = `rol=${"Tecnico"}; path=/; secure; samesite=strict; max-age=14400`;
    document.cookie = `permissions=${permissions}; path=/; secure; samesite=strict; max-age=14400`;
    */

    //first we need the cookie with token in other case we can't acess to the client
    const user = await loadClientByUsername(params.username);
    const id = user != null? String(user.id) : "";
    document.cookie = `id_user=${id}; path=/; secure; samesite=strict; max-age=14400`;
    
    return data;
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    //throw error;
  }
  return null;
};



export const logout = async () => {
  try {
    cleanStore()
  } catch (error) {
    console.error('Ocurrio un error al intentar cerrar sesión');
  }
}


export const cleanStore = () => {
  document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; secure; samesite=strict";
  document.cookie = "username=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; secure; samesite=strict";
  document.cookie = "rol=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; secure; samesite=strict";
  document.cookie = "permissions=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; secure; samesite=strict";
  document.cookie = "id_user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; secure; samesite=strict";
  router.push('/login')
}

export const initStore = () => {

}

