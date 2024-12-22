<template>
    <div 
        class="flex flex-col border-2 rounded-lg hover:bg-slate-200"
        v-on:click="() => onClickTecnic(tecnic.id)">
        <div class="flex p-2">
            <div class="flex w-1/6 justify-center items-center">
                <svg
                    :viewBox="'0 0 24 24'"
                    class="w-8 h-8 text-red-400"
                    fill="currentColor">
                    <path :d="mdiAccountBadgeOutline" />
                </svg>
            </div>
            <div class="flex flex-col w-5/6">
                <TitleForm>NOMBRE:</TitleForm>
                <p>{{ tecnic.name }}</p>
                <TitleForm>TRABAJOS ASIGNADOS:</TitleForm>
                <p>{{ tecnic.assigneds }}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import { mdiAccountBadgeOutline } from '@mdi/js';
    import TitleForm from '@/components/Titles/TitleForm.vue';
    export default {
        components: {
            TitleForm
        },
        props: {
            tecnic: {
                type: Object,
                required: true
            },
            onClickTecnic: {
                type: Function,
                default: (_) => {}
            }
        },
        
        setup(props){
            return {
                tecnic: props.tecnic,
                mdiAccountBadgeOutline,
                onClickTecnic: props.onClickTecnic 
            };
        }
    }
</script>