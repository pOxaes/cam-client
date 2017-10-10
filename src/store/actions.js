import VueCookie from 'vue-cookie';
import router from '@/router';
import movementSessionService from '@/api/services/movementSession.service';
import loginService from '@/api/services/login.service';
import cameraService from '@/api/services/camera.service';
import userService from '@/api/services/user.service';
import websocketService from '@/api/services/websocket.service';
import types from '@/store/mutations-types';
import notificationsConfig from '@/api/constants/notificationsConfig.constant';
import swService from '@/serviceWorker/index';

const updateMovementSessionsFilter = ({ commit }, filter) => {
  commit(types.UPDATE_MOVEMENT_SESSIONS_FILTER, filter);
};

const deleteSessionAndCommitLogout = (commit) => {
  VueCookie.delete('token');
  commit(types.LOGOUT);
};

const onError = (commit, e) => {
  if (e.status === 403) {
    deleteSessionAndCommitLogout(commit);
    router.push({ name: 'Login' });
  }
  return Promise.reject(e || 'error not defined');
};

const getCameras = ({ commit }) => cameraService.getAll()
  .then((cameras) => {
    commit(types.GET_CAMERAS, cameras);
  })
  .catch(onError.bind(null, commit));

const getCameraParametersById = ({ commit }, id) => cameraService.getParametersById(id)
  .then((parameters) => {
    commit(types.GET_CAMERA_PARAMETERS, parameters);
  })
  .catch(onError.bind(null, commit));

const updateCameraParameters = ({ commit }, { id, parameters }) =>
  cameraService.updateParameters(id, parameters)
  .then((updatedParameters) => {
    commit(types.UPDATE_CAMERA_PARAMETERS, { id, updatedParameters });
  })
  .catch(onError.bind(null, commit));

const deleteCamera = ({ commit }, id) => cameraService.deleteById(id)
  .then(() => {
    commit(types.DELETE_CAMERA, id);
  })
  .catch(onError.bind(null, commit));

const createCamera = ({ commit }, name) => cameraService.insert(name)
  .then((res) => {
    commit(types.CREATE_CAMERA, res);
  })
  .catch(onError.bind(null, commit));

const renewCameraPassword = ({ commit }, id) => cameraService.renewPassword(id)
  .then((res) => {
    commit(types.RENEW_CAMERA_PASSWORD, res);
  })
  .catch(onError.bind(null, commit));

const updateCamera = ({ commit }, camera) => cameraService.update(camera)
  .then((updatedCamera) => {
    commit(types.UPDATE_CAMERA, updatedCamera);
  })
  .catch(onError.bind(null, commit));

const cameraStartWatch = ({ commit }, id) => cameraService.setWatch(id, true);

const cameraStopWatch = ({ commit }, id) => cameraService.setWatch(id, false);

const getMovementSessions = ({ commit }) => movementSessionService.getAll()
  .then((movementSessions) => {
    commit(types.GET_MOVEMENT_SESSIONS, movementSessions);
  })
  .catch(onError.bind(null, commit));

const getMovementSessionById = ({ commit }, id) => movementSessionService.getById(id)
  .then((movementSession) => {
    commit(types.GET_MOVEMENT_SESSION, movementSession);
  })
  .catch(onError.bind(null, commit));

const deleteMovementSession = ({ commit }, id) => movementSessionService.deleteById(id)
  .then(() => {
    commit(types.DELETE_MOVEMENT_SESSION, id);
  })
  .catch(onError.bind(null, commit));

const login = ({ commit }, credentials) =>
  loginService.login(credentials)
    .then((token) => {
      commit(types.LOGIN);
      return token;
    });

const logout = ({ commit }) => deleteSessionAndCommitLogout(commit);

const disconnect = ({ commit }) => {
  websocketService.disconnect();
  commit(types.DISCONNECT);
};

const createNotification = ({ commit }, notification) => {
  const notificationConfig = notificationsConfig[notification.type];
  const newNotification = {
    ...notification,
    id: new Date().getTime(),
  };
  commit(types.CREATE_NOTIFICATION, newNotification);
  setTimeout(() => {
    commit(types.DELETE_NOTIFICATION, newNotification.id);
  }, notificationConfig.duration);
};

const connect = ({ commit }, { token, store }) => websocketService.connect(token, store)
  .then(() => {
    VueCookie.set('token', token);
    commit(types.CONNECT);
    swService.subscribe(token)
    .catch((message) => {
      createNotification({ commit }, {
        message,
        type: 'error',
      });
    });
    return Promise.resolve();
  })
  .catch(() => {
    commit(types.DISCONNECT);
    deleteSessionAndCommitLogout(commit);
  });

const deleteNotification = ({ commit }, notificationId) => {
  commit(types.DELETE_NOTIFICATION, notificationId);
};

const updateUser = ({ commit }, user) =>
  userService.update(user)
  .then((updatedUser) => {
    commit(types.UPDATE_USER, updatedUser);
  })
  .catch(onError.bind(null, commit));

const getCurrentUser = ({ commit }) =>
  userService.getCurrent()
  .then((user) => {
    commit(types.SET_CURRENT_USER, user);
  })
  .catch(onError.bind(null, commit));

const getUser = ({ commit }, id) =>
  userService.getById(id)
  .then((user) => {
    commit(types.SET_USER, user);
  })
  .catch(onError.bind(null, commit));

const getUsers = ({ commit }) =>
  userService.getAll()
  .then((users) => {
    commit(types.SET_USERS, users);
  })
  .catch(onError.bind(null, commit));

const createUser = ({ commit }, user) =>
  userService.create(user)
  .then((newUser) => {
    commit(types.CREATE_USER, newUser);
  })
  .catch(onError.bind(null, commit));

const deleteUser = ({ commit }, userId) =>
  userService.remove(userId)
  .then(() => {
    commit(types.DELETE_USER, userId);
  })
  .catch(onError.bind(null, commit));

export default {
  cameraStartWatch,
  cameraStopWatch,
  connect,
  createCamera,
  createNotification,
  createUser,
  deleteCamera,
  deleteMovementSession,
  deleteNotification,
  deleteUser,
  disconnect,
  getCameras,
  getCameraParametersById,
  getMovementSessionById,
  getMovementSessions,
  getCurrentUser,
  getUser,
  getUsers,
  login,
  logout,
  renewCameraPassword,
  updateCamera,
  updateCameraParameters,
  updateMovementSessionsFilter,
  updateUser,
};
