export function setWithExpiry(key: string, value: any, ttl: number) {
  const now = new Date();

  // `item` is an object which contains the original value
  // as well as the time when it's supposed to expire

  const item = {
    value: value,
    // expiry: now.getTime() + Math.round(ttl * 60 * 60 * 24) * 1000,
    expiry: now.getTime() + ttl,
  };

  if (process.client) {
    window.localStorage.setItem(key, JSON.stringify(item));
  }
}

export function getWithExpiry(key: any) {
  let itemJson = null;
  if (process.client) {
    itemJson = window.localStorage.getItem(key);
  }

  // if the item doesn't exist, return null
  if (!itemJson) {
    return null;
  }

  const item = JSON.parse(itemJson);
  const date = new Date();

  // compare the expiry time of the item with the current time
  if (item?.expiry) {
    if (date.getTime() >= item.expiry) {
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

export function getWithExpiry_ExpRemain(key: any) {
  let itemJson = null;
  if (process.client) {
    itemJson = window.localStorage.getItem(key);
  }

  // if the item doesn't exist, return null
  if (!itemJson) {
    return null;
  }

  const item = JSON.parse(itemJson);
  const date = new Date();

  // compare the expiry time of the item with the current time
  if (item?.expiry) {
    const nowTime = date.getTime();

    if (nowTime >= item.expiry) {
      //   if (now.getDate() > item.expiry) {

      // If the item is expired, delete the item from storage
      // else return null

      if (process.client) {
        window.localStorage.removeItem(key);
      }
      return null;
    } else {
      item.value.exp_after = (item.expiry - nowTime) / 1000;

      if (process.client) {
        window.localStorage.setItem(key, JSON.stringify(item));
      }
    }
  }

  return item.value;
}

export function useLocalStorage(initialVal: any, key: string) {
  const val = ref<any>(initialVal);
  let storageVal = null;

  if (process.client) {
    storageVal = window.localStorage.getItem(key);
  }

  if (storageVal) {
    val.value = JSON.parse(storageVal);
  }

  watch(
    () => val,
    (newVal) => {
      window.localStorage.setItem(key, JSON.stringify(newVal));
    },
    { immediate: true, deep: true }
  );

  return val;
}
