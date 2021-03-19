<template>
  <header class="header border-b flex items-center px-8">
    <ToggleSideBar class="w-5 h-5 mr-6 cursor-pointer md:hidden" />
    <a class="hidden text-xl md:block" :href="$site.base">{{ $site.title }}</a>
    <nav class="ml-auto">
      <a
        v-for="(link, index) in $site.themeConfig.nav"
        :key="index"
        class="ml-4"
        :href="link.link"
      >
        {{ link.text }}
      </a>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ToggleSideBar from './ToggleSideBar.vue';

export default defineComponent({
  components: {
    ToggleSideBar
  }
});
</script>

<style scoped>
.header {
  @apply bg-white;

  grid-area: header;
}
</style>
