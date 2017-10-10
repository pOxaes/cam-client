import Velocity from 'velocity-animate';
import utils from '@/animations/utils';

const selectors = {
  btnAction: '.btn--action',
  icon: '.btn--action .Icon',
};

const beforeAppear = (el) => {
  const btnAction = utils.get(selectors.btnAction, el);
  if (!btnAction) {
    return;
  }
  btnAction.style.bottom = '-200px';
};

const onAppear = (el, done) => {
  const btnAction = utils.get(selectors.btnAction, el);
  if (!btnAction) {
    done();
    return;
  }
  Velocity(btnAction, {
    bottom: 0,
  }, {
    duration: 300,
    complete: () => {
      btnAction.removeAttribute('style');
      done();
    },
  });
};

const onLeave = (el, done) => {
  const btnAction = utils.get(selectors.btnAction, el);
  if (!btnAction || btnAction.className.indexOf('btn--action--clicked') === -1) {
    done();
    return;
  }

  Velocity(btnAction, {
    scale: 1.4,
    opacity: 0,
  }, {
    duration: 300,
    complete: done,
  });
};

export default {
  beforeAppear,
  onAppear,
  onLeave,
};
