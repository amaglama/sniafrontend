import { http } from '@/services/https';
import { APIS } from '@/stores/constants/urlsBackEnd';
export async function getTipos() {
  try {
    const response = await http.get(APIS.TIPOS_ANUNCIO.LIST, false, {});
    return response;
  } catch (error) {
    console.error("Error fetching tipos de anuncio:", error);
    return [];
  }
}