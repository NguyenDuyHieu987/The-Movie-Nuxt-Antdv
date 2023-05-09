// import { accountService } from './accountService';
declare global {
  interface Window {
    FB: any;
    fbAsyncInit: any;
  }
}

export async function initFacebookSdk() {
  return await new Promise((resolve: any) => {
    // if (process.client) {
    // wait for facebook sdk to initialize before starting the vue app
    window.fbAsyncInit = function () {
      const FB = window?.FB;
      FB.init({
        appId: 820070179113499,
        cookie: true,
        xfbml: true,
        version: 'v15.0',
      });
      resolve();

      // auto authenticate with the api if already logged in with facebook

      // FB.getLoginStatus(({ authResponse }) => {
      //   if (authResponse) {
      //     accountService
      //       .apiAuthenticate(authResponse.accessToken)
      //       .then(resolve);
      //   } else {
      //     resolve();
      //   }
      // });
    };

    // load facebook sdk script
    (function (d, s, id) {
      var js: any,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs?.parentNode?.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
    // }
  });
}
