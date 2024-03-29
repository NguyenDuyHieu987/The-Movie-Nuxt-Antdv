function setWithExpiry(key: string, value: any, ttl: number) {
  const now = new Date();

  const item = {
    value: value,
    expiry: now.getTime() + ttl * 3600 * 1000,
    // expiry: now.getDate() + ttl,
  };

  if (process.client) {
    window.localStorage.setItem(key, JSON.stringify(item));
  }
}

function getWithExpiry(key: string) {
  let itemJson = null;
  if (process.client) {
    itemJson = window.localStorage.getItem(key);
  }

  if (!itemJson) {
    return null;
  }

  const item = JSON.parse(itemJson);
  const date = new Date();

  if (item?.expiry) {
    if (date.getTime() >= item.expiry) {
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

  if (!itemJson) {
    return null;
  }

  const item = JSON.parse(itemJson);
  const date = new Date();

  if (item?.expiry) {
    const nowTime = date.getTime();

    if (nowTime >= item.expiry) {
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

export const customLocalStorage = () => {
  return {
    setWithExpiry,
    getWithExpiry,
    getWithExpiry_ExpRemain,
  };
};
