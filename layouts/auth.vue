<template>
  <div class="auth-container">
    <div class="image-auth">
      <nuxt-img
        :src="getImage(`Background_Auth${image}.jpg`, '/background/auth')"
        loading="lazy"
      />
    </div>
    <div class="image-auth responsive">
      <nuxt-img
        :src="
          getImage(
            `Background_Auth${image_mobile}.jpg`,
            '/background/auth_mobile'
          )
        "
        loading="lazy"
      />
    </div>

    <slot />
  </div>
</template>

<script setup lang="ts">
import { getImage } from '~/services/image';

const image = ref<number>(Math.floor(Math.random() * 3) + 1);
const image_mobile = ref<number>(Math.floor(Math.random() * 3) + 1);
</script>

<style lang="scss" scoped src="../assets/style/authLayout.scss"></style>
