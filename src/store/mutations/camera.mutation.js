import types from '@/store/mutations-types';
import utils from '@/api/services/utils.service';

export default {
  [types.GET_CAMERAS](state, cameras) {
    state.securityCamera.cameras = cameras;
  },

  [types.GET_CAMERA_PARAMETERS](state, parameters) {
    state.securityCamera.cameraParameters = parameters;
  },

  [types.UPDATE_CAMERA_PARAMETERS](state, { id, updatedParameters }) {
    const camera = utils.getById(state.securityCamera.cameras, id);
    if (!camera) {
      return;
    }
    camera.parameters = updatedParameters;
  },

  [types.CREATE_CAMERA](state, response) {
    state.securityCamera.newCamera = {
      password: response.password,
      name: response.camera.name,
    };
    state.securityCamera.cameras.push(response.camera);
  },

  [types.RENEW_CAMERA_PASSWORD](state, response) {
    state.securityCamera.newCamera = {
      password: response.password,
      name: response.camera.name,
      id: response.camera._id,
    };
  },

  [types.DELETE_CAMERA](state, cameraId) {
    state.securityCamera.cameras = state.securityCamera.cameras
      .filter(camera => camera._id !== cameraId);
  },

  [types.CAMERA_STOP_WATCH](state, updatedCamera) {
    const camera = utils.getById(state.securityCamera.cameras, updatedCamera._id);
    if (!camera) {
      return;
    }
    camera.isWatching = false;
  },

  [types.UPDATE_CAMERA](state, updatedCamera) {
    utils.updateById(state.securityCamera.cameras, updatedCamera._id, {
      name: updatedCamera.name,
    });
  },

  [types.INCOMING_CAMERA_CONNECTION](state, cameraId) {
    utils.updateById(state.securityCamera.cameras, cameraId, {
      isConnected: true,
    });
  },

  [types.INCOMING_CAMERA_DISCONNECTION](state, cameraId) {
    utils.updateById(state.securityCamera.cameras, cameraId, {
      isConnected: false,
    });
  },

  [types.INCOMING_CAMERA_STOP_WATCHING](state, cameraId) {
    utils.updateById(state.securityCamera.cameras, cameraId, {
      isWatching: false,
    });
  },

  [types.INCOMING_CAMERA_WATCHING](state, cameraId) {
    utils.updateById(state.securityCamera.cameras, cameraId, {
      isWatching: true,
    });
  },
};
