<template>
  <Card class="user">
    <transition
      appear
      v-on:before-enter="beforeEnter"
      v-on:enter="onEnter"
      v-on:leave="onLeave">
      <div class="user__actions btn__container" v-if="showActions">
        <button class="btn" type="button" v-on:click="callbacks.goToUserEdition(user._id)">Edit</button>
        <button class="btn btn--alert" type="button" v-on:click="callbacks.deleteUser(user)">Delete</button>
      </div>
    </transition>
    <div class="user__inner" v-on:click="toggleActions()">
      <div class="user__image">
        <img src="static/user-placeholder.png">
      </div>
      <div class="user__info">
        <div class="user__info__name">{{user.name}}</div>
        <div class="user__info__email">{{user.email}}</div>
      </div>
    </div>
  </Card>
</template>

<script>
  import Card from '@/components/common/Card';
  import animationUtils from '@/animations/utils';
  import Velocity from 'velocity-animate';

  const selectors = {
    buttons: '.btn',
  };

  export default {
    name: 'User',
    props: [
      'user',
      'callbacks',
    ],
    data() {
      return {
        showActions: false,
      };
    },
    methods: {
      toggleActions() {
        this.showActions = !this.showActions;
      },

      beforeEnter(el) {
        Velocity(el.querySelectorAll(selectors.buttons), {
          translateY: '-100%',
        }, {
          duration: 1,
        });

        Velocity(el, {
          translateY: '-100%',
        }, {
          duration: 1,
        });
      },
      onEnter(el, done) {
        Velocity(el, {
          translateY: 0,
        }, {
          duration: 300,
        });

        animationUtils.forEachEl(el, selectors.buttons, (button, index, buttons) => {
          const options = {
            delay: 150 + (index * 50),
            duration: 300,
          };
          if (index === buttons.length - 1) {
            options.complete = done;
          }

          Velocity(button, {
            translateY: 0,
          }, options);
        });
      },
      onLeave(el, done) {
        Velocity(el, {
          translateY: '-100%',
        }, {
          duration: 150,
          complete: done,
        });
      },
    },
    components: {
      Card,
    },
  };
</script>

<style lang="scss">
  @import "../../styles/variables.scss";

  .user {
    position: relative;

    &__inner {
      position: relative;
      z-index: $z-userActions - 2;
      display: flex;
      padding: $u-medium;
      background: #FFF;

      .user__actions + & {
        z-index: $z-userActions;
      }
    }

    &__image {
      $size: 6rem;
      width: $size;
      height: $size;

      img {
        max-width: 100%;
        max-height: 100%;
      }
    }

    &__info {
      display: flex;
      flex-direction: column;
      justify-content: center;

      margin-left: $u-medium;

      &__name {
        font-weight: 600;
        font-size: 1.6rem;
        margin-bottom: $u-small;
      }

      &__email {
        font-weight: 600;
        font-size: 1.5rem;
        color: $color-text-light;
      }
    }

    &__actions {
      $spacing: $u-small + $u-tiny;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      z-index: $z-userActions - 1;

      border-top: 1px solid $color-border;
      padding: $spacing;
      box-shadow: $shadow-l1;
      background: #FFF;
    }
  }
</style>
