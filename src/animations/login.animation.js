import Velocity from 'velocity-animate';
import utils from './utils';

const selectors = {
  header: '.login__header',
  form: 'form',
  container: '.login',
};

const beforeAppear = (el) => {
  utils.get(selectors.header, el).style.opacity = 0;
  utils.get(selectors.form, el).style.opacity = 0;
};

const onAppear = (el, done) => {
  Velocity(utils.get(selectors.header, el), {
    opacity: 1,
    translateY: [0, -10],
  }, {
    delay: 300,
    duration: 1300,
  });

  Velocity(utils.get(selectors.form, el), {
    opacity: 1,
    translateY: [0, 10],
  }, {
    delay: 600,
    duration: 1300,
    complete: done,
  });
};

const beforeEnter = (el) => {
  utils.get(selectors.container).style.opacity = 0;
  beforeAppear(el);
};

const onEnter = (el, done) => {
  Velocity(utils.get(selectors.container), {
    opacity: 1,
  }, {
    delay: 300,
    duration: 300,
    complete: () => {
      onAppear(el, done);
    },
  });
};

const onLeave = (el, done) => {
  Velocity(utils.get(selectors.header, el), {
    opacity: 0,
  }, {
    delay: 300,
    duration: 300,
  });

  Velocity(utils.get(selectors.form, el), {
    opacity: 0,
  }, {
    delay: 400,
    duration: 300,
  });

  Velocity(utils.get(selectors.container), {
    opacity: 0,
  }, {
    delay: 500,
    duration: 300,
    complete: () => {
      done();
    },
  });
};

export default {
  beforeAppear,
  beforeEnter,
  onAppear,
  onEnter,
  onLeave,
};
