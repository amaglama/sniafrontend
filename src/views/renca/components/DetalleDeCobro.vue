<template>
    <table class="border-4 rounded-lg">
        <tbody>
            <tr class="flex justify-between">
                <th class="flex justify-center w-4/6">DETALLE DE COBRO</th>
                <th class="flex flex-col justify-center items-center w-1/6">INSCRIPCIÓN<p>(Bs)</p></th>
                <th class="flex flex-col justify-center items-center w-1/6">RENOVACIÓN<p>(Bs)</p></th>
            </tr>
            <tr class="flex justify-between">
                <td class="flex justify-center w-4/6">Profesionales Unipersonales Nacionales o Extranjeros CAT-A</td>
                <td class="flex justify-center items-center w-1/6">{{ amountsCategories["inscripcion"]["A"].toFixed(2) }}</td>
                <td class="flex justify-center items-center w-1/6">{{ amountsCategories["renovacion"]["A"].toFixed(2) }}</td>
            </tr>
            <tr class="flex justify-between">
                <td class="flex justify-center w-4/6">Profesionales Unipersonales Nacionales o Extranjeros CAT-B</td>
                <td class="flex justify-center items-center w-1/6">{{ amountsCategories["inscripcion"]["B"].toFixed(2) }}</td>
                <td class="flex justify-center items-center w-1/6">{{ amountsCategories["renovacion"]["B"].toFixed(2) }}</td>
            </tr>
            <tr class="flex justify-between">
                <td class="flex justify-center w-4/6">Profesionales Unipersonales Nacionales o Extranjeros CAT-C</td>
                <td class="flex justify-center items-center w-1/6">{{ amountsCategories["inscripcion"]["C"].toFixed(2) }}</td>
                <td class="flex justify-center items-center w-1/6">{{ amountsCategories["renovacion"]["C"].toFixed(2) }}</td>
            </tr>
            <tr class="flex justify-between">
                <td class="flex justify-center w-4/6">Empresas Consultoras Nacionales y Extranjeras</td>
                <td class="flex justify-center items-center w-1/6">{{ amountsCategories["inscripcion"]["empresa_consultora"].toFixed(2) }}</td>
                <td class="flex justify-center items-center w-1/6">{{ amountsCategories["renovacion"]["empresa_consultora"].toFixed(2) }}</td>
            </tr>
            <tr class="flex justify-between">
                <td class="flex justify-center w-4/6">Sociedad o Asociaciones de Empresas Nacionales con Extranjeras</td>
                <td class="flex justify-center items-center w-1/6">{{ amountsCategories["inscripcion"]["sociedad_o_asociaciones"].toFixed(2) }}</td>
                <td class="flex justify-center items-center w-1/6">{{ amountsCategories["renovacion"]["sociedad_o_asociaciones"].toFixed(2) }}</td>
            </tr>
            <tr class="flex justify-between">
                <td class="flex justify-center w-4/6">Unidades Ambientales de Instancias Públicas y Privadas</td>
                <td class="flex justify-center items-center w-1/6">{{ amountsCategories["inscripcion"]["unidad_ambiental"].toFixed(2) }}</td>
                <td class="flex justify-center items-center w-1/6">{{ amountsCategories["renovacion"]["unidad_ambiental"].toFixed(2) }}</td>
            </tr>
        </tbody>
    </table>
</template>
<script>
import { amountsCategories } from '@/stores/constants/constantsRENCA';
export default{
    setup(){
        return {
            amountsCategories
        }
    }
}
</script>