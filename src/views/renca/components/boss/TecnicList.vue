<template>
    <div class="flex flex-col w-[20vw] pt-4 gap-y-2">
        <TecnicRow 
            v-for="tecnic of tecnics" 
            :tecnic="tecnic"
            :onClickTecnic="onClickTecnic">
        </TecnicRow>
    </div>
</template>

<script>

    import TitleForm from '@/components/Titles/TitleForm.vue';
    import TecnicRow from './TecnicRow.vue';
    export default {
        components: {
            TitleForm,
            TecnicRow
        },
        props: {
            openAsign : {
                type: Boolean,
                default: false
            }
        },
        emits: ["update:openAsign"],
        setup(_, { emit }){
            const onClickTecnic = (id) =>{
                console.log(id);
                //logic
                emit("update:openAsign", false);

            }
            return {
                tecnics: [
                    {"id": 2, "name": "Tecnico 1", "assigneds": 8},
                    {"id": 4, "name": "Tecnico 2", "assigneds": 3}
                ],
                onClickTecnic
            };
        }
    }
</script>