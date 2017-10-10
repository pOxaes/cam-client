<template>
  <div id="app">
    <HeaderBanner v-if="showHeader"/>
    <Navigation :show="showNav"/>
    <AnimatedView
      v-if="canShowView"
      :should-animate-view="isRootRoute"
      :should-animate-app="shouldAnimateApp">
      <router-view class="view"/>
    </AnimatedView>
    <Toaster/>
  </div>
</template>

<script>
import VueCookie from 'vue-cookie';
import Toaster from '@/components/common/Toaster';
import HeaderBanner from '@/components/common/HeaderBanner';
import Navigation from '@/components/common/Navigation';
import AnimatedView from '@/components/common/AnimatedView';
import 'normalize.css/normalize.css';
import 'styles/app.scss';

export default {
  name: 'app',
  components: {
    AnimatedView,
    HeaderBanner,
    Navigation,
    Toaster,
  },
  data() {
    return {
      previousRoute: undefined,
    };
  },
  methods: {
    shouldAnimateApp() {
      return this.$route.name !== 'Login' && this.previousRoute;
    },
    isRootRoute(routeName) {
      return routeName.indexOf('_') === -1;
    },
    checkRouteAuth() {
      if (this.$store.state.app.hasToken && !this.$store.state.app.isConnected) {
        this.$store.dispatch('connect', {
          token: VueCookie.get('token'),
          store: this.$store,
        });
      }
      if (!this.$store.state.app.hasToken && this.$route.name !== 'Login') {
        this.$router.replace({ name: 'Login' });
      }
    },
  },
  computed: {
    showNav() {
      return this.$store.state.app.showNav;
    },
    showHeader() {
      return this.$store.state.app.isConnected;
    },
    canShowView() {
      return this.$store.state.app.isConnected
        || (!this.$store.state.app.hasToken && this.$route.name === 'Login');
    },
  },
  watch: {
    $route(newRoute, oldRoute) {
      this.checkRouteAuth();
      this.previousRoute = oldRoute;
    },
  },
  created() {
    this.checkRouteAuth();
  },
};
</script>

<style lang="scss">
  @import "../styles/variables.scss";

  .view {
    z-index: $z-view;
    width: 100vw;
    max-width: 100vw;

    &__title {
      font-size: 2.4rem;
      margin: $u-medium 0 $u-small;
      font-weight: 300;
      color: $color-gray-medium-light;
    }
  }
</style>
