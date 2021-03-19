<template>
  <main>
    <h1>{{ $site.title }}</h1>
    <div>{{ $site.description }}</div>
    <a :href="$frontmatter.actionLink">{{ $frontmatter.actionText }}</a>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>
