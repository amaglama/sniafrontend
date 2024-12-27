import { APIS } from '@/stores/constants/urlsBackEnd';
export async function getModulos() {
  try {
    const response = await http.get(APIS.MODULOS_ANUNCIO.LIST, false, {});
    return response;
  } catch (error) {
    console.error("Error fetching modulos de anuncio:", error);
    return [];
  }
}