import Vue from 'vue';
import utils from '@/api/services/utils.service';

export default Vue.filter('toDate', (date) => {
  if (typeof date === 'string') {
    date = utils.fromJsDateToMoment(date);
  }
  return date.format('MM/DD/YYYY  hh:mm:ss');
});
