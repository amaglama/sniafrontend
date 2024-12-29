import { http } from '@/services/https';
import { APIS } from '@/stores/constants/urlsBackEnd';
import { mdiScaleBalance, mdiGavel, mdiBookOpenPageVariant, mdiClipboardEdit, mdiNewspaperVariant, mdiCards } from "@mdi/js";
export async function getTipos() {
  try {
    const response = await http.get(APIS.TIPOS_ANUNCIO.LIST, false, {});
    return response;
  } catch (error) {
    console.error("Error fetching tipos de anuncio:", error);
    return [];
  }
}
export const comunicados = [
  { id: 2, name: 'Noticias o Comunicados', icon: mdiNewspaperVariant },
  { id: 4, name: 'Boletines', icon: mdiCards },
  { id: 3, name: 'Manuales', icon: mdiBookOpenPageVariant },
];

export const marcoLegal = [
  { id: 5, name: 'Ley', icon: mdiGavel },
  { id: 6, name: 'Decreto Supremo', icon: mdiScaleBalance },
  { id: 7, name: 'Reglamento', icon: mdiClipboardEdit },
  { id: 8, name: 'Resolución', icon: mdiBookOpenPageVariant },
];