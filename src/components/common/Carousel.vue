<template>
  <div class="carousel">
    <div class="carousel__inner">
      <img
        v-bind:src="loadingImage"
        v-on:load="onImageLoad(loadingImage)"
        class="carousel__loading-image"
        v-for="loadingImage in loadingImages"/>
      <div class="carousel__header">
        <span>{{images[active].date | toHour}}</span>
        <span>{{active + 1}} / {{imagesLength}}</span>
      </div>
      <button
        class="carousel__navigation-button carousel__previous btn btn--icon btn--dark"
        type="button"
        :disabled="!previousActive"
        v-on:click="previous()"><Icon icon="ios-arrow-back" size="super-big"/></button>
      <button
        class="carousel__navigation-button carousel__next btn btn--icon btn--dark"
        type="button"
        :disabled="!nextActive"
        v-on:click="next()"><Icon icon="ios-arrow-forward" size="super-big"/></button>
      <transition
        v-on:enter="onImageEnter"
        v-on:leave="onImageLeave">
        <li
          class="carousel__image-container"
          v-for="(image, index) in images"
          :key="image.src"
          v-if="active === index">
          <img class="carousel__image" v-bind:src="image.src"/>
        </li>
      </transition>
    </div>
  </div>
</template>

<script>
  import Icon from '@/components/common/Icon';
  import Velocity from 'velocity-animate';

  const ACTION_NEXT = 'ACTION_NEXT';
  const ACTION_PREVIOUS = 'ACTION_PREVIOUS';

  export default {
    name: 'Carousel',
    props: ['images'],
    components: {
      Icon,
    },
    data() {
      return {
        active: 0,
        action: undefined,
        loadingImages: [],
        loadedImages: [],
      };
    },
    computed: {
      imagesLength() {
        return this.images ? this.images.length : 0;
      },
      nextActive() {
        return this.imagesLength && this.active < this.imagesLength - 1;
      },
      previousActive() {
        return this.active > 0;
      },
    },
    methods: {
      loadCloseImages() {
        const nextIndex = this.active + 1;
        const previousIndex = this.active - 1;

        if (nextIndex < this.imagesLength) {
          this.load(this.images[this.active + 1].src);
        }
        if (previousIndex >= 0) {
          this.load(this.images[this.active - 1].src);
        }
      },
      load(url) {
        if (this.loadingImages.indexOf(url) === -1 && this.loadedImages.indexOf(url) === -1) {
          this.loadingImages.push(url);
        }
      },
      onImageLoad(url) {
        this.loadingImages = this.loadingImages.filter(loadingUrl => loadingUrl !== url);
        this.loadedImages.push(url);
      },
      next() {
        if (this.active < this.imagesLength - 1) {
          this.active += 1;
          this.action = ACTION_NEXT;
        }
      },
      previous() {
        if (this.active > 0) {
          this.active -= 1;
          this.action = ACTION_PREVIOUS;
        }
      },
      onImageEnter(el, done) {
        const from = this.action === ACTION_NEXT ? '100%' : '-100%';
        Velocity(el, {
          translateX: [0, from],
        }, {
          duration: 300,
          complete: () => {
            done();
            this.action = undefined;
          },
        });
      },
      onImageLeave(el, done) {
        const to = this.action === ACTION_NEXT ? '-100%' : '100%';
        el.style.position = 'absolute';
        Velocity(el, {
          translateX: to,
        }, {
          duration: 300,
          complete: () => {
            done();
            this.action = undefined;
          },
        });
      },
    },
    watch: {
      active() {
        this.loadCloseImages();
      },
    },
    mounted() {
      this.loadCloseImages();
    },
  };
</script>

<style lang="scss">
  @import "../../styles/variables.scss";

  .carousel {
    $image-padding: 5rem;
    position: relative;
    margin: 0;
    background: darken($color-dark-background, 8);

    &__loading-image {
      width: 1px;
      height: 1px;
      position: fixed;
      left: -1px;
    }

    &__inner {
      padding: 0 0 $u-medium;
      min-height: 230px;
      box-sizing: border-box;
      position: relative;
    }

    &__header {
        margin: 0 $image-padding;
        padding: $u-small 0;
        display: flex;
        justify-content: space-between;
        color: #FFF;
    }

    &__image-container {
        pointer-events: none;
        list-style: none;
        padding: 0 $image-padding;
        min-height: 195px;
    }

    &__image {
      max-width: 100%;
    }

    &__date {
      display: none;
    }

    &__navigation-button {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }

    &__next {
      right: -$u-small;
    }

    &__previous {
      left: -$u-small;
    }
  }
</style>
