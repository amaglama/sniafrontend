<template>
    <FormField :label="label" :class-name="className">
        <slot></slot>
    </FormField>
</template>

<script>
    import FormField from '@/components/ComponentsOne/FormField.vue';
    export default{
        props: {
            label: String,
            type: {
                type: String,
                default: '',
            },
            className: {
                type: String,
                default: "mb-6 last:mb-0"
            }
        },
        components: {
            FormField,
        }
    }
</script>