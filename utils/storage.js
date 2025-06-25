
export async function getStorage(keys) {
  const result = {};
  keys.forEach((key) => {
    const value = localStorage.getItem(key);
    if (value !== null) {
      try {
        result[key] = JSON.parse(value);
      } catch (e) {
        result[key] = value;
      }
    } else {
      console.log(`No value found for key: ${key}`);
    }
  });
  return result;
}

export async function setStorage(data) {
  Object.entries(data).forEach(([key, value]) => {
    localStorage.setItem(key, JSON.stringify(value));
    console.log(`Saved ${key}:`, value);
  });
}