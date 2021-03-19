<template>
  <transition name="slide">
    <nav v-if="!state.sideBarHidden" class="nav bg-white border-r"></nav>
  </transition>
  <div
    v-if="!state.sideBarHidden"
    class="bg-blur md:hidden"
    @click="toggleSideBarHidden()"
  ></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '../composables';

export default defineComponent({
  setup() {
    const {
      state,
      actions: { toggleSideBarHidden }
    } = useStore();

    return {
      state,
      toggleSideBarHidden
    };
  }
});
</script>

<style scoped>
.nav {
  position: absolute;
  top: 70px;
  left: 0;
  bottom: 0;
  width: 300px;
  z-index: 50;
}

.bg-blur {
  position: absolute;
  inset: 70px 0 0 0;
  z-index: 40;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}

@screen md {
  .nav {
    position: static;
    grid-area: nav;
  }
}
</style>
