<template>
  <label class="checkbox">
    <span class="checkbox__label">{{label}}</span>
    <div class="checkbox__inner">
      <input type="checkbox" v-bind:checked="value" v-on:change="updateValue($event.target.checked)"/>
      <div class="checkbox__placeholder"></div>
    </div>
  </label>
</template>

<script>
  export default {
    name: 'Checkbox',
    props: [
      'value',
      'label',
    ],
    methods: {
      updateValue(checked) {
        this.$emit('input', checked);
      },
    },
  };
</script>

<style lang="scss">
  @import "../../styles/variables.scss";

  $height: 3.3rem;
  $width: 6.6rem;
  $padding: .4rem;
  $size: $height - ($padding * 2);

  .checkbox {
    display: flex;
    align-items: center;

    &__inner {
      position: relative;
      width: $width;
      height: $height;
      position: relative;
      cursor: pointer;
    }

    &__label {
      display: block;
      flex: 1 1;
    }

    input {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      border: none;
      background: none;
      visibility: hidden;
    }

    &__placeholder {
      position: absolute;
      width: 100%;
      height: 100%;

      box-shadow: $shadow-i-l1;
      border-radius: $height / 2;
      background: $color-background;

      &::before {
        transition: left .15s ease-out;

        content: "";
        position: absolute;
        top: 50%;
        left: $padding + ($size / 2);
        transform: translate(-50%, -50%);

        display: block;
        height: $size;
        width: $size;

        background: $color-gray-medium-light;
        border-radius: 50%;
      }
    }

    input:checked ~ &__placeholder {

      &::before {
        left: $width - ($size / 2) - $padding;
        background: $color-primary;
      }
    }
  }
</style>
