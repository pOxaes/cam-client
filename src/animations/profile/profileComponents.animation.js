import Velocity from 'velocity-animate';
import utils from '@/animations/utils';
import spinnerAnimation from '@/animations/spinner.animation';

const selectors = {
  extraActionsContainer: '.extra-action-container',
};

const beforeAppear = (el) => {
  spinnerAnimation.beforeAppear(el);
  Velocity(utils.get(selectors.extraActionsContainer, el), {
    translateY: '-200%',
  }, {
    duration: 0,
  });
};

const onAppear = (el, done) => {
  spinnerAnimation.onAppear(el);
  Velocity(utils.get(selectors.extraActionsContainer, el), {
    translateY: 0,
  }, {
    delay: 300,
    duration: 300,
    complete: done,
  });
};

export default {
  beforeAppear,
  onAppear,
  beforeEnter: beforeAppear,
  onEnter: onAppear,
};
