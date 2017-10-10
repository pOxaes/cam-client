<template>
  <div class="spinner" :class="classObject">
    <div class="spinner__inner">
      <div class="spinner__dot1"></div>
      <div class="spinner__dot2"></div>
    </div>
  </div>
</template>

<script>
  const classNamespace = 'spinner--';

  const sizes = [
    'small',
    'big',
  ];

  const colors = [
    'light',
    'background',
  ];

  const types = [
    'background',
    'centered',
  ];

  export default {
    name: 'Spinner',
    props: [
      'color',
      'size',
      'type',
    ],
    computed: {
      classObject() {
        return {
          [`${classNamespace}type-${this.type}`]: types.indexOf(this.type) !== -1,
          [`${classNamespace}color-${this.color}`]: colors.indexOf(this.color) !== -1,
          [`${classNamespace}size-${this.size}`]: sizes.indexOf(this.size) !== -1,
        };
      },
    },
  };
</script>

<style lang="scss">
  @import "../../styles/variables.scss";

  .spinner {
    $size-default: 4rem;
    $size-small: 2rem;
    $size-big: 10rem;

    &__inner {
      width: $size-default;
      height: $size-default;
      position: relative;
      text-align: center;
      animation: sk-rotate 2.0s infinite linear;
    }

    &--size-small &__inner {
      width: $size-small;
      height: $size-small;
    }

    &--size-big &__inner {
      width: $size-big;
      height: $size-big;
    }

    &__dot1,
    &__dot2 {
      width: 60%;
      height: 60%;
      display: inline-block;
      position: absolute;
      top: 0;
      background-color: $color-primary;
      border-radius: 100%;

      animation: sk-bounce 2.0s infinite ease-in-out;
    }

    &--color-light &__dot1,
    &--color-light &__dot2 {
      background-color: white;
    }

    &--color-background &__dot1,
    &--color-background &__dot2 {
      background-color: darken($color-background, 10);
    }

    &__dot2 {
      top: auto;
      bottom: 0;
      animation-delay: -1.0s;
    }

    &--type-background {
      margin: auto;
      position: fixed;
      top: calc(50%);
      left: calc(50%);
      transform: translateX(-50%) translateY(-50%);
    }

    &--type-centered {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  @keyframes sk-rotate { 100% { transform: rotate(360deg);}}

  @keyframes sk-bounce {
    0%, 100% {
      transform: scale(0.0);
    } 50% {
      transform: scale(1.0);
    }
  }
</style>
