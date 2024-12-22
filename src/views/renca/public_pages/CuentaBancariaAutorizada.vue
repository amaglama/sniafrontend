<template>
    <div class="p-16">
        <TituloDetalleDeCobro></TituloDetalleDeCobro>
        <DetalleDeCobro></DetalleDeCobro>
        <DetalleDeCobroActualizacion></DetalleDeCobroActualizacion>
        <PresentacionDeDocumentos></PresentacionDeDocumentos>
        <ul class="flex flex-col p-8 gap-y-2">
			<li type="disc">La duración del trámite de Inscripción para el registro RENCA es de 15 días hábiles, computables a partir del día siguiente de la recepción de la documentación.</li>
			<li type="disc">El trámite de renovación en el RENCA, se realizará con 10 días hábiles de anticipación al vencimiento de la vigencia del Certificado, el incumplimiento de este plazo, implicará un pago adicional, correspondiente al 50% del monto de actualización vigente. Si el retraso fuera por más de una gestión, se realizará un número de pagos adicionales igual al número de gestiones sin actualización.</li>
			<li type="disc">De acuerdo a lo establecido en el Art. 159 del Reglamento de Prevención y Control Ambiental (RPCA), esta Instancia Ambiental no podrá evaluar documentación en idioma extranjero, debiendo ser traducido en idioma oficial a través de los canales correspondientes.</li>
		</ul>
        <div class="h-12"></div>
    </div>
</template>

<script>
    import TituloDetalleDeCobro from '../components/TituloDetalleDeCobro.vue';
    import DetalleDeCobro from '../components/DetalleDeCobro.vue';
    import DetalleDeCobroActualizacion from '../components/DetalleDeCobroActualizacion.vue';
    import PresentacionDeDocumentos from '../components/PresentacionDeDocumentos.vue';
    export default {
        components: {
            TituloDetalleDeCobro,
            DetalleDeCobro,
            DetalleDeCobroActualizacion,
            PresentacionDeDocumentos
        }
    }
</script>