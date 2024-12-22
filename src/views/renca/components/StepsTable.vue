<template>
    <div class="flex justify-center mt-6">
      <table class="w-3/4">
        <thead class="bg-gray-200">
          <tr>
            <th class="text-center border px-4 py-2 w-1/6">NRO</th>
            <th class="text-center border px-4 py-2 w-5/6">REQUISITOS</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(text, index) in items" :key="index" class="hover:bg-gray-100">
            <td class="border px-4 py-2 text-center">{{ index + 1 }}</td>
            <td class="border px-4 py-2">{{ text }}</td>
          </tr>
        </tbody>
      </table>
    </div>
</template>
  
<script setup>

  const props = defineProps({
    items: {
        type: Array,
        default: []
    }
  });
  console.log(props.items)

</script>
  
<style scoped>

</style>
  