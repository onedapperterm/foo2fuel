<script lang="ts">


export default defineNuxtComponent({
  name: 'Header',
  setup() {
    const route = useRoute()
    const localePath = useLocalePath();

    const links = [
      { to: '/', translationKey: 'header.home' },
      { to: '/submit', translationKey: 'header.submit' },
      { to: '/tips', translationKey: 'header.tips' }
    ]

    function isActive(to: string) {
      return localePath(route.path) === localePath(to);
    }

    function atHome():boolean {
      return localePath(route.path) === localePath('/');
    }

    return { links, isActive, route, localePath, atHome}
  }
})

</script>

<template>
  <header class="py-4 z-10 relative" :class="atHome() ? '' : 'border-b'">
    <nav class="flex justify-between items-center max-w-8xl mx-auto px-4">
      <!-- Logo or Title -->
      <h1 class="text-xl text-primary font-semibold">
        <nuxt-link :to="localePath('/')" class="hover:text-gray-200">
          F2F
        </nuxt-link>
      </h1>
      
      <!-- Navigation Links -->
      <ul class="flex space-x-4 items-center">
        <li v-for="link in links" :key="link.to" :class="atHome() ? 'text-white' : ''">
          <nuxt-link :to="localePath(link.to)" :class="{ 'text-primary': isActive(link.to) }" class="hover:text-gray-200">
            {{ $t(link.translationKey) }}
          </nuxt-link>
        </li>
        <li>
          <LanguageSelector></LanguageSelector>
        </li>
      </ul>
    </nav>

  </header>
</template>

