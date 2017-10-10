const forEachEl = (el, selector, callback) => {
  const els = el.querySelectorAll(selector);
  for (let i = 0; i < els.length; i += 1) {
    callback(els[i], i, els);
  }
};

const get = (selector, el) => {
  const container = el || document;
  return container.querySelectorAll(selector)[0];
};

const setStyle = (el, styles) => {
  Object.keys(styles).forEach((styleKey) => {
    el.style[styleKey] = styles[styleKey];
  });
};

export default {
  forEachEl,
  get,
  setStyle,
};
