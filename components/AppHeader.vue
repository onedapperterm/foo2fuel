<script>
const routes = ['home', 'business', 'families', 'tips']
</script>

<template>
  <header>
    <ul>
      <li v-for="route in routes">
          {{route}}
      </li>
    </ul>
  </header>
</template>
