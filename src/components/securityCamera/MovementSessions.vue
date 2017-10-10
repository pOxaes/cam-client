<template>
  <LoadingSlot :loading="fetching" class="movement-sessions">
    <filters :movementSessions="movementSessions" v-if="movementSessions && movementSessions.length > 1"/>
    <div v-for="day in days">
      <MovementSessionDate :date="movementSessionsByDay[day].date"/>
      <movementSessionItem :movementSession="movementSession" v-for="movementSession in movementSessionsByDay[day].movementSessions" :key="movementSession.name"/>
    </div>
  </LoadingSlot>
</template>

<script>
  import filtersService from '@/api/services/filters.service';
  import MovementSessionItem from '@/components/securityCamera/MovementSessionItem';
  import MovementSessionDate from '@/components/securityCamera/MovementSessionDate';
  import Filters from '@/components/securityCamera/Filters';
  import LoadingSlot from '@/components/common/LoadingSlot';

  export default {
    name: 'MovementSessions',
    computed: {
      movementSessions() {
        this.updateList();
        return this.$store.state.securityCamera.movementSessions;
      },
      movementSessionsByDay() {
        return this.filteredMovementSessions.reduce((acc, movementSession) => {
          const day = movementSession.start.format('YYYYMMDD');
          if (!acc[day]) {
            acc[day] = {
              movementSessions: [],
              date: movementSession.start,
            };
          }
          acc[day].movementSessions.push(movementSession);
          return acc;
        }, {});
      },
      days() {
        return Object.keys(this.movementSessionsByDay).sort().reverse();
      },
      movementSessionsFilters() {
        this.updateList();
        return this.$store.state.securityCamera.movementSessionsFilters;
      },
    },
    data() {
      return {
        fetching: true,
        filteredMovementSessions: [],
      };
    },
    components: {
      Filters,
      MovementSessionItem,
      MovementSessionDate,
      LoadingSlot,
    },
    methods: {
      updateList() {
        this.filteredMovementSessions = filtersService
          .filter(this.$store.state.securityCamera.movementSessions,
            this.$store.state.securityCamera.movementSessionsFilters);
      },
    },
    created() {
      this.fetching = !this.$store.state.securityCamera.movementSessions.length;
      this.$store.dispatch('getMovementSessions')
      .finally(() => {
        this.fetching = false;
      });
    },
  };
</script>

<style lang="scss">
  @import "../../styles/variables.scss";

  .movement-sessions {
    .movement-session-date {
      margin: $u-large 0 $u-medium;
    }
  }
</style>
