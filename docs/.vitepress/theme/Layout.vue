<template>
  <NavBar />
  <Home v-if="$frontmatter.home" />
  <main v-else class="relative">
    <Content />
  </main>
  <SideBar />
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import {
  useRouter,
  useRoute,
  useSiteData,
  useSiteDataByRoute,
  usePageData,
  useFrontmatter
} from 'vitepress';
import Home from './components/Home.vue';
import NavBar from './components/NavBar.vue';
import SideBar from './components/SideBar.vue';
import { useStore } from './composables';

export default defineComponent({
  components: {
    Home,
    NavBar,
    SideBar
  },
  setup() {
    const { state, actions } = useStore();

    onMounted(() => {
      //
    });

    window.addEventListener('resize', e => {
      if ((e.target as Window).innerWidth >= 768) {
        if (state.sideBarHidden) {
          actions.toggleSideBarHidden();
        }
      }
    });

    const router = useRouter();
    const route = useRoute();
    const siteData = useSiteData();
    const siteDataByRoute = useSiteDataByRoute();
    const pageData = usePageData();
    const frontmatter = useFrontmatter();

    console.log('Router');
    console.log(router);
    console.log('Route');
    console.log(route);
    console.log('Site Data');
    console.log(siteData);
    console.log('Site Data By Route');
    console.log(siteDataByRoute);
    console.log('Page Data');
    console.log(pageData);
    console.log('Frontmatter');
    console.log(frontmatter);
  }
});
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  h1 {
    @apply text-3xl font-semibold;
  }

  main {
    @apply px-8 pt-8;

    grid-area: main;
  }
}

#app {
  height: 100vh;
  display: grid;
  grid-template-rows: 70px 1fr;
  grid-template-areas:
    'header'
    'main';
}

@screen md {
  #app {
    grid-template-columns: auto 1fr;
    grid-template-areas:
      'header header'
      'nav main';
  }
}
</style>
