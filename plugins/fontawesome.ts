import { library, config } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  fas,
  // faVideoCamera,
  // faFilm,
  // faRankingStar,
  // faGlobe,
  // faCalendarDays,
  // faBookmark,
  // faList,
  // faChevronLeft,
  // faChevronRight,
  // faChevronUp,
  // faPlay,
  // faStar,
  // faAt,
  // faCheck,
  // faFilter,
  // faMagnifyingGlass,
  // faMoneyCheckDollar,
} from '@fortawesome/free-solid-svg-icons';
import {
  // faYoutube,
  // faFacebookF,
  fab,
} from '@fortawesome/free-brands-svg-icons';
import {
  far,
  // faEnvelope,
} from '@fortawesome/free-regular-svg-icons';

// This is important, we are going to let Nuxt worry about the CSS
config.autoAddCss = false;

// You can add your icons directly in this plugin. See other examples for how you
// can add other styles or just individual icons.
library.add(
  fas,
  fab,
  far
  // faVideoCamera,
  // faFilm,
  // faRankingStar,
  // faGlobe,
  // faCalendarDays,
  // faBookmark,
  // faList,
  // faChevronLeft,
  // faChevronRight,
  // faChevronUp,
  // faPlay,
  // faStar,
  // faAt,
  // faCheck,
  // faFilter,
  // faMagnifyingGlass,
  // faMoneyCheckDollar,
  // faYoutube,
  // faFacebookF,
  // faEnvelope
);

export default defineNuxtPlugin((nuxtApp) => {
  // nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon, {});
});
