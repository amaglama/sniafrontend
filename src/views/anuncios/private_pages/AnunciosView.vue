<template>
    <div class="flex h-24 justify-end content-center p-2">
        <div class="flex h-12">
            <ButtonComp 
                label="AGREGAR" 
                :on-click="()=> goTo('/anuncio-registro')" 
                class-name="bg-terciary hover:bg-secondary text-black font-bold rounded-md"
                ></ButtonComp>
        </div>
    </div>
    <div class="flex justify-center">
        <div class="w-4/5 max-lg:w-full max-lg:p-2">
            <TableComp 
                :headers="headers" 
                :items="anuncios" 
                :options="options" 
                :exclude="exclude"
                label="anuncio"
                :on-click-edit="onClickEdit"
                v-on:confirm-delete="onConfirmDelete">
            </TableComp>
        </div>
    </div>
</template>


<script>
import TableComp from '@/components/table/TableComp.vue';
import ButtonComp from '@/components/essencials/ButtonComp.vue';
import { useMainStore } from '@/stores/main';
import { ref, computed, onMounted, onUpdated  } from 'vue';
import goTo from '@/stores/utils/goRoute';
import { getAnuncios } from '@/services/anuncios';
import { http } from "@/services/https";
import { APIS } from "@/stores/constants/urlsBackEnd";

    const mainStore = useMainStore()
    const items = computed(() => mainStore.clients)
    
    export default {
        name: "UsersView",
        components: {
            TableComp,
            ButtonComp,
        },
        setup(){
            const anuncios = ref([]);
            const loadAnuncios = async () => {
                try {
                    
                    const result = await getAnuncios();                    
                    anuncios.value = result;
                } catch (error) {
                    console.error("Error al obtener los anuncios:", error);
                }
            };
            onMounted(() => {
                loadAnuncios();
            });
            
            function onClickEdit(item){
                goTo(`/anuncio/${item["id"]}`);                
            }
            
            function onConfirmDelete(item) {
                try {
                    let deleteUrl = `${APIS.ANUNCIOS.DELETE}${item}`;
                    const res = http.delete(deleteUrl, false,{},"No se ha logrado eliminar");    
                    res.then((data) => {
                        loadAnuncios();
                    });                    
                } catch (error) {
                    console.error(error);
                }
                
            }
            return {
                goTo, 
                anuncios: anuncios,
                onConfirmDelete,
                onClickEdit,
            };
        },
        data() {
            return {
                headers: [
                            {"id" : "id"},
                            {"module" : "Modulo"}, 
                            {"type" : "Tipo"}, 
                            {"title" : "Titulo"}, 
                            {"description" : "Descripcion"},  
                        ],
                exclude: [ "id" ],
                options: [ "update","delete"],//see
            }
        },
    }
</script>