export const getFilterParams = filters => {
  const filterParams = {};

  for (const key in filters) {
    if (filters[key]) {
      filterParams[key] = filters[key];
    }
  }

  return filterParams;
};

export const debounce = (fn, msec) => {
  let lastCall = 0;
  let lastCallTimer = 0;

  return (...args) => {
    const prevCall = lastCall;
    lastCall = Date.now();

    if (prevCall && lastCall - prevCall <= msec) {
      clearTimeout(lastCallTimer);
    }

    lastCallTimer = setTimeout(() => fn(...args), msec);
  };
};
