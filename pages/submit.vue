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

const categories: string[] = ['Gemüse', 'Brot', 'Fleisch', 'Getränke', 'Sonstigen'];

const formSchema = toTypedSchema(z.object({
  description: z.string().min(2).max(100),
  category: z.string({required_error: 'select a valid category'}),
  expirationDate: z.date({ required_error: 'An expiration date is required.'})
}))


const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit((values) => {
  console.log('Form submitted!', values)
})

const isValid = computed(() => form.isFieldValid('description') && form.isFieldValid('expirationDate') && form.isFieldValid('category'));

</script>

<template>
  <div class="w-screen flex justify-center p-8">
    <client-only>
      <form @submit="onSubmit" class="max-w-[450px] flex flex-col align-left gap-4">
        <FormField v-slot="{ componentField }" name="description">
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Input type="text" placeholder="shadcn" v-bind="componentField" />
            </FormControl>
            <FormDescription>
              This is your description
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="category">
          <FormItem>
            <FormLabel>Category</FormLabel>
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
            <FormDescription>
              You can manage verified category addresses in your category settings.
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField, value }" name="expirationDate">
          <FormItem class="flex flex-col">
            <FormLabel>Expiration Date</FormLabel>
            <Popover>
              <PopoverTrigger as-child>
                <FormControl>
                  <Button variant="outline" :class="cn('w-[240px] ps-3 text-start font-normal', !value && 'text-muted-foreground',)" >
                    <span>{{ value ? formatDate(value, "DD.MM.YYYY") : "Pick a date" }}</span>
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
          Submit
        </Button>
      </form>
    </client-only>
  </div>
</template>
