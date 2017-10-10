<template>
  <div class="custom-select"
    :class="classObject">
    <v-select
      class="custom-select__v-select"
      :value.sync="value"
      :options="options"
      :onChange="vSelectParameters.onChange"
      :multiple="vSelectParameters.multiple"
      :searchable="vSelectParameters.searchable"></v-select>
    <button
      v-if="!(parameters && parameters.noClear)"
      v-on:click="clear()"
      :disabled="!hasSelection"
      type="button"
      class="btn btn--icon custom-select__clear-button">
      <Icon icon="ios-close" size="super-big"/>
    </button>
  </div>
</template>

<script>
  import vSelect from 'vue-select';
  import Icon from '@/components/common/Icon';

  const classNamespace = 'custom-select--';

  export default {
    name: 'CustomSelect',
    props: [
      'options',
      'value',
      'parameters',
    ],
    data() {
      return {
        vSelectParameters: Object.assign({
          multiple: false,
          searchable: true,
          onChange: this.updateValue,
        }, this.parameters && this.parameters.vSelect ? this.parameters.vSelect : {}),
        hasSelection: typeof this.value !== 'undefined' && this.value !== null,
      };
    },
    computed: {
      classObject() {
        return {
          [`${classNamespace}selected`]: this.hasSelection,
          [`${classNamespace}simple`]: !this.vSelectParameters.multiple,
        };
      },
    },
    methods: {
      updateValue(selected) {
        this.hasSelection = typeof selected !== 'undefined' && selected !== null;
        this.$emit('input', selected || undefined);
      },
      clear() {
        this.updateValue(undefined);
      },
    },
    components: {
      vSelect,
      Icon,
    },
  };
</script>

<style lang="scss">
  @import "../../styles/variables.scss";

  .v-select {

    .underlined-input-wrapper & {

      .dropdown-toggle {
        border: none;
      }
    }

    .custom-select--simple & {
      .dropdown-toggle {
        display: flex;
        align-items: center;
        padding: $u-medium 0 $u-medium $u-medium;
        border-bottom: 1px solid $input-border-color;
      }

      input.form-control[type=search],
      input.form-control[type=search]:focus {
        line-height: $input-line-height;
        height: $input-line-height;
      }

      .open-indicator {
        bottom: auto;
        top: 50%;
        height: 0;
        line-height: 0;
        margin-top: -7px;
      }

      &.open .open-indicator:before {
        border-color: $color-primary;
      }

      .selected-tag {
        background: none;
        padding: 0;
        border: none;
        float: none;
        margin: 0;
        line-height: $input-line-height;
        height: auto;
        border-radius: 0;
      }
    }
  }

  .custom-select {
    display: flex;
    align-items: center;

    &__v-select {
      flex: 1 1;
    }

    &__clear-button {
      padding-top: 0;
      padding-bottom: 0;
      padding-right: 0;
    }
  }
</style>
