import Promise from 'bluebird';
import Velocity from 'velocity-animate';
import utils from './utils';

const transitionDuration = 300;

const selectors = {
  nav: '#app > .nav',
};

const hasNav = () => !!utils.get(selectors.nav);

const beforeEnter = (el) => {
  utils.setStyle(el, {
    position: 'absolute',
    left: '100%',
    width: '100vw',
  });
};

const onEnter = el => new Promise((resolve) => {
  Velocity(el, {
    left: 0,
  }, {
    delay: hasNav() ? 300 : 0,
    duration: transitionDuration,
    complete: resolve,
  });
});

const afterEnter = (el) => {
  el.removeAttribute('style');
};

const beforeLeave = (el) => {
  utils.setStyle(el, {
    position: 'absolute',
    right: 0,
    width: '100vw',
  });
};

const onLeave = el => new Promise((resolve) => {
  Velocity(el, {
    right: '100%',
  }, {
    delay: hasNav() ? 300 : 0,
    duration: transitionDuration,
    complete: resolve,
  });
});

export default {
  beforeEnter,
  beforeLeave,
  onEnter,
  onLeave,
  afterEnter,
};
