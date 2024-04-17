type value = string | number | object | Array<unknown>;

export const setLocalItem = (key: string, value: value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalItem = (key: string) => {
  const item = localStorage.getItem(key);
  if (item !== null) {
    return JSON.parse(item);
  }
  return null;
};

export const setSessionItem = (key: string, value: value) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

export const getSessionItem = (key: string) => {
  const item = sessionStorage.getItem(key);
  if (item !== null) {
    return JSON.parse(item);
  }
  return null;
};
