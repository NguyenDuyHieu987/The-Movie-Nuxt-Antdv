import VueProgressBar from '@aacassandra/vue3-progressbar';

const progressBarOptions = {
  color: '#e82b00',
  failedColor: 'red',
  thickness: '3px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300,
  },
  autoRevert: true,
  location: 'top',
  inverse: false,
};

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueProgressBar, progressBarOptions);
});
