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
        <div class="w-4/5 max-lg:w-full max-lg:p-2 mb-5">
            <input type="text" v-model="searchQuery" @input="changeSearch" placeholder="Filtrar datos..." class="input-elevated">    
        </div>
    </div>
    <div class="flex justify-center">
        <div class="w-4/5 max-lg:w-full max-lg:p-2">
            <TableComp 
                :headers="headers" 
                :items="filtrados" 
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
            const searchQuery = ref('');
            const filtrados = ref([]);
            const loadAnuncios = async () => {
                try {
                    
                    const result = await getAnuncios();                    
                    anuncios.value = result;
                    filtrados.value = result;
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
            function changeSearch() {
                const wordsF = searchQuery.value.toLowerCase();
                filtrados.value = anuncios.value.filter( a => 
                    a.title.toLowerCase().includes(wordsF) 
                    || a.description.toLowerCase().includes(wordsF) 
                    || a.type_name.toLowerCase().includes(wordsF) 
                    || a.module_name.toLowerCase().includes(wordsF)
                );
            }
            return {
                goTo, 
                anuncios: anuncios,
                onConfirmDelete,
                onClickEdit,
                searchQuery: searchQuery,
                changeSearch,
                filtrados,
            };
        },
        data() {
            return {
                headers: [
                            {"id" : "id"},
                            {"module_name" : "Modulo"}, 
                            {"type_name" : "Tipo"}, 
                            {"title" : "Titulo"}, 
                            {"description" : "Descripcion"},  
                        ],
                exclude: [ "id" ],
                options: [ "update","delete"],//see
            }
        },
    }
</script>
<style>
.input-elevated{
font-size: 22px;
line-height: 1.5;
border: 1px solid #388e3c;
background: #FFFFFF;
background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='bg-green-700' width='30' height='30' viewBox='0 0 20 20'><path fill='%23838D99' d='M13.22 14.63a8 8 0 1 1 1.41-1.41l4.29 4.29a1 1 0 1 1-1.41 1.41l-4.29-4.29zm-.66-2.07a6 6 0 1 0-8.49-8.49 6 6 0 0 0 8.49 8.49z'></path></svg>");
background-repeat: no-repeat;
background-position: 10px 10px;
background-size: 30px 30px;
box-shadow: 0 2px 4px 0 rgba(0,0,0,0.08);
border-radius: 5px;
width: 50%;
padding: .5em 1em .5em 2.5em;
} 

.input-elevated::placeholder{
  color: #388e3c;
}

.input-elevated:focus {
  outline: none;
  box-shadow: 0 4px 10px 0 rgba(0,0,0,0.16);
}
</style>