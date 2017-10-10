import io from 'socket.io-client';
import Promise from 'bluebird';
import urls from 'urls';
import types from '@/store/mutations-types';

const TIMEOUT_DURATION = 3000;

let socket;

const disconnect = () => {
  socket.disconnect();
};

const trigger = (type, payload) => socket.send({
  type,
  payload,
});

const throwError = (message) => {
  const error = new Error();
  error.message = message;
  return error;
};

const attachDispatcher = (ws, store) => {
  Object.keys(types).forEach((typeKey) => {
    ws.on(types[typeKey], (payload) => {
      store.commit(types[typeKey], payload);
    });
  });
};

const emit = (command, data) => {
  socket.emit(command, data);
};

const emitPromise = (command, data) => new Promise((resolve, reject) => {
  socket.emit(command, data, (response) => {
    if (typeof response === 'object') {
      if (response.success) {
        resolve(response.data);
      } else {
        reject(throwError(typeof response.message === 'string' ? response.message : 'The request was not successful.'));
      }
    } else {
      reject(throwError('The response to your request could not be parsed.'));
    }
  });
  setTimeout(() => {
    reject(throwError('The request took too long to respond.'));
  }, TIMEOUT_DURATION);
});

const connect = (token, store) => new Promise((resolve, reject) => {
  let connected = false;
  socket = io(`${urls.websocket}?token=${token}`);
  socket.on('disconnect', () => {
    if (connected) {
      return;
    }
    reject();
  });
  socket.on('CONNECTED', () => {
    connected = true;
    resolve();
    attachDispatcher(socket, store);
  });
});

export default {
  connect,
  disconnect,
  emit,
  emitPromise,
  trigger,
};
