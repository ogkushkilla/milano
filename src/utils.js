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

export const isNumber = n => !isNaN(parseInt(n) && isFinite(n));

export const adjustElementPosititon = (element, count = 0) => {
  const rect = element.getBoundingClientRect();
  const viewportWidth = window.innerWidth;

  if (rect.left < 0) {
    element.style.cssText = `
      left: 0;
      right: auto;
      transform: translateX(0);
    `;
  } else if (rect.right > viewportWidth) {
    element.style.cssText = `
      left: auto;
      right: 0;
      transform: translateX(0);
    `;
  } else {
    element.style.cssText = `
      left: 50%;
      right: auto;
      transform: translateX(-50%);
    `;
  }

  const postRect = element.getBoundingClientRect();

  if ((postRect.left < 0 || postRect.right > viewportWidth) && count > 3) {
    adjustElementPosititon(element, count++);
  }
};
