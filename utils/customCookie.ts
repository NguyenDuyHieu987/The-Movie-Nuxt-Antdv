export function setCookie(cname: string, cvalue: any, exp: number) {
  const d = new Date();
  d.setTime(d.getTime() + exp * 3600 * 1000);
  let expires = 'expires=' + d.toUTCString();

  if (process.client) {
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
  }
}

export function getCookie(cname: string) {
  let name = cname + '=';
  let decodedCookie = '';

  if (process.client) {
    decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }

    // document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  return null;
}
