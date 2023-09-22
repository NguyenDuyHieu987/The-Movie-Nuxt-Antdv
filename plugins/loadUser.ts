export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:created', async () => {
    const route = useRoute();

    // route.matched[0].meta.layout != 'auth'

    const store = useStore();

    store.loadingUser = true;

    await store.loadUser();
  });
});
