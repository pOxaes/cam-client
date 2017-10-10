<template>
  <div class="nav__link">
    <router-link class="nav__link__container" :to="{ name: route }" v-if="route">
      <Icon :icon="icon" size="big" class="nav__link__icon"/>
      <span class="nav__link__text">
        <slot></slot>
      </span>
    </router-link>
    <button type="button" class="nav__link__container" v-if="!route" v-on:click="click()">
      <Icon :icon="icon" size="big" class="nav__link__icon"/>
      <span class="nav__link__text">
        <slot></slot>
      </span>
    </button>
  </div>
</template>

<script>
import Icon from '@/components/common/Icon';

export default {
  name: 'NavigationLink',
  props: [
    'route',
    'click',
    'icon',
  ],
  components: {
    Icon,
  },
};
</script>

<style lang="scss">
  @import "../../styles/variables.scss";

  .nav__link {
    display: block;
    font-size: 1.4rem;

    &__container {
      transition: all $quick-animation;

      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: $u-medium ($u-extraLarge + $u-large) $u-medium $u-medium;
      margin: $u-tiny 0 $u-tiny $u-small;

      color: $color-gray-light;
      text-decoration: none;

      &:focus,
      &:hover {
        color: $color-primary;
      }

      &::before {
        transition: transform $quick-animation;
        content: "";

        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;

        transform: scaleX(0);
        transform-origin: right;

        background-color: $color-primary;
        border-top-left-radius: 3px;
        border-bottom-left-radius: 3px;
      }

      &.router-link-active,
      &.router-link-active:focus,
      &.router-link-active:hover {
        color: white;

        &:before {
          transform: scaleX(1);
        }
      }
    }

    &__text {
      position: relative;
      flex: 1 1;
      margin-left: $u-large + $u-medium;
    }

    &__icon {
      position: absolute;
      left: $u-medium;
      top: 50%;
      transform: translateY(-50%);
    }
  }
</style>
