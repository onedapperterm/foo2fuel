<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { itemColumns } from '../components/ItemsTable/columns';

export interface Item {
  id: number
  description: string
  category: string
  date: string
}

const data = ref<Item[]>([])

async function getData(): Promise<Item[]> {
  // Fetch data from your API here.
  return [
    {
      id: 1,
      description: "Sample Description",
      category: "Sample Category",
      date: "2024-02-29"
    },
    {
      id: 2,
      description: "Sample Description",
      category: "Sample Category",
      date: "2024-02-29"
    },
    // ...
  ]
}

onMounted(async () => {
  data.value = await getData();
  console.log(data.value);
});
</script>

<template>
  <div class="w-screen flex justify-center p-8">
      <div class="container py-10 mx-auto">
        <ItemTable :columns="itemColumns" :data="data" />
      </div>
  </div>
</template>

