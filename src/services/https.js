import axios from "axios";
import { logout } from "./auth";

const urlBase = import.meta.env.VITE_API_URL;
const codeErrorsLogout = [401, 403, 500];
import { getCookie } from '@/stores/utils/cookies';
import { encryptMe } from "@/stores/utils/encryption";

function headerPrincipal(headers){
  const token = getCookie('token');
  if (token != null){
    headers = {
      ...headers,
      "Authorization": `Token ${token}`
    }
  }
  return headers;
  
}

export const _http = (method, url, data, loading = true, headers, textError, responseType = undefined) => {
  console.log("url:", url);
  
    return new Promise((resolve, reject) => {
      if (loading) {
        console.log("cargando");
      }
      url = urlBase + url;
      const config = {
        method,
        url,
        data,
        headers: {},
      };

      if (responseType) {
        config["responseType"] = responseType;
      }

      if (headers?.Authorization) {
        config.headers.Authorization = headers?.Authorization;
      } else {
        /*
        if (Storage.exist("token")) {
          config.headers.Authorization = `Token ${Storage.get("token")}`;
        }
        */
      }
      axios(config)
        .then((response) => {
          console.log(response);
          resolve(response.data);
        })
        .catch(async (error) => {
          console.log(error)
          if (error.response.status === 400) {
            textError.value = "Error en los datos.";
          } else {
            textError.value = "Sucedió un error.";
          }
          if (error.response) {
            if (error.response.status === 403) {
              return router.push("/404");
            }
            console.log("Ocurrio un error desconocido");
            if (codeErrorsLogout.includes(error.response.status)) {
              if (error.response.status == 401) {
                logout();
                console.error('La sesión caducó, ingrese otra vez al sistema');
              }

            }
          } else {
            console.log("*************DATOS NO ENCONTRADOS EN LA RED*******************");
            console.log(error);
          }

          reject(error);
        })
        .finally(() => {
          if (loading) {}
        });
    });
};

export const http = {
    get(url, loading = true, headers,textError = "", responseType = undefined) {
      return _http("get", url, null, loading, headerPrincipal(headers), textError, responseType);
    },

    post(url, data, loading = true, headers, textError = "") {console.log(data);
    
      return _http("post", url, data, loading, headerPrincipal(headers), textError);
    },

    put(url, data, loading = true, headers, textError = "") {
      return _http("put", url, data, loading, headerPrincipal(headers), textError);
    },

    patch(url, data, loading = true, headers, textError = "") {
      return _http("patch", url, data, loading, headerPrincipal(headers), textError);
    },

    delete(url, loading = true, headers, textError) {
      return _http("delete", url, null ,loading, headerPrincipal(headers), textError);
    },
    convertQuery(url, query) {
      let string = [];
      for (const i in query) {
        string.push(i + "=" + query[i]);
      }
      string = string.join("&");
      if (url.includes("?")) {
        query = query ? "&" + string : "";
      } else {
        query = query ? "?" + string : "";
      }
      return url + query;
    },
};


export const _httpData = async (method, url, formData, headers, textError, isIdRequired = false) => {
  //console.log("Datos enviados:", formData);
  url = urlBase + url;
  try {console.log(formData);
    const response = await fetch(url, {
      method: method,
      headers: headers,
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error al enviar los datos: " + JSON.stringify(errorData));
      throw new Error("Error en la solicitud: " + response.status);
    }
    
    const data = await response.json();
    console.log("Respuesta exitosa: ", data);
    if (isIdRequired) localStorage.setItem("temp_id", encryptMe(data["id"].toString() ));
    return data; 
  } catch (error) {
    console.error("Error capturado:", error);

    if (error && error.response && error.response.status === 400) {
      textError.value = "Error en los datos.";
    } else {
      textError.value = "Sucedió un error.";
    }
    //throw error; 
  }
};


export function defaultDataToFormData(form, files){
  console.log("asdasdasdasd")
  const formData = new FormData();
  try{
    for (const key in form) {
      formData.append(key, form[key]);
    }

    for (const key in files) {
      if (files[key]) {
        formData.append(key, files[key]);
      }
    }
  }
  catch (error){
    console.log(error);
  }

  return formData;
}

export const httpData = {
  get(url, loading = true, headers,textError = "", responseType = undefined) {
    return _httpData("get", url, null, loading, headerPrincipal(headers), textError, responseType);
  },

  post(url, data, files, loading = true, headers, textError = "", formDatas= defaultDataToFormData, isIdRequired = false) {
    return _httpData("post", url, formDatas(data, files), headerPrincipal(headers), textError, isIdRequired);
  },

  put(url, data, files, loading = true, headers, textError = "", formDatas= defaultDataToFormData, isIdRequired = false) {
    return _httpData("put", url, formDatas(data, files),  headerPrincipal(headers), textError, isIdRequired);
  },

  patch(url, data, files, loading = true, headers, textError = "") {
    return _httpData("patch", url, defaultDataToFormData(data, files), headerPrincipal(headers), textError);
  },

  delete(url, loading = true, headers, textError) {
    return _httpData("delete", url, null , headerPrincipal(headers), textError);
  },
}