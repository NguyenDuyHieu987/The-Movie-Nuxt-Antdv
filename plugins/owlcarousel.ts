import carousel from 'vue-owl-carousel/src/Carousel.vue';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('carousel', carousel);
});
