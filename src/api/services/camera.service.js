import urls from 'urls'; // eslint-disable-line
import websocketService from '@/api/services/websocket.service';
import types from '@/store/mutations-types';

const OFFLINE = 'OFFLINE';
const WATCHING = 'WATCHING';
const ONLINE = 'ONLINE';

const statuses = {
  OFFLINE,
  WATCHING,
  ONLINE,
};

const getAll = () => websocketService.emitPromise(types.GET_CAMERAS);

const getParametersById = id => websocketService.emitPromise(types.GET_CAMERA_PARAMETERS, id);

const updateParameters = (id, parameters) =>
  websocketService.emitPromise(types.UPDATE_CAMERA_PARAMETERS, { id, parameters });

const deleteById = id => websocketService.emitPromise(types.DELETE_CAMERA, id);

const insert = name => websocketService.emitPromise(types.CREATE_CAMERA, name);

const update = camera => websocketService.emitPromise(types.UPDATE_CAMERA, camera);

const renewPassword = id => websocketService.emitPromise(types.RENEW_CAMERA_PASSWORD, id);

const ping = id => websocketService.emitPromise(types.PING_CAMERA, id);

const getStatus = (camera) => {
  if (!camera.isConnected) {
    return statuses.OFFLINE;
  }
  if (camera.isWatching) {
    return statuses.WATCHING;
  }
  return statuses.ONLINE;
};

const setWatch = (id, watch) => {
  const action = watch ? types.CAMERA_START_WATCH : types.CAMERA_STOP_WATCH;
  return websocketService.emit(action, id);
};

export default {
  deleteById,
  getAll,
  getParametersById,
  getStatus,
  insert,
  ping,
  renewPassword,
  setWatch,
  statuses,
  update,
  updateParameters,
};
