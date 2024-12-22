<script setup>
import { ref, computed } from 'vue';
import InputForm from '@/components/forms/input/InputForm.vue';
const props = defineProps({
    items: {
        type: Array,
        default: () => [],
        required: true,
    },
});

const emit = defineEmits(['update:itemsFiltered']);

const solitudCode = ref('');
const searcUsername = ref('');

const filteredItems = computed(() => {
    const filtered = props.items.filter((item) => {
        const matchesCode = solitudCode.value === '' || item['request_code']?.toLowerCase().includes(solitudCode.value.toLowerCase());
        const matchesName = searcUsername.value === '' || item['user_name']?.toLowerCase().includes(searcUsername.value.toLowerCase());
        return matchesCode && matchesName;
    });
    emit('update:itemsFiltered', filtered);
    return filtered;
});

emit('update:itemsFiltered', filteredItems);
</script>

<template>
    <div class="flex space-x-4 mb-4">
        <InputForm
            v-model="solitudCode"
            type="text"
            placeholder="Buscar por Código de Solicitud"
            class="w-96"
            label="Código de Solicitud"
        />
        <InputForm
            v-model="searcUsername"
            type="text"
            placeholder="Buscar por Nombre del Consultor Unipersonal"
            class="w-96"
            label="Nombre del Consultor Unipersonal"
        />
    </div>
</template>
