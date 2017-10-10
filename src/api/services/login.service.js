import urls from 'urls'; // eslint-disable-line
import Vue from 'vue';

const login = credentials => Vue.http.post(urls.login, credentials)
  .then(res => res.body.token);

export default {
  login,
};
