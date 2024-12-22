<template>
    <BaseButton
        :label="label"
        :onclick="onClick"
        :icon="icon"
        :type="type"
        :class="`hover:shadow-2xl ${className}`"
        :color="isIconButton? '' : color"
        :icon-size="isIconButton? '': null"
        :disabled="disabled"
        :border-less="isIconButton"
    />
</template>
<script setup>
import BaseButton from '@/components/ComponentsOne/BaseButton.vue';
    
    // eslint-disable-next-line no-unused-vars
    const props = defineProps({
    label: {
        type: String,
        default: "",
    },
    onClick: {
        type: Function,
        default: () => {}
    },
    icon: {
        type: String,
        default: null
    },
    isIconButton: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        default: 'button'
    },
    className:{
        type: String,
        default: ''
    },
    color:{
        type: String,
        default: 'primary'
    },
    disabled:{
        type: Boolean,
        default: false,
    }
    });
</script>