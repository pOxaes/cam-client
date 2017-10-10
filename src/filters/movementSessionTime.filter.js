import Vue from 'vue';
import utils from '@/api/services/utils.service';

export default Vue.filter('movementSessionTime', (date) => {
  if (typeof date === 'string') {
    date = utils.fromJsDateToMoment(date);
  }
  return date.format('hh:mm');
});
