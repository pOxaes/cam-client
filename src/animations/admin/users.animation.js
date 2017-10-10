import Velocity from 'velocity-animate';
import utils from '@/animations/utils';
import btnActionAnimation from '@/animations/btnAction.animation';
import spinnerAnimation from '@/animations/spinner.animation';

const selectors = {
  users: '.users',
};

const beforeAppear = (el) => {
  spinnerAnimation.beforeAppear(el);
  btnActionAnimation.beforeAppear(el);
};

const onAppear = (el, done) => {
  spinnerAnimation.onAppear(el);
  btnActionAnimation.onAppear(el, done);
};

const beforeEnter = (el) => {
  const width = screen.width;
  Velocity(utils.get(selectors.users, el), {
    marginLeft: width,
  }, {
    duration: 0,
  });
  beforeAppear(el);
};

const onEnter = (el, done) => {
  Velocity(utils.get(selectors.users, el), {
    marginLeft: 0,
  }, {
    duration: 300,
  });
  onAppear(el, done);
};

const onLeave = (el, done) => {
  done();
  btnActionAnimation.onLeave(el);
};

export default {
  beforeAppear,
  onAppear,
  beforeEnter,
  onEnter,
  onLeave,
};
