<template>
  <div class="movement-session-filters">

    <Card>
      <!-- <p>movementSessionFilters: {{movementSessionFilters}}</p> -->
      <div
        v-for="filter in computedFilters"
        :key="filter.key"
        class="field">
        <!-- <p>{{filter.key}} {{filter}}</p> -->
        <UnderlinedInputWrapper
          v-if="filter.type === 'list'"
          :model="movementSessionFilters[filter.key]"
          :label="filter.label">
          <CustomSelect
            :options="filter.values"
            v-model="activeFilters[filter.key]"
            v-on:input="updateActiveFilters(filter.key)"/>
        </UnderlinedInputWrapper>

      </div>
    </Card>
  </div>
</template>

<script>
import filtersService from '@/api/services/filters.service';
import Card from '@/components/common/Card';
import UnderlinedInputWrapper from '@/components/form/UnderlinedInputWrapper';
import CustomSelect from '@/components/form/CustomSelect';

export default {
  name: 'Filters',
  props: ['movementSessions'],
  watch: {
    movementSessions: (movementSessions) => {
      this.computedFilters = filtersService.compute(movementSessions);
    },
  },
  computed: {
    movementSessionFilters() {
      return this.$store.state.securityCamera.movementSessionsFilters;
    },
  },
  components: {
    Card,
    UnderlinedInputWrapper,
    CustomSelect,
  },
  methods: {
    updateActiveFilters(key) {
      this.$store.dispatch('updateMovementSessionsFilter', { key, value: this.activeFilters[key] });
    },
  },
  data() {
    return {
      computedFilters: {},
      activeFilters: {},
    };
  },
  created() {
    this.computedFilters = filtersService.compute(this.movementSessions);
  },
};
</script>

<style lang="scss">
  @import "../../styles/variables.scss";

  .movement-session-filters {

  }
</style>
