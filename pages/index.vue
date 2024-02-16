<script setup lang="ts">
import {useMouse, useWindowSize} from '@vueuse/core';

const localePath = useLocalePath();

const {x, y} = useMouse();
const { width, height } = useWindowSize();

const dx = computed(() => Math.abs(x.value - width.value / 2));
const dy = computed(() => Math.abs(y.value - height.value / 2));
const distance = computed(() => Math.sqrt(dx.value * dx.value + dy.value * dy.value));

const size = computed(() => Math.max(300 - distance.value / 3, 100));

const opacity = computed(() => Math.min(Math.max(size.value / 400, 0.7), 1));

const logo = ref<HTMLElement>()

const logoGradient = computed(() => {
  let rect = logo.value?.getBoundingClientRect()
  const xPos = x.value - (rect?.left ?? 0)
  const yPos = y.value - (rect?.top ?? 0)

  return `radial-gradient(circle at ${xPos}px ${yPos}px, black 30%, transparent 100%)`
})
</script>

<template>
  <div class="
    flex flex-col items-center 
    justify-center h-screen w-screen 
    fixed top-0 bg-black overflow-hidden
    ">

    <div class="max-w-4xl mx-auto px-4 py-8">
      <h1 class="text-8xl font-bold text-center text-primary mb-4" ref="logo"
        :style="{maskImage: logoGradient}">
        Food 2 Fuel
      </h1>
      <p class="text-lg text-center text-gray-400 mb-8">
        {{ $t('home.description')}}
      </p>
      <div class="flex justify-center">
        <Button>
          <NuxtLink :to="localePath('submit')">
            {{$t('home.enter_button')}}
          </NuxtLink>
        </Button>
      </div>
    </div>

    <div class="
      pointer-follower bg-emerald-600 absolute rounded-full
      -translate-x-1/2 -translate-y-1/2 pointer-events-none
      blur-3xl
      "
      :style="{
        opacity,
        left:`${x}px`,
        top:`${y}px`,
        width: `${size}px`,
        height: `${size}px`,
      }"
    >
    </div>

    <div class="bottom-decoration
      h-[40vh] w-screen absolute bottom-[-30vh] blur-[20vh]
      ">
    </div>
  </div>
</template>

<style>
.bottom-decoration {
  background: linear-gradient(45deg, #00DC82 0%, #36E4DA 50%, #059467 100%);
}
</style>
