import VueSlickCarousel from 'vue-slick-carousel';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('SlickCarousel', VueSlickCarousel);
});
