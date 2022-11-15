export const generateUUID = () => {
  return crypto.randomUUID();
};

export const getObjFromLocalStorage = (key) => {
  const item = localStorage.getItem(key);

  if (item) {
    return JSON.parse(item);
  }

  return null;
};

export const setObjToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const generateOptionsFromList = (list) => {
  return list.map((v) => ({ label: v, value: v }));
};
