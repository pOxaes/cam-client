import urls from 'urls'; // eslint-disable-line
import moment from 'moment';
import _ from 'lodash';
import utils from '@/api/services/utils.service';
import websocketService from '@/api/services/websocket.service';
import types from '@/store/mutations-types';

const DATE_KEYS = ['start', 'end'];

const format = (movementSessionSrc) => {
  const movementSession = _.clone(movementSessionSrc);
  DATE_KEYS.forEach((key) => {
    movementSession[key] = moment(movementSession[key]);
  });
  return movementSession;
};

const sortByStart = movementSessions => movementSessions.sort(utils.sortByDateDesc('start'));

const getAll = () => websocketService.emitPromise(types.GET_MOVEMENT_SESSIONS)
  .then(movementSessions => sortByStart(movementSessions.map(format)));

const getById = id => websocketService.emitPromise(types.GET_MOVEMENT_SESSION, id);

const deleteById = id => websocketService.emitPromise(types.DELETE_MOVEMENT_SESSION, id);

const sortImages = (movementSession) => {
  movementSession.images.forEach((image) => {
    image.date = utils.fromJsDateToMoment(image.date);
  });
  movementSession.images.sort(utils.sortByDateDesc('date'));
};

export default {
  format,
  getAll,
  getById,
  deleteById,
  sortByStart,
  sortImages,
};
