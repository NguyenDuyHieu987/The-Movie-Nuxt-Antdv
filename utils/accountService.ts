// import { BehaviorSubject } from 'rxjs';
import axios from 'axios';
// import hmacSHA256 from 'crypto-js/hmac-sha256';
// import Base64 from 'crypto-js/enc-base64';
// import * as jose from 'jose';

// const accountSubject = new BehaviorSubject(null);

export const accountService = {
  apiAuthenticate,
};

// async function generateJwtToken(data) {
//   const header = {
//     alg: 'HS256',
//     typ: 'JWT',
//   };
//   // const encodedHeaders = btoa(JSON.stringify(header));

//   // const tokenPayload = {
//   //   exp: Math.round(new Date(Date.now() + 15 * 60 * 1000).getTime() / 1000),
//   //   id: data.id,
//   // };
//   // const encodedPlayload = btoa(JSON.stringify(tokenPayload));

//   // const signature = Base64.stringify(
//   //   hmacSHA256(`${encodedHeaders}.${encodedPlayload}`, 'mysecret')
//   // );

//   // const encodedSignature = signature;

//   // const jwt = `${encodedHeaders}.${encodedPlayload}.${encodedSignature}`;

//   const secret = new TextEncoder().encode('hieusen123');

//   const jwt = await new jose.SignJWT({ id: data.id })
//     .setProtectedHeader(header)
//     .setExpirationTime('2h')
//     .sign(secret);

//   return jwt;
// }

async function authenticateFacebook(accessToken: string) {
  return await axios
    .get(
      `https://graph.facebook.com/v15.0/me?access_token=${accessToken}&fields=id,name,email,picture`
    )
    .then(async (response) => {
      const { data } = response;
      // if (data.error) return { error: 401, data: data.error.message };

      return {
        ...data,
        // token: await generateJwtToken(data),
      };
    });
}

function apiAuthenticate(accessToken: string) {
  // authenticate with the api using a facebook access token,
  // on success the api returns an account object with a JWT auth token
  const account = authenticateFacebook(accessToken);
  // accountSubject.next(account);
  // startAuthenticateTimer();
  return account;
}

// const startAuthenticateTimer = () => {
//   // parse json object from base64 encoded jwt token
//   const jwtToken = JSON.parse(atob(accountSubject.value.token.split('.')[1]));

//   // set a timeout to re-authenticate with the api one minute before the token expires
//   const expires = new Date(jwtToken.exp * 1000);
//   const timeout = expires.getTime() - Date.now() - 60 * 1000;
//   const { accessToken } = window.FB.getAuthResponse();
//   setTimeout(() => apiAuthenticate(accessToken), timeout);
// };
