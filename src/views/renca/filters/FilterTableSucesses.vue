<script setup>
import { ref, computed } from 'vue';
import SelectForm from '@/components/forms/select/SelectForm.vue';
import InputForm from '@/components/forms/input/InputForm.vue';

const FIRST_YEAR = 2000;
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
const year = ref('');


const lastYear =  new Date().getFullYear();
const years = [];
for (let i = FIRST_YEAR; i <= lastYear; i++) {
    years.push(i);
}
years.sort((y1,y2) => y1<y2);

const filteredItems = computed(() => {
    const filtered = props.items.filter((item) => {
        const matchesCode = solitudCode.value === '' || item['solitud_code']?.toLowerCase().includes(solitudCode.value.toLowerCase());
        const matchesName = searcUsername.value === '' || item['user_name']?.toLowerCase().includes(searcUsername.value.toLowerCase());
        const matchesYear = year.value === '' || item['emition_date'].substring(0, 4) === year.toString();
        return matchesCode && matchesName && matchesYear;
    });
    emit('update:itemsFiltered', filtered);
    return filtered;
});

emit('update:itemsFiltered', filteredItems);
</script>

<template>
    <div class="flex space-x-4 mb-4 justify-between">
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
        <SelectForm
            class-name="w-32"
            v-model="year"
            label="Año"
            :options="years"
        />
        
    </div>
</template>
