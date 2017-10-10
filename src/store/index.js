import VueCookie from 'vue-cookie';
import mutations from './mutations/index';
import actions from './actions';

const state = {
  app: {
    hasToken: !!VueCookie.get('token'),
    isConnected: false,
    notification: undefined,
    showNav: false,
  },

  currentUser: {},
  users: [],
  user: {},

  securityCamera: {
    movementSession: {},
    movementSessions: [],
    movementSessionsFilters: {
      camera: undefined,
    },
    newCamera: undefined,
    newCameraPassword: undefined,
    cameras: [],
    cameraParameters: {},
  },
};

const store = {
  state,
  mutations: {
    ...mutations,
  },
  actions: {
    ...actions,
  },
};

export default store;
