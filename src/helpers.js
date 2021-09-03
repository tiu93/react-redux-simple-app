export const setToLocalStorage = (name, data) => {
  window.localStorage.setItem(name, JSON.stringify(data));
};

export const clearLocalStorage = () => {
  window.localStorage.clear();
};

export const getFromLocalStorage = (name) => {
  const value = window.localStorage.getItem(name);
  if (value !== null) {
    return JSON.parse(value);
  }
};
