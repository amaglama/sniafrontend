<template>
    <div class="flex h-24 justify-end content-center p-2">
        <div class="flex h-12">
            <ButtonComp label="AGREGAR" :on-click="() => goTo('/anuncio-registro')"
                class-name="bg-terciary hover:bg-secondary text-black font-bold rounded-md"></ButtonComp>
        </div>
    </div>
    <div class="flex justify-center">
        <div class="w-4/5 max-lg:w-full p-4 flex gap-5 max-md:flex-col">
            <!-- <div class="flex-1 relative">
                <svg :viewBox="'0 0 24 24'" class="w-8 h-8 text-green-700 absolute inset-2" fill="currentColor">
                    <path :d="mdiMagnify" />
                </svg><input type="text" v-model="searchQuery" @input="changeSearch" placeholder="Buscar datos..."
                    class="input-elevated">
            </div> -->
            <div class="flex-1 flex gap-5 max-sm:flex-col">
                <div class="flex-1">
                    <label for="moduleSelect">Modulo</label>
                    <select name="moduleSelect" v-model="selectedModulo" @change="changeFiltro" 
                    class="mt-2 px-3 py-2 focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 h-12 border bg-white dark:bg-slate-800" id="moduleSelect">
                        <option value="">Selecciona un Modulo</option>
                        <option :value="op.id" v-for="op in modulos">{{ op.name }}</option>
                    </select>
                </div>
                <div class="flex-1">
                    <label for="typeSelect">Tipo</label>
                    <select name="typeSelect" v-model="selectedTipo" @change="changeFiltro"
                        class="mt-2 px-3 py-2 focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 h-12 border bg-white dark:bg-slate-800" id="typeSelect">
                        <option value="" class="text-opacity-25 text-green-400">Selecciona un Tipo</option>
                        <option :value="op.id" v-for="op in tipos">{{ op.name }}</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
    <div class="flex justify-center">
        <div class="w-4/5 max-lg:w-full max-lg:p-2">
            <TableComp :headers="headers" :items="filtrados" :options="options" :exclude="exclude" label="anuncio"
                :on-click-edit="onClickEdit" v-on:confirm-delete="onConfirmDelete">
            </TableComp>
        </div>
    </div>
</template>


<script>
import TableComp from '@/components/table/TableComp.vue';
import ButtonComp from '@/components/essencials/ButtonComp.vue';
import { useMainStore } from '@/stores/main';
import { ref, computed, onMounted } from 'vue';
import goTo from '@/stores/utils/goRoute';
import { getAnuncios } from '@/services/anuncios';
import { http } from "@/services/https";
import { APIS } from "@/stores/constants/urlsBackEnd";
import { getModulos } from "@/services/modulesAnuncios";
import { getTipos } from "@/services/tiposAnuncios";
import { mdiMagnify } from "@mdi/js";

const mainStore = useMainStore()
const items = computed(() => mainStore.clients)

export default {
    name: "UsersView",
    components: {
        TableComp,
        ButtonComp,
    },
    setup() {
        const anuncios = ref([]);
        const searchQuery = ref('');
        const filtrados = ref([]);
        const tipos = ref([]);
        const modulos = ref([]);
        const selectedTipo = ref('');
        const selectedModulo = ref('');
        const loadAnuncios = async () => {
            try {
                const result = await getAnuncios();
                anuncios.value = result;
                filtrados.value = result;
            } catch (error) {
                console.error("Error al obtener los anuncios:", error);
            }
        };
        const loadTipos = async () => {
            try {
                const result = await getTipos();
                tipos.value = result;
            } catch (error) {
                console.error("Error al obtener los tipos:", error);
            }
        };
        const loadModulos = async () => {
            try {
                const result = await getModulos();
                modulos.value = result;
            } catch (error) {
                console.error("Error al obtener los modulos:", error);
            }
        };
        onMounted(() => {
            loadAnuncios();
            loadTipos();
            loadModulos();
        });

        function onClickEdit(item) {
            goTo(`/anuncio/${item["id"]}`);
        }

        function onConfirmDelete(item) {
            try {
                let deleteUrl = `${APIS.ANUNCIOS.DELETE}${item}`;
                const res = http.delete(deleteUrl, false, {}, "No se ha logrado eliminar");
                res.then((data) => {
                    loadAnuncios();
                });
            } catch (error) {
                console.error(error);
            }

        }
        function changeSearch() {
            const wordsF = searchQuery.value.toLowerCase();
            filtrados.value = anuncios.value.filter(a =>
                a.title.toLowerCase().includes(wordsF)
                || a.description.toLowerCase().includes(wordsF)
                || a.type_name.toLowerCase().includes(wordsF)
                || a.module_name.toLowerCase().includes(wordsF)
            );
        }
        function changeFiltro() {
            filtrados.value = anuncios.value.filter(a =>
                a.id_type.includes(selectedTipo.value)
                && a.id_module.includes(selectedModulo.value)
            );
        }
        return {
            goTo,
            anuncios: anuncios,
            onConfirmDelete,
            onClickEdit,
            searchQuery: searchQuery,
            changeSearch,
            changeFiltro,
            filtrados,
            tipos,
            selectedTipo,
            modulos,
            selectedModulo,
            mdiMagnify: mdiMagnify,
        };
    },
    data() {
        return {
            headers: [
                { "id": "id" },
                { "module_name": "Modulo" },
                { "type_name": "Tipo" },
                { "title": "Titulo" },
                { "description": "Descripcion" },
            ],
            exclude: ["id"],
            options: ["update", "delete"],//see
        }
    },
}
</script>
<style>
.input-elevated {
    width: 100%;
    font-size: 18px;
    line-height: 1.5;
    border: 1px solid #388e3c;
    background: #FFFFFF;
    background-repeat: no-repeat;
    background-position: 10px 10px;
    background-size: 20px 20px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
    border-radius: 5px;
    padding: .5em 1em .5em 2.5em;
}

.input-elevated::placeholder {
    color: #388e3c;
}

.input-elevated:focus {
    outline: none;
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.16);
}

.flex-2{
    flex: 2 2;
}
</style>