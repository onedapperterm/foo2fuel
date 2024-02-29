<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from '@/components/ui/form'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger, } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { formatDate } from '@vueuse/core'
import { cn } from '~/lib/utils'
import { callApi } from '../lib/httpClient';

const categories: string[] = ['Gemüse', 'Brot', 'Fleisch', 'Getränke', 'Sonstigen'];

const formSchema = toTypedSchema(z.object({
  
  description: z.string().min(2).max(100),
  category: z.string({required_error: 'select a valid category'}),
  expirationdate: z.date({ required_error: 'An expiration date is required.'})
}))


const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit((values) => {
  console.log('Form submitted!', values)
  
  callApi('/save', values, 'post').then((res) => {
    console.log(res)
    });

})

const isValid = computed(() => form.isFieldValid('description') && form.isFieldValid('expirationdate') && form.isFieldValid('category'));

</script>

<template>
  <div class="w-screen flex justify-center p-8">
    <client-only>
      <form @submit="onSubmit" class="max-w-[450px] flex flex-col align-left gap-4">
        <FormField v-slot="{ componentField }" name="description">
          <FormItem>
            <FormLabel>{{ $t('submit.description_label')}}</FormLabel>
            <FormControl>
              <Input type="text" placeholder="..." v-bind="componentField" />
            </FormControl>
            <FormDescription>
              {{ $t('submit.description') }}
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="category">
          <FormItem>
            <FormLabel> {{ $t('submit.category')}} </FormLabel>
            <Select v-bind="componentField">
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  <SelectItem v-for="category in categories" :key="category" :value="category">
                    {{ category }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField, value }" name="expirationdate">
          <FormItem class="flex flex-col">
            <FormLabel> {{ $t('submit.date_label') }} </FormLabel>
            <Popover>
              <PopoverTrigger as-child>
                <FormControl>
                  <Button variant="outline" :class="cn('w-[240px] ps-3 text-start font-normal', !value && 'text-muted-foreground',)" >
                    <span>{{ value ? formatDate(value, "DD.MM.YYYY") : "Date" }}</span>
                    <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent class="p-0">
                <Calendar v-bind="componentField" />
              </PopoverContent>
            </Popover>
            <FormDescription>
              Your date of birth is used to calculate your age.
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>

        <Button type="submit" :disabled="!isValid">
          {{ $t('submit.submit_button') }}
        </Button>
      </form>
    </client-only>
  </div>
</template>
