import types from '@/store/mutations-types';
import utils from '@/api/services/utils.service';
import movementSessionMutations from '@/store/mutations/movementSession.mutation';
import cameraMutations from '@/store/mutations/camera.mutation';

const appMutations = {
  [types.CONNECT](state) {
    state.app.isConnected = true;
  },

  [types.DISCONNECT](state) {
    state.app.isConnected = false;
  },

  [types.LOGIN](state) {
    state.app.hasToken = true;
  },

  [types.LOGOUT](state) {
    state.app.hasToken = false;
  },

  [types.CREATE_NOTIFICATION](state, notification) {
    state.app.notification = notification;
  },

  [types.DELETE_NOTIFICATION](state, notificationId) {
    if (state.app.notification.id === notificationId) {
      state.app.notification = undefined;
    }
  },

  [types.TOGGLE_NAV](state, showNav) {
    state.app.showNav = typeof showNav !== 'undefined' ? showNav : !state.app.showNav;
  },

  [types.SET_USERS](state, users) {
    state.users = users;
  },

  [types.SET_USER](state, user) {
    state.user = user;
  },

  [types.SET_CURRENT_USER](state, user) {
    state.currentUser = user;
  },

  [types.UPDATE_USER](state, user) {
    utils.updateById(state.users, user._id, user);
    if (state.currentUser && state.currentUser._id === user._id) {
      state.currentUser = user;
    }
  },

  [types.CREATE_USER](state, user) {
    state.users.push(user);
  },

  [types.DELETE_USER](state, userId) {
    state.users = state.users
      .filter(user => user._id !== userId);
  },
};

export default {
  ...appMutations,
  ...movementSessionMutations,
  ...cameraMutations,
};
