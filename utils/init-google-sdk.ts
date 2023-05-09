export async function initGoogleSdk() {
  return await new Promise((resolve: any) => {
    window.google.accounts.id.initialize({
      client_id:
        '973707203186-4f3sedatri213ib2f5j01ts0qj9c3fk0.apps.googleusercontent.com',
      // callback: handleCredentialResponse,
    });
    window.google.accounts.id.prompt();
    resolve();
  });
}
