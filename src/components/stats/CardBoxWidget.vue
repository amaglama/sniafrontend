<template>
    <CardBoxWidget
          :trend="trend"
          :trend-type="trendType"
          :color="color"
          :icon="icon"
          :number="quantity"
          :label="label"
          :class="'w-64 border-2'"
        />
</template>

<script setup>
    import CardBoxWidget from '../ComponentsOne/CardBoxWidget.vue';
    import { mdiAccountMultiple } from '@mdi/js';

    const props = defineProps({
        icon: {
            type: String,
            default: mdiAccountMultiple
        },
        quantity: {
            type: Number,
            default: 0
        },
        label: {
            type: String,
            default: ""
        },
        color: {
            type: String,
            default: "bg-primary"
        },
        trend: {
            type: String,
            default: "0%"
        },
        trendType: {
            type: String,
            default: "up"
        }
    });
</script>