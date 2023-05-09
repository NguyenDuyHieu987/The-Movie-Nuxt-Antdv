import { useStore } from '@/store/useStore';

export default defineNuxtRouteMiddleware((to, from) => {
  const store = useStore();


  if (to.name == 'index') {
    if (store.$state.loadingHomePage == false) {
      new Promise((resolve: any) => {
        // loadingHomePage.value = true;

        resolve();
        // store.getDataHomePage()
        // store.getDataMisc()
      }).then(() => {
        setTimeout(() => {
          // loadingHomePage.value = false;
        }, 2000);
      });
    }

  }
});
