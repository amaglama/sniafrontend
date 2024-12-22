<template>
    <div>
        Formulario Renovacion
    </div>
    <FormComp 
        :form="form"
        :form-types="formTypes"
        :form-errors="formErrors">

    </FormComp>
    
</template>

<script>
    import FormComp from '@/components/forms/FormComp.vue';
import { ref } from 'vue';
    export default{
        components: {
            FormComp
        },
        setup(){
            const form = ref({});
            const formTypes = ref({});
            const formErrors = ref([]);
            return {
                form,
                formTypes,
                formErrors
            };
        }
    };
</script>