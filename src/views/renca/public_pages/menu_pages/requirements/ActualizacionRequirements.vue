<template>
    <div class="flex flex-col gap-y-2 justify-center items-center">
        <div class="flex justify-center text-xl py-4 font-bold">REQUISITOS DE ACTUALIZACIÓN</div>
        <div class="w-3/4">
            <CardDropDown
                title="REQUISITOS PARA CONSULTORES UNIPERSONALES">
                <StepsTable :items="actualizacionUnipersonales"/>
            </CardDropDown>
        </div>
        <div class="w-3/4">
            <CardDropDown
                title="REQUISITOS PARA EMPRESAS CONSULTORAS, UNIDADES AMBIENTALES, FUNDACIONES Y ORGANIZACIONES NO GUBERNAMENTALES">
                <StepsTable :items="actualizacionEmpresas"/>
            </CardDropDown>
        </div>

    </div>
    <div class="flex justify-center py-4">
        <div class="w-3/4">
            <ComplementsRequirements></ComplementsRequirements>
        </div>
    </div>
    <div class="h-24"></div>
</template>

<script>
    import ComplementsRequirements from './ComplementsRequirements.vue';
    import CardDropDown from '@/components/Cards/CardDropDown.vue';
    import StepsTable from '@/views/renca/components/StepsTable.vue';
    import { ACTUALIZACION_UNIPERSONALES, ACTUALIZACION_EMPRESAS } from '@/stores/constants/constantsRENCApage';
    export default{
        components: {
            ComplementsRequirements,
            CardDropDown,
            StepsTable,
        },
        setup(){
            return {
                actualizacionUnipersonales: ACTUALIZACION_UNIPERSONALES,
                actualizacionEmpresas: ACTUALIZACION_EMPRESAS
            };
        }
    }
</script>