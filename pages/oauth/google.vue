<template>
  <div class="oauth padding-content"></div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'oauth',
});

const route = useRoute();

watch(
  () => route.query,
  () => {
    console.log(route);
  },
  { deep: true, immediate: true }
);
</script>
