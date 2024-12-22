<template>
    <table class="border-4 rounded-lg" >
        <tbody>
            <tr class="flex justify-between">
                <th class="flex w-4/6 justify-center items-center">DETALLE DEL COBRO</th>
                <th class="flex flex-col w-2/6 justify-center items-center">MONTO<p>(Bs)</p></th>
            </tr>
            <tr class="flex justify-between">
                <td class="flex w-4/6 justify-center items-center">Actualización de datos del certificados RENCA</td>
                <td class="flex w-2/6 justify-center items-center">{{ amountsCategories["actualizacion"].toFixed(2) }} Bs.-</td>
            </tr>
            <tr class="flex justify-between">
                <td class="flex w-4/6 justify-center items-center">Emisión de Fotostática legalizada del certificado RENCA</td>
                <td class="flex w-2/6 justify-center items-center">10% del costo de inscripción</td>
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