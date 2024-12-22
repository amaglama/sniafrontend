<template>
    <div class="flex h-24 justify-end content-center p-2">
        <div class="flex h-12">
            <ButtonComp 
                label="AGREGAR" 
                :on-click="()=> goTo('/usuario-registro')" 
                class-name="bg-terciary hover:bg-secondary text-black font-bold rounded-md"
                ></ButtonComp>
        </div>
    </div>
    <div class="flex justify-center">
        <div class="w-4/5 max-lg:w-full max-lg:p-2">
            <TableComp 
                :headers="headers" 
                :items="users" 
                :options="options" 
                :edit-redirect="`/usuario-registro`"
                :exclude="exclude"
                label="usuario"
                v-on:confirm-delete="">
            </TableComp>
        </div>
    </div>
</template>


<script>
import TableComp from '@/components/table/TableComp.vue';
import ButtonComp from '@/components/essencials/ButtonComp.vue';
import { useMainStore } from '@/stores/main';
import { ref, computed, onMounted  } from 'vue';
import goTo from '@/stores/utils/goRoute';
import { getUsers } from '@/services/users';
    
    const mainStore = useMainStore()
    const items = computed(() => mainStore.clients)
    
    export default {
        name: "UsersView",
        components: {
            TableComp,
            ButtonComp,
        },
        setup(){
            const users = ref([]);
            const loadUsers = async () => {
                try {
                    
                    const result = await getUsers();
                    users.value = result;
                } catch (error) {
                    console.error("Error al obtener los usuarios:", error);
                }
            };
            onMounted(() => {
                loadUsers();
            });
            return {
                items,
                goTo, 
                users: users,
            };
        },
        data() {
            return {
                headers: [
                            {"id" : "id"},
                            {"first_name" : "Nombre"}, 
                            {"last_name" : "Apellido Paterno"}, 
                            {"second_last_name" : "Apellido Materno"}, 
                            {"tipo" : "Tipo"},  
                        ],
                exclude: [ "id" ],
                options: [ "update","delete"],//see
            }
        },
    }
</script>