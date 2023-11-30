import type { RouterConfig } from '@nuxt/schema';

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      window.history.scrollRestoration = 'auto';
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
};
