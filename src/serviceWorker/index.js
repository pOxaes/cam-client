import Promise from 'bluebird';
import subscriberService from '@/api/services/subscriber.service';

const registerServiceWorker = () => navigator.serviceWorker.register('/sw.js');

const requestNotificationPermission = () => new Promise((resolve, reject) => {
  if ('Notification' in window) {
    window.Notification.requestPermission((result) => {
      if (result === 'granted') {
        return resolve();
      }
      return reject();
    });
    return;
  }
  reject();
});

const launchSubscribe = token =>
  registerServiceWorker().then(() =>
    requestNotificationPermission().then(() =>
    navigator.serviceWorker.ready.then(swRegistration =>
      swRegistration.pushManager.subscribe({ userVisibleOnly: true }))
    .then(subscription => subscriberService.subscribe(token, subscription))));

const subscribe = (token) => {
  if ('serviceWorker' in navigator) {
    return launchSubscribe(token);
  }
  return Promise.reject();
};

export default {
  subscribe,
};
