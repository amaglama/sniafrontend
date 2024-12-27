import { http } from '@/services/https';
import { APIS } from '@/stores/constants/urlsBackEnd';
import { formatFecha } from "@/stores/utils/dateFormats";

const urlsFake = [
  'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf',
  'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf',
  'https://books.scielo.org/id/k3w36/pdf/daza-9789978105689-16.pdf',
  'http://www.scielo.org.pe/pdf/kaw/n9/2709-3689-kaw-09-34.pdf',
];

export async function getAnuncios() {
  try {
    const response = await http.get(APIS.ANUNCIOS.GET, false, {});
    return response;
  } catch (error) {
    console.error("Error fetching anuncios:", error);
    return [];
  }
}

export async function getAnunciosByTypeAndModule( id_type, id_module ) {
  try {
    const response = await http.get(`${APIS.ANUNCIOS.FILTER}${id_module}/${id_type}`, false, {});
    response.forEach(anun => {
      anun["url"] = anun["file"]? import.meta.env.VITE_BACK_URL + anun["file"] : '';
      anun["fecha"] = formatFecha(anun["created_at"]);
    });
    return response;
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

export const comunicados = [
  { id: 2, name: 'Noticias o Comunicados', icon: 'svg' },
  { id: 4, name: 'Boletines', icon: 'svg' },
  { id: 3, name: 'Manuales', icon: 'svg' },
];

export const marcoLegal = [
  { id: 5, name: 'Ley', icon: 'svg' },
  { id: 6, name: 'Decreto Supremo', icon: 'svg' },
  { id: 7, name: 'Reglamento', icon: 'svg' },
  { id: 8, name: 'Resolución', icon: 'svg' },
];