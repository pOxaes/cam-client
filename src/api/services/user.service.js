import websocketService from '@/api/services/websocket.service';
import types from '@/store/mutations-types';

const update = user =>
  websocketService.emitPromise(types.UPDATE_USER, user);

const getCurrent = () =>
  websocketService.emitPromise(types.GET_CURRENT_USER);

const getById = userId =>
  websocketService.emitPromise(types.GET_USER, userId);

const getAll = () =>
  websocketService.emitPromise(types.GET_USERS);

const create = user =>
  websocketService.emitPromise(types.CREATE_USER, user);

const remove = userId =>
  websocketService.emitPromise(types.DELETE_USER, userId);

export default {
  update,
  getAll,
  getById,
  getCurrent,
  create,
  remove,
};
