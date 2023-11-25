import CryptoJS from 'crypto-js';

export function encryptPassword(password: string) {
  // const aesjs = require('aes-js');
  // const pbkdf2 = require('pbkdf2');
  // var textBytes = aesjs.utils.utf8.toBytes(password);
  // var aesCtr = new aesjs.ModeOfOperation.ctr(
  //   pbkdf2.pbkdf2Sync(password, 'salt', 1, 256 / 8, 'sha512'),
  //   new aesjs.Counter(24)
  // );
  // var encryptedBytes = aesCtr.encrypt(textBytes);
  // var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
  // console.log(encryptedHex);

  var encryptedHex = CryptoJS.SHA512(password).toString();
  // console.log(encryptedHex);

  return encryptedHex;
}
