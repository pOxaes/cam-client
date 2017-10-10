import Velocity from 'velocity-animate';
import utils from '@/animations/utils';

const selectors = {
  spinner: '.spinner',
};

const foo = () => {};

const beforeAppear = (el) => {
  const spinner = utils.get(selectors.spinner, el);
  if (!spinner) {
    return;
  }
  spinner.style.marginLeft = '100vw';
};

const onAppear = (el, done) => {
  const spinner = utils.get(selectors.spinner, el);
  if (!spinner) {
    return;
  }
  Velocity(spinner, {
    marginLeft: 0,
  }, {
    delay: 300,
    duration: 300,
    complete: done || foo,
  });
};

export default {
  beforeAppear,
  onAppear,
};
