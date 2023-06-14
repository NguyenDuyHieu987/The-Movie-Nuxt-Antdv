<template>
  <div class="auth-container">
    <div class="image-auth">
      <nuxt-img
        :src="`/images/background_auth/Background_Auth${image}.jpg`"
        loading="lazy"
      />
    </div>
    <div class="image-auth responsive">
      <nuxt-img
        :src="`/images/background_auth_responsive/Background_Auth${image_mobile}.jpg`"
        loading="lazy"
      />
    </div>

    <slot />
  </div>
</template>

<script setup lang="ts">
const image = ref<number>(Math.floor(Math.random() * 3) + 1);
const image_mobile = ref<number>(Math.floor(Math.random() * 3) + 1);
</script>

<style lang="scss" scoped src="../assets/style/authLayout.scss"></style>
