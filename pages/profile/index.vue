<template>
  <div class="profile-container">
    <h2>Username: {{ store.$state.userAccount?.username }}</h2>
    <h3>Email: {{ store.$state.userAccount?.email }}</h3>
    <h3>Fullname: {{ store.$state.userAccount?.full_name }}</h3>
  </div>
</template>

<script setup lang="ts">
const store = useStore();
</script>

<style lang="scss" scoped src="./ProfilePage.scss"></style>
