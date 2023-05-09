<template>
  <div class="auth-container">
    <div class="image-auth">
      <img
        :src="`/images/background_auth/Background_Auth${image}.jpg`"
        alt=""
      />
    </div>
    <div class="image-auth responsive">
      <img
        :src="`/images/background_auth_responsive/Background_Auth${image_mobile}.jpg`"
        alt=""
      />
    </div>

    <slot />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const image = ref(Math.floor(Math.random() * 3) + 1);
const image_mobile = ref(Math.floor(Math.random() * 3) + 1);
</script>
<style lang="scss">
@media only screen and (max-width: 500px) {
  .image-auth:not(.image-auth.responsive) {
    display: none;
  }

  .image-auth.responsive {
    display: block !important;
  }
}

.auth-container {
  overflow-y: scroll;
  height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;

  .image-auth {
    height: 100vh;
    width: 100%;
    position: absolute;
  }

  .image-auth.responsive {
    display: none;
  }

  img {
    width: 100%;
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    position: absolute;
    opacity: 1;
    object-fit: cover;
  }
}
</style>
