import Velocity from 'velocity-animate';

const selectors = {
  icons: '.btn--icon',
  menu: '.header-banner__menu',
  notification: '.header-banner__notification',
  title: '.header-banner__title',
};

const beforeEnter = (element) => {
  Velocity(element.querySelectorAll(selectors.icons), {
    opacity: 0,
    translateY: '-100%',
  }, {
    duration: 1,
  });

  Velocity(element, {
    translateY: '-110%',
  }, {
    duration: 1,
  });
};

const onEnter = (element, done) => {
  Velocity(element, {
    translateY: 0,
  }, {
    duration: 300,
  });

  Velocity(element.querySelectorAll(selectors.icons), {
    opacity: 1,
    translateY: 0,
  }, {
    delay: 150,
    duration: 300,
    complete: done,
  });
};

const onLeave = (element, done) => {
  Velocity(element, {
    translateY: '-110%',
  }, {
    duration: 300,
    complete: done,
  });
};

const titleBeforeEnter = (el) => {
  Velocity(el, {
    opacity: 0,
    translateX: '100px',
  }, {
    duration: 1,
  });
};

const titleOnEnter = (el, done) => {
  Velocity(el, {
    opacity: 1,
    translateX: 0,
  }, {
    delay: 300,
    duration: 150,
    complete: done,
  });
};

export default {
  beforeEnter,
  onEnter,
  onLeave,
  titleBeforeEnter,
  titleOnEnter,
};
