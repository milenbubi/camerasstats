const localStorageKey = {
  themeMode: "themeMode"
};


type LoaclStorageKeys = keyof typeof localStorageKey;


function set(key: LoaclStorageKeys, data: any, shouldStringifyData?: boolean) {
  try {
    if (shouldStringifyData) {
      localStorage.setItem(localStorageKey[key], JSON.stringify(data));
    }
    else {
      localStorage.setItem(localStorageKey[key], data);
    }
  }
  catch (error) { }
}


function get(key: LoaclStorageKeys) {
  const storageData = localStorage.getItem(localStorageKey[key]);
  return storageData || "";
}


function getParsed<T = any>(key: LoaclStorageKeys) {
  const storageData = localStorage.getItem(localStorageKey[key]) || "";

  try {
    const data: T = JSON.parse(storageData);
    return data;
  }
  catch (error) {
    return null;
  }
}


function remove(key: LoaclStorageKeys) {
  localStorage.removeItem(localStorageKey[key]);
}



const LS = {
  set,
  get,
  remove,
  getParsed
};


export default LS;