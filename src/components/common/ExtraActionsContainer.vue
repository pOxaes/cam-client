<template>
  <div class="extra-action-container">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'ExtraActionContainer',
  };
</script>

<style lang="scss">
  @import "../../styles/variables.scss";

  .extra-action-container {
    background: $color-dark-background;
    padding: $u-medium;
  }

</style>
