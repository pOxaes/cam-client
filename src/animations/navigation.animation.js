import Velocity from 'velocity-animate';
import utils from './utils';

const selectors = {
  fadeInEls: '.nav__link, .nav__container__title',
  container: '.nav__container',
  activeLink: '.router-link-active',
};

const beforeEnter = (element) => {
  utils.forEachEl(element, selectors.fadeInEls, (el) => {
    el.style.opacity = 0;
  });
};

const onEnter = (element, done) => {
  Velocity(utils.get(selectors.container, element), {
    translateX: [0, '-100%'],
  }, {
    duration: 300,
  });
  utils.forEachEl(element, selectors.fadeInEls, (el, index, els) => {
    const options = {
      duration: 300,
      delay: 10 + (index * 80),
    };
    if (index === els.length - 1) {
      options.complete = done;
    }
    Velocity(el, {
      opacity: 1,
    }, options);
  });
};

const onLeave = (element, done) => {
  utils.forEachEl(element, selectors.fadeInEls, (el) => {
    if (el.querySelectorAll(selectors.activeLink).length > 0) {
      return;
    }
    Velocity(el, {
      translateX: '-100%',
      opacity: 0,
    }, {
      delay: Math.random() * 100,
      duration: 300,
    });
  });

  Velocity(utils.get(selectors.container, element), {
    translateX: '-100%',
  }, {
    delay: 100,
    duration: 300,
    complete: done,
  });
};

export default {
  beforeEnter,
  onEnter,
  onLeave,
};
