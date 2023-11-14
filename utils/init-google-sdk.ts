export async function initGoogleSdk() {
  const nuxtConfig = useRuntimeConfig();

  return await new Promise((resolve: any) => {
    window.google.accounts.id.initialize({
      client_id: nuxtConfig.googleOauth2ClientID,
      // callback: handleCredentialResponse,
    });
    window.google.accounts.id.prompt();

    resolve();
  });
}
