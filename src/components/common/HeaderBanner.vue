<template>
  <transition
    v-on:before-enter="beforeEnter"
    v-on:enter="onEnter"
    v-on:leave="onLeave">
    <div class="header-banner">
      <button class="btn btn--icon header-banner__menu" v-on:click="toggleMenu()" type="button">
        <Icon icon="ios-menu" size="big"/>
      </button>
      <transition
        v-on:before-enter="titleBeforeEnter"
        v-on:enter="titleOnEnter">
        <h1 class="header-banner__title" v-show="title">{{title}}</h1>
      </transition>
      <button class="btn btn--icon header-banner__notification" type="button">
        <Icon icon="md-notifications-outline" size="big"/>
      </button>
    </div>
  </transition>
</template>

<script>
import _ from 'lodash';
import Icon from '@/components/common/Icon';
import types from '@/store/mutations-types';
import routes from '@/api/constants/routes.constant';
import headerBannerAnimations from '@/animations/headerBanner.animation';

const getChildren = subRoutes => _.values(subRoutes).reduce((acc, subRoute) => {
  if (subRoute.children) {
    acc = Object.assign(acc, subRoute.children);
    acc = Object.assign(acc, getChildren(subRoute.children));
  }
  return acc;
}, {});

const routesDictionnary = Object.assign({}, routes, getChildren(routes));

export default {
  name: 'HeaderBanner',
  data() {
    return {
      title: undefined,
    };
  },
  components: {
    Icon,
  },
  methods: {
    beforeEnter: headerBannerAnimations.beforeEnter,
    onEnter: headerBannerAnimations.onEnter,
    onLeave: headerBannerAnimations.onLeave,

    titleBeforeEnter: headerBannerAnimations.titleBeforeEnter,
    titleOnEnter: headerBannerAnimations.titleOnEnter,

    toggleMenu() {
      this.$store.commit(types.TOGGLE_NAV);
    },
  },
  watch: {
    $route(route) {
      const that = this;
      this.title = undefined;
      setTimeout(() => {
        that.title = routesDictionnary[route.name].title;
      }, 1);
    },
  },
  created() {
    this.title = routesDictionnary[this.$route.name].title;
  },
};
</script>

<style lang="scss">
  @import "../../styles/variables.scss";

  .header-banner {
    position: relative;
    z-index: $z-header;

    display: flex;
    justify-content: space-between;
    align-items: center;

    background-color: white;
    box-shadow: $shadow-l1;

    &__title {
      font-weight: 300;
    }
  }
</style>
