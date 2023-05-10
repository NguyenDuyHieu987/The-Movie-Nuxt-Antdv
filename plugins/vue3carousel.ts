import { Carousel, Slide, Navigation,Pagination } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('Carousel', Carousel).component("Slide",Slide).component("Navigation",Navigation).component("Pagination",Pagination);
});
