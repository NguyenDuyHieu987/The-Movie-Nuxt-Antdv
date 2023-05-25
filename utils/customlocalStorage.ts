export function setWithExpiry(key: string, value: any, ttl: number) {
  const now = new Date();

  // `item` is an object which contains the original value
  // as well as the time when it's supposed to expire
  const item = {
    value: value,
    expiry: now.getTime() + ttl * 86400000,
    // expiry: now.getDate() + ttl,
  };
  if (process.client) {
    window.localStorage.setItem(key, JSON.stringify(item));
  }
}

export function getWithExpiry(key: any) {
  let itemStr = null;
  if (process.client) {
    itemStr = window.localStorage.getItem(key);
  }

  // if the item doesn't exist, return null
  if (!itemStr) {
    return null;
  }

  const item = JSON.parse(itemStr);
  const now = new Date();

  // compare the expiry time of the item with the current time
  if (item?.expiry) {
    if (now.getTime() > item.expiry) {
      //   if (now.getDate() > item.expiry) {

      // If the item is expired, delete the item from storage
      // else return null

      if (process.client) {
        window.localStorage.removeItem(key);
      }
      return null;
    }
  }
  return item.value;
}
