<template>
    <div class="flex flex-col gap-y-2 justify-center items-center">
        <div class="flex justify-center text-xl py-4 font-bold">REQUISITOS DE ACTUALIZACIÓN</div>
        <div class="w-3/4">
            <CardDropDown
                title="REQUISITOS PARA CONSULTORES UNIPERSONALES NACIONALES">
                <StepsTable :items="inscripcionUnipersonalNacional"/>
            </CardDropDown>
        </div>
        <div class="w-3/4">
            <CardDropDown
                title="REQUISITOS PARA CONSULTORES UNIPERSONALES EXTRANJEROS">
                <StepsTable :items="inscripcionUnipersonalExtranjeros"/>
            </CardDropDown>
        </div>
        <div class="w-3/4">
            <CardDropDown
                title="REQUISITOS PARA EMPRESAS CONSULTORAS NACIONALES">
                <StepsTable :items="inscripcionEmpresasConsultorasNacionales"/>
            </CardDropDown>
        </div>
        <div class="w-3/4">
            <CardDropDown
                title="REQUISITOS PARA EMPRESAS CONSULTORAS EXTRANJERAS">
                <StepsTable :items="inscripcionEmpresasConsultorasNacionales"/>
            </CardDropDown>
        </div>
        <div class="w-3/4">
            <CardDropDown
                title="REQUISITOS PARA ASOCIACIONES ACCIDENTALES">
                <StepsTable :items="renovacionEmpresas"/>
            </CardDropDown>
        </div>
        <div class="w-3/4">
            <CardDropDown
                title="REQUISITOS PARA UNIDADES AMBIENTALES DE ENTIDADES PÚBLICAS O PRIVADAS">
                <StepsTable :items="renovacionEmpresas"/>
            </CardDropDown>
        </div>
        <div class="w-3/4">
            <CardDropDown
                title="REQUISITOS PARA FUNDACIONES Y ORGANIZACIONES NO GUBERNAMENTALES">
                <StepsTable :items="renovacionEmpresas"/>
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
    import { 
        INSCRIPCION_UNIPERSONAL_NACIONAL,
        INSCRIPCION_UNIPERSONAL_EXTRANJEROS,
        INSCRIPCION_EMPRESAS_CONSULTORAS_NACIONALES,
        INSCRIPCION_EMPRESAS_CONSULTORAS_EXTRANJERAS,
        INSCRIPCION_ASOCIACIONES_ACCIDENTALES,
        INSCRIPCION_UNIDADES_AMBIENTALES,
     } from '@/stores/constants/constantsRENCApage';
    export default{
        components: {
            ComplementsRequirements,
            CardDropDown,
            StepsTable,
        },
        setup(){
            return {
                inscripcionUnipersonalNacional: INSCRIPCION_UNIPERSONAL_NACIONAL,
                inscripcionUnipersonalExtranjeros: INSCRIPCION_UNIPERSONAL_EXTRANJEROS,
                inscripcionEmpresasConsultorasNacionales: INSCRIPCION_EMPRESAS_CONSULTORAS_NACIONALES,
                inscripcionEmpresasConsultorasNacionales: INSCRIPCION_EMPRESAS_CONSULTORAS_EXTRANJERAS,
                inscripcionAsociacionesAccidentales: INSCRIPCION_ASOCIACIONES_ACCIDENTALES,
                inscripcionUnidadesAmbientales: INSCRIPCION_UNIDADES_AMBIENTALES,
            };
        }
    }
</script>