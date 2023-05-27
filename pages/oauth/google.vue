<template></template>

<script setup lang="ts">
definePageMeta({
  layout: 'oauth',
});

const route = useRoute();

onBeforeMount(() => {
  // console.log(route.query.code);
});
</script>
