import urls from 'urls'; // eslint-disable-line
import Vue from 'vue';

const subscribe = (token, subscription) =>
  Vue.http.post(`${urls.subscription}?token=${token}`, subscription);

export default {
  subscribe,
};
