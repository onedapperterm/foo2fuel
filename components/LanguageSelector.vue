<script setup lang="ts">

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select';

const { locales, locale, setLocale } = useI18n();

const language = computed({
  get: () => locale.value,
  set: (value) => {
    setLocale(value);
  },
});
</script>

<template> 
  <Select v-model="language">
    <SelectTrigger class="bg-primary border-0">
      <SelectValue placeholder="Select a fruit" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem 
          v-for="item in locales"
          :key="typeof item === 'object' ? item.code : item"
          :value="typeof item === 'object' ? item.code : item"
        >
          {{ typeof item === "object" ? item.code : item }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
