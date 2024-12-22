<template>
    <TituloDetalleDeCobro></TituloDetalleDeCobro>
    <DetalleDeCobro></DetalleDeCobro>
    <DetalleDeCobroActualizacion></DetalleDeCobroActualizacion>
    <PresentacionDeDocumentos></PresentacionDeDocumentos>
</template>

<script>
    import TituloDetalleDeCobro from '@/views/renca/components/TituloDetalleDeCobro.vue';
    import DetalleDeCobro from '@/views/renca/components/DetalleDeCobro.vue';
    import DetalleDeCobroActualizacion from '@/views/renca/components/DetalleDeCobroActualizacion.vue';
    import PresentacionDeDocumentos from '@/views/renca/components/PresentacionDeDocumentos.vue';
    export default {
        components: {
            TituloDetalleDeCobro,
            DetalleDeCobro,
            DetalleDeCobroActualizacion,
            PresentacionDeDocumentos
        }
    }
</script>

    