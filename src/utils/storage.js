const Prefix = 'profile-app-';

const set = (key, value) => {
  localStorage.setItem(`${Prefix}${key}`, JSON.stringify(value));
};

const get = (key) => {
  const str = localStorage.getItem(`${Prefix}${key}`);

  try {
    const result = JSON.parse(str);

    return result;
  } catch (error) {
    console.error(error);
    return str;
  }
};

export default {
  set,
  get,
};
