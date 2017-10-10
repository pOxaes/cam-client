import spinnerAnimation from '@/animations/spinner.animation';

const beforeAppear = (el) => {
  spinnerAnimation.beforeAppear(el);
};

const onAppear = (el, done) => {
  spinnerAnimation.onAppear(el, done);
};

const beforeEnter = (el) => {
  beforeAppear(el);
};

const onEnter = (el, done) => {
  onAppear(el, done);
};

export default {
  beforeAppear,
  onAppear,
  beforeEnter,
  onEnter,
};
