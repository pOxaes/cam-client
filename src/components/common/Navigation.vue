<template>
  <transition
    v-on:before-enter="beforeEnter"
    v-on:enter="onEnter"
    v-on:leave="onLeave">
    <div class="nav" v-if="show">
      <div class="nav__content-overlay" v-on:click="hide()"></div>
      <div class="nav__container">
        <div class="nav__container__header">
          <router-link class="nav__logo" :to="{ name: 'Home' }">
            <Logo type="bold"/>
            <span class="nav__logo__text">klOe</span>
          </router-link>
          <router-link class="nav__user" :to="{ name: 'Profile_PersonalInformations' }">
            <div class="nav__user__image-container">
              <img src="static/user-placeholder.png">
            </div>
            <div class="nav__user__text">
              <div class="nav__user__name">{{currentUser.name || 'unknown'}}</div>
              <!-- <div class="nav__user__profile">{{currentUser.profile || 'unknown'}}</div> -->
            </div>
          </router-link>
          <h3 class="nav__container__title">Main</h3>
          <NavLink v-for="route in routes.main"
            :key="route"
            :route="route.name || route.default"
            :icon="route.icon">{{route.title}}</NavLink>
          <h3 class="nav__container__title">Components</h3>
          <NavLink v-for="route in routes.components"
            :key="route"
            :route="route.name || route.default"
            :icon="route.icon">{{route.title}}</NavLink>
        </div>
        <div class="nav__container__footer">
          <NavLink icon="ios-log-out" :click="logout">Log out</NavLink>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import _ from 'lodash';
import Logo from '@/components/common/Logo';
import NavLink from '@/components/common/NavigationLink';
import routes from '@/api/constants/routes.constant';
import types from '@/store/mutations-types';
import navigationAnimations from '@/animations/navigation.animation';

const isVisibleInNav = route => route.visibleInNav;

export default {
  name: 'Navigation',
  components: {
    Logo,
    NavLink,
  },
  props: ['show'],
  data() {
    return {
      routes: _.values(routes)
        .filter(isVisibleInNav)
        .reduce((acc, route) => {
          const routeKey = route.isComponent ? 'components' : 'main';
          acc[routeKey].push(route);
          return acc;
        }, { main: [], components: [] }),
    };
  },
  computed: {
    showLogout() {
      return this.$store.state.app.isConnected || this.$store.state.app.hasToken;
    },
    currentUser() {
      return this.$store.state.currentUser;
    },
  },
  watch: {
    $route() {
      setTimeout(this.hide, 150);
    },
  },
  methods: {
    beforeEnter: navigationAnimations.beforeEnter,
    onEnter: navigationAnimations.onEnter,
    onLeave: navigationAnimations.onLeave,

    hide() {
      this.$store.commit(types.TOGGLE_NAV, false);
    },

    logout() {
      this.$store.dispatch('logout');
      this.$store.dispatch('disconnect');
      this.$router.push({ name: 'Login' });
    },
  },
  beforeCreate() {
    if (!this.$store.state.currentUser.name) {
      this.$store.dispatch('getCurrentUser');
    }
  },
};
</script>

<style lang="scss">
  @import "../../styles/variables.scss";

  .nav {
    &__container {
      position: fixed;
      z-index: $z-nav;
      left: 0;
      bottom: 0;
      top: 0;
      background: $color-dark-background;

      display: flex;
      flex-direction: column;
      justify-content: space-between;

      &__header {
        flex: 1 1;
      }

      &__footer {
        border-top: 1px solid $color-dark-border;
      }

      &__title {
        color: $color-dark-text;
        font-weight: 400;
        font-size: 1.2rem;
        margin-left: $u-small;
      }
    }

    &__content-overlay {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: rgba(255, 255, 255, 0);
    }

    &__logo {
      padding: $u-small;
      display: flex;
      flex-direction: row;
      align-items: center;
      background: darken($color-dark-background, 8);

      &__text {
        margin-left: $u-medium;
        font-weight: 600;
        font-size: 1.4rem;
        color: white;
      }
    }

    &__user {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: $u-medium $u-small;
      color: white;
      background: darken($color-dark-background, 4);
      text-decoration: none;

      &__text {
        padding-left: $u-medium;
      }

      &__name {
        font-weight: 600;
        color: white;
      }

      &__profile {
        color: $color-gray-light;
      }

      &__image-container {
        $image-size: 4rem;

        position: relative;
        overflow: hidden;

        width: $image-size;
        height: $image-size;
        border-radius: 50%;

        img {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          max-width: 110%;
          max-height: 110%;
        }
      }
    }
  }
</style>
