import Vue from 'vue';
import moment from 'moment';
import utils from '@/api/services/utils.service';

export default Vue.filter('movementSessionDuration', (movementSession) => {
  const diffInMs = moment(movementSession.end)
    .diff(utils.fromJsDateToMoment(movementSession.start));

  const durationInSeconds = Math.floor(diffInMs / 1000);
  if (durationInSeconds < 60) {
    return `${durationInSeconds} seconds`;
  }
  const durationInMinutes = Math.floor(durationInSeconds / 60);
  if (durationInMinutes < 60) {
    return `${durationInMinutes} minutes`;
  }
  const durationInHours = Math.floor(durationInSeconds / 60);
  return `${durationInHours} hours ${durationInMinutes % 60} minutes`;
});
