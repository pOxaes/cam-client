<template>
  <div>
    <transition
      appear
      v-on:before-appear="beforeAppear"
      v-on:appear="onAppear"
      v-on:after-appear="afterAppear"
      v-on:before-enter="beforeEnter"
      v-on:enter="onEnter"
      v-on:after-enter="afterEnter"
      v-on:before-leave="beforeLeave"
      v-on:leave="onLeave"
      v-on:after-leave="afterLeave">
      <slot></slot>
    </transition>
  </div>
</template>

<script>
  import viewsAnimations from '@/animations/views';
  import appAnimations from '@/animations/app.animation';

  export default {
    name: 'AnimatedView',
    props: [
      'shouldAnimateView',
      'shouldAnimateApp',
    ],
    data() {
      return {
        previousRoute: undefined,
        canAnimateView: this.shouldAnimateView || this.shouldAnimateViewDefault,
        canAnimateApp: this.shouldAnimateApp || this.shouldAnimateAppDefault,
      };
    },
    watch: {
      $route(newRoute, oldRoute) {
        this.previousRoute = oldRoute;
      },
    },
    methods: {
      shouldAnimateViewDefault() {
        return true;
      },
      shouldAnimateAppDefault() {
        return this.previousRoute;
      },
      beforeAppear(el) {
        if (this.canAnimateView(this.$route.name)) {
          viewsAnimations.beforeAppear(this.$route.name, el);
        }
      },
      onAppear(el, done) {
        if (!this.canAnimateView(this.$route.name)) {
          return done();
        }
        return viewsAnimations
          .onAppear(this.$route.name, el)
          .then(done);
      },
      afterAppear(el) {
        if (this.canAnimateView(this.$route.name)) {
          viewsAnimations.afterAppear(this.$route.name, el);
        }
      },
      beforeEnter(el) {
        if (this.canAnimateView(this.$route.name)) {
          viewsAnimations.beforeEnter(this.$route.name, el);
        }
        if (this.canAnimateApp()) {
          appAnimations.beforeEnter(el);
        }
      },
      onEnter(el, done) {
        const enterAnimation = this.canAnimateApp() ?
          appAnimations.onEnter(el)
          : Promise.resolve();

        enterAnimation.then(() => {
          if (!this.canAnimateView(this.$route.name)) {
            return done();
          }
          return viewsAnimations
            .onEnter(this.$route.name, el)
            .then(done);
        });
      },
      afterEnter(el) {
        if (this.canAnimateView(this.$route.name)) {
          viewsAnimations.afterEnter(this.$route.name, el);
        }
        if (this.canAnimateApp()) {
          appAnimations.afterEnter(el);
        }
      },
      beforeLeave(el) {
        if (this.previousRoute && this.canAnimateView(this.previousRoute.name)) {
          viewsAnimations.beforeLeave(this.previousRoute.name, el);
        }
        if (this.canAnimateApp()) {
          appAnimations.beforeLeave(el);
        }
      },
      onLeave(el, done) {
        if (!this.previousRoute) {
          done();
          return;
        }

        const leaveAnimation = this.canAnimateView(this.previousRoute.name) ?
          viewsAnimations.onLeave(this.previousRoute.name, el)
          : Promise.resolve();

        leaveAnimation
          .then(() => {
            if (this.canAnimateApp()) {
              return appAnimations.onLeave(el, done);
            }
            return Promise.resolve();
          })
          .then(done);
      },
      afterLeave(el) {
        if (this.previousRoute && this.canAnimateView(this.previousRoute.name)) {
          viewsAnimations.afterLeave(this.previousRoute.name, el);
        }
      },
    },
  };
</script>
