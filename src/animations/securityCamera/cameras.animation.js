import btnActionAnimation from '@/animations/btnAction.animation';
import spinnerAnimation from '@/animations/spinner.animation';

const beforeAppear = (el) => {
  spinnerAnimation.beforeAppear(el);
  btnActionAnimation.beforeAppear(el);
};

const onAppear = (el, done) => {
  spinnerAnimation.onAppear(el);
  btnActionAnimation.onAppear(el, done);
};

const beforeEnter = (el) => {
  beforeAppear(el);
};

const onEnter = (el, done) => {
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
