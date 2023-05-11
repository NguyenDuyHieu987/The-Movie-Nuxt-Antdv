import { useStore } from '@/store/useStore';

export default defineNuxtRouteMiddleware((to, from) => {
  const store = useStore();


  // if (to.name == 'index') {
    // if (store.$state.loadingHomePage == true) {
    //   navigateTo({path:to.path});
    // } else {
    //   new Promise((resolve: any) => {
    //     loadingHomePage.value = true;
    //     store.$state.loadingHomePage = true;
  
    //     resolve();
    //     // store.dispatch('getDataHomePage'),
    //     // store.dispatch('getDataMisc')
    //   }).then(() => {
    //     setTimeout(() => {
    //       loadingHomePage.value = false;
    //       navigateTo({path:to.path});
    //     }, 2000);
    //   });
    // }

  // }
});
