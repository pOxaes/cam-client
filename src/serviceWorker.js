self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', (event) => {
  const payload = event.data.json();
  event.waitUntil(self.registration.showNotification(payload.title, payload.content));
});

const subscriptionFetchOptions = subscription => ({
  method: 'post',
  headers: {
    'Content-type': 'application/json',
  },
  body: JSON.stringify({
    endpoint: subscription.endpoint,
  }),
});

const subscribe = () => self.registration.pushManager.subscribe({ userVisibleOnly: true })
  .then(subscription => fetch('register', subscriptionFetchOptions(subscription)));

self.addEventListener('pushsubscriptionchange', (event) => {
  event.waitUntil(subscribe);
});
