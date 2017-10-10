import Promise from 'bluebird';
import Login from '@/animations/login.animation';
import AdminUsers from '@/animations/admin/users.animation';
import ProfileComponents from '@/animations/profile/profileComponents.animation';
import SecurityCameraCameras from '@/animations/securityCamera/cameras.animation';
import SimpleSpinnerView from '@/animations/simpleSpinnerView.animation';

const viewsAnimations = {
  Login,
  Admin_Users: AdminUsers,
  Profile_Components: ProfileComponents,
  SecurityCamera_Cameras: SecurityCameraCameras,
  SecurityCamera_MovementSessions: SimpleSpinnerView,
  SecurityCamera_MovementSession: SimpleSpinnerView,
};

const has = (route, stepName) =>
  viewsAnimations[route] && viewsAnimations[route][stepName];

const canAnimate = (route, stepName) =>
  has(route, stepName);

const asyncAnimate = stepName => (route, el) => {
  if (canAnimate(route, stepName)) {
    return new Promise((resolve) => {
      viewsAnimations[route][stepName](el, resolve);
    });
  }
  return Promise.resolve();
};

const beforeAppear = (route, el) => {
  if (canAnimate(route, 'beforeAppear')) {
    viewsAnimations[route].beforeAppear(el);
  }
};

const beforeEnter = (route, el) => {
  if (canAnimate(route, 'beforeEnter')) {
    viewsAnimations[route].beforeEnter(el);
  }
};

const beforeLeave = (route, el) => {
  if (canAnimate(route, 'beforeLeave')) {
    viewsAnimations[route].beforeLeave(el);
  }
};

const onAppear = asyncAnimate('onAppear');

const onEnter = asyncAnimate('onEnter');

const onLeave = asyncAnimate('onLeave');

const afterAppear = (route, el) => {
  if (canAnimate(route, 'afterAppear')) {
    viewsAnimations[route].afterAppear(el);
  }
};

const afterEnter = (route, el) => {
  if (canAnimate(route, 'afterEnter')) {
    viewsAnimations[route].afterEnter(el);
  }
};

const afterLeave = (route, el) => {
  if (canAnimate(route, 'afterLeave')) {
    viewsAnimations[route].afterLeave(el);
  }
};

export default {
  beforeAppear,
  beforeEnter,
  beforeLeave,
  onAppear,
  onEnter,
  onLeave,
  afterAppear,
  afterEnter,
  afterLeave,
};
