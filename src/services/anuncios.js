import { http } from '@/services/https';
import { APIS } from '@/stores/constants/urlsBackEnd';

export async function getAnuncios() {
  try {
    const response = await http.get(APIS.ANUNCIOS.GET, false, {});
    return response;
  } catch (error) {
    console.error("Error fetching anuncios:", error);
    return [];
  }
}

export async function getAnunciosByType( type) {
  try {
    const response = await http.get(APIS.ANUNCIOS.GET, false, {});
    return response.filter(e => e.type.toUpperCase() == type.toUpperCase());
  } catch (error) {
    console.error("Error fetching anuncios:", error);
    return [];
  }
}

export async function getAnuncio(id) {
  if (id === undefined || id === null){
    return {};
  }
  try {
    const response = await http.get(`${APIS.ANUNCIOS.LIST}${id.toString()}`, false, {});
    
    return response;
  } catch (error) {
    console.error("Error fetching anuncio:", error);
    return {};
  }
}
