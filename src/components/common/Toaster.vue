<template>
  <div class="toaster">
    <transition
      v-on:enter="onEnter"
      v-on:leave="onLeave">
      <div class="toaster__item" v-if="item" :class="classObject">
        {{item.message}}
      </div>
    </transition>
  </div>
</template>

<script>
  import Velocity from 'velocity-animate';
  import Promise from 'bluebird';

  const itemClassNameSpace = 'toaster__item--';
  const leaveDuration = 300;

  export default {
    name: 'Toaster',
    data() {
      return {
        item: undefined,
      };
    },
    methods: {
      onEnter(el, done) {
        Velocity(el, {
          translateY: [0, 200],
        }, {
          duration: 300,
          complete: done,
        });
      },
      onLeave(el, done) {
        Velocity(el, {
          translateY: [200, 0],
        }, {
          duration: leaveDuration,
          complete: done,
        });
      },
    },
    computed: {
      notification() {
        return this.$store.state.app.notification;
      },
      classObject() {
        return {
          [`${itemClassNameSpace}${this.item.type}`]: true,
        };
      },
    },
    watch: {
      notification(newNotification) {
        const that = this;
        let resetPromise = Promise.resolve();

        if (this.item) {
          this.item = undefined;
          resetPromise = new Promise(resolve => setTimeout(resolve, leaveDuration));
        }

        resetPromise.then(() => {
          that.item = newNotification;
        });
      },
    },
  };
</script>

<style scoped lang="scss">
  @import "../../styles/variables.scss";

  .toaster {
    position: fixed;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    right: 0;
    left: 0;
    padding: $u-small;

    &__item {
      margin-bottom: $u-small;
      padding: $u-small;
      color: white;

      &--error {
        background-color: $color-red;
      }

      &--warning {
        background-color: $color-orange;
      }

      &--info {
        background-color: $color-blue;
      }
    }
  }
</style>
