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

export async function getAnunciosByType( type) {
  try {
    const response = await http.get(APIS.ANUNCIOS.GET, false, {});console.log(response);
    
    const resType = response.filter(e => e.type_name.toUpperCase() == type.toUpperCase());
    resType.forEach(anun => {
      anun["url"] = anun["file"]? import.meta.env.VITE_BACK_URL + anun["file"] : '';
      //anun["url"] = anun["file"]? import.meta.env.VITE_BACK_URL + anun["file"] : urlsFake[Math.floor(Math.random() * 3)];
      anun["fecha"] = formatFecha(anun["created_at"]);
    });
    return resType;
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