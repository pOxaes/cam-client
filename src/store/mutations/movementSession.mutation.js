import _ from 'lodash';
import types from '@/store/mutations-types';
import utils from '@/api/services/utils.service';
import movementSessionService from '@/api/services/movementSession.service';

export default {
  [types.UPDATE_MOVEMENT_SESSIONS_FILTER](state, filter) {
    state.securityCamera.movementSessionsFilters[filter.key] = filter.value;
  },

  [types.GET_MOVEMENT_SESSIONS](state, movementSessions) {
    state.securityCamera.movementSessions = movementSessions;
  },

  [types.GET_MOVEMENT_SESSION](state, movementSession) {
    movementSessionService.sortImages(movementSession);
    state.securityCamera.movementSession = movementSession;
  },

  [types.DELETE_MOVEMENT_SESSION](state, deletedMovementSessionId) {
    state.securityCamera.movementSessions = state.securityCamera.movementSessions
      .filter(movementSession => movementSession._id !== deletedMovementSessionId);
  },

  [types.INCOMING_MOVEMENT_SESSION_CREATION](state, movementSession) {
    const newMovementSessions = _.clone(state.securityCamera.movementSessions);
    newMovementSessions.push(movementSessionService.format(movementSession));
    state.securityCamera.movementSessions = movementSessionService.sortByStart(newMovementSessions);
  },

  [types.INCOMING_MOVEMENT_SESSION_UPDATE](state, movementSession) {
    const updateData = {
      end: movementSession.end,
      images: movementSession.images,
    };
    utils.updateById(state.securityCamera.movementSessions, movementSession._id, updateData);

    if (state.securityCamera.movementSession._id === movementSession._id) {
      utils.updateObj(state.securityCamera.movementSession, updateData);
      movementSessionService.sortImages(state.securityCamera.movementSession);
    }
  },
};
