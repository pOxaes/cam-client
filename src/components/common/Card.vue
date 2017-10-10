<template>
  <div class="card" :class="classObject">
    <slot></slot>
  </div>
</template>

<script>
  const classNamespace = 'card--';

  export default {
    name: 'Card',
    props: [
      'padded',
    ],
    computed: {
      classObject() {
        return {
          [`${classNamespace}padded`]: !!this.padded,
        };
      },
    },
  };
</script>

<style lang="scss">
  @import "../../styles/variables.scss";

  .card {
    background: #FFF;
    box-shadow: $shadow-l1;

    &--padded {
      padding: $u-medium;
    }

    & + & {
      margin-top: $u-medium;
    }
  }
</style>
