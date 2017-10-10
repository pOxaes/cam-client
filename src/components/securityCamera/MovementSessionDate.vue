<template>
  <div class="movement-session-date">
    <span class="movement-session-date__day">{{formattedDate.day}}</span>
    <span class="movement-session-date__month">{{formattedDate.month}}</span>
    <span class="movement-session-date__year">{{formattedDate.year}}</span>
  </div>
</template>

<script>
  import moment from 'moment';

  export default {
    name: 'MovementSessionDate',
    props: ['date'],
    computed: {
      formattedDate() {
        const date = moment(this.date);
        return {
          day: date.format('DD'),
          month: date.format('MMMM'),
          year: date.format('YYYY'),
        };
      },
    },
  };
</script>

<style lang="scss">
  @import "../../styles/variables.scss";

  .movement-session-date {
    position: relative;
    font-size: 1.8rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 6rem + $u-medium + $u-small;

    &__day {
      position: absolute;
      left: $u-medium;
      top: 50%;
      transform: translateY(-50%);
      color: $color-primary;
      font-size: 5rem;
    }

    &__month {
      font-weight: 600;
      margin-bottom: $u-tiny;
      color: $color-text-light;
    }

    &__year {
      font-weight: 300;
      color: $color-text-light;
    }
  }
</style>
