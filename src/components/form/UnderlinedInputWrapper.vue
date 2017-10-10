<template>
  <div class="underlined-input-wrapper" :class="classObject">
    <slot></slot>
    <hr class="underlined-input-wrapper__bar"/>
    <span class="underlined-input-wrapper__label" v-if="label">{{ label }}</span>
    <Icon v-if="icon" :icon="icon" class="underlined-input-wrapper__icon"/>
  </div>
</template>

<script>
  import Icon from '@/components/common/Icon';

  const classNamespace = 'underlined-input-wrapper--';

  export default {
    name: 'UnderlinedInputWrapper',
    props: [
      'label',
      'icon',
      'light',
      'model',
      'reversed',
    ],
    components: {
      Icon,
    },
    computed: {
      iconClass() {
        return `ion-ios-${this.icon}`;
      },
      classObject() {
        return {
          [`${classNamespace}light`]: !!this.light,
          [`${classNamespace}icon`]: !!this.icon,
          [`${classNamespace}labelled`]: !!this.label,
          [`${classNamespace}filled`]: typeof this.model !== 'undefined' && this.model !== '' && this.model !== null,
        };
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "../../styles/variables.scss";

  .underlined-input-wrapper {
    position: relative;
    display: block;

    $icon-size: 2rem;

    input {
      position: relative;
      display: block;
      width: 100%;
      padding: $input-padding;
      box-sizing: border-box;
      line-height: $input-line-height;
      font-size: 1.2rem;
      font-weight: 100;

      border-bottom: 1px solid $input-border-color;
      color: $input-color;
    }

    &--labelled {
      padding-top: $u-small;

      .underlined-input-wrapper + & {
        margin-top: $u-medium;
      }
    }

    &--icon input {
      text-align: center;
      padding-left: $icon-size + $input-padding;
      padding-right: $icon-size + $input-padding;
    }

    &__icon {
      position: absolute;
      line-height: $input-line-height;
      bottom: 0;
      top: 0;
      display: flex;
      justify-content: center;
      flex-direction: column;
      font-size: $icon-size;
    }

    &__label {
      transition: all $quick-animation;

      position: absolute;

      transform: translateX($input-padding) translateY(-($input-height / 2) - $input-line-height / 2);

      pointer-events: none;

      line-height: $input-line-height;
    }

    &__bar {
      transition: all $quick-animation;

      position: absolute;
      top: 100%;
      margin: 0;
      margin-top: -1px;

      display: block;
      width: 100%;
      transform: scaleX(0);
      pointer-events: none;

      border: 0;
      border-top: 1px solid $bar-color;
    }

    input:focus ~ &__bar,
    .custom-select.open ~ &__bar {
      transform: scaleX(1);
    }

    &--filled input,
    &--filled .custom-select,
    input:focus,
    .custom-select.open {
      outline: none;

      &::placeholder {
        color: transparent;
      }

      ~ .underlined-input-wrapper__label {
        transform: translateX(0) translateY(-$input-height - $input-line-height / 2);
        font-size: 1.1rem;
        color: $color-gray-medium-light;
      }
    }

    &--light {
      input {
        border-color: $input-light-border-color;
        color: $input-light-color;
      }

      .underlined-input-wrapper__bar {
        border-color: $bar-light-color;
      }
    }
  }
</style>
