<template>
  <div class="auth-container">
    <HeaderAuth />
    <div class="background-auth">
      <div class="image-auth desktop">
        <nuxt-img
          :src="// getImage(`Background_Auth${image}.jpg`, '/background/auth')
          'https://ik.imagekit.io/8toa5f2rp/images/background/1/Background_1.jpg'"
          loading="lazy"
        />
      </div>

      <!-- <div class="image-auth responsive">
        <nuxt-img
          :src="
            getImage(
              `Background_Auth${image_mobile}.jpg`,
              '/background/auth_mobile'
            )
          "
          loading="lazy"
        />
      </div> -->
    </div>

    <slot />
  </div>
</template>

<script setup lang="ts">
import HeaderAuth from '~/components/layouts/HeaderAuth/HeaderAuth.vue';
import { getImage } from '~/services/image';

const image = ref<number>(Math.floor(Math.random() * 3) + 1);
const image_mobile = ref<number>(Math.floor(Math.random() * 3) + 1);
</script>

<style lang="scss" scoped src="../assets/style/authLayout.scss"></style>
