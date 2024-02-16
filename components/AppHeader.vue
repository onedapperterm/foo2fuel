<template>
  <header class="py-4 z-10 relative" :class="route.path != '/' ? 'border-b' : ''">
    <nav class="flex justify-between items-center max-w-8xl mx-auto px-4">
      <!-- Logo or Title -->
      <h1 class="text-xl text-primary font-semibold">
        <nuxt-link :to="'/'" class="hover:text-gray-200">
          F2F
        </nuxt-link>
      </h1>
      
      <!-- Navigation Links -->
      <ul class="flex space-x-4">
        <li v-for="link in links" :key="link.to" :class="route.path == '/' ? 'text-white' : ''">
          <nuxt-link :to="link.to" :class="{ 'text-primary': isActive(link.to) }" class="hover:text-gray-200">{{ link.text }}</nuxt-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">

export default defineNuxtComponent({
  name: 'Header',
  setup() {
    const route = useRoute()

    const links = [
      { to: '/', text: 'Home' },
      { to: '/submit', text: 'Submit' },
      { to: '/tips', text: 'Tips' }
    ]

    function isActive(to: string) {
      return route.path === to;
    }

    return { links, isActive, route }
  }
})
</script>
