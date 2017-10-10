<template>
  <div>
    <transition name="fade">
      <Spinner :size="loader.size" :color="loader.color" :type="loader.type" v-if="loading"/>
    </transition>
    <transition name="fade">
      <div v-if="shouldShowSlot">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
  import Spinner from '@/components/common/Spinner';

  const setDefault = (defaultValue, value) => {
    if (typeof value === 'undefined') {
      return defaultValue;
    }
    return value;
  };

  export default {
    name: 'LoadingSlot',
    props: [
      'loading',
      'loaderSize',
      'loaderType',
      'loaderColor',
      'shouldShow',
    ],
    computed: {
      loader() {
        return {
          size: setDefault('big', this.loaderSize),
          type: setDefault('background', this.loaderType),
          color: setDefault('background', this.loaderColor),
        };
      },
      shouldShowSlot() {
        return typeof this.shouldShow !== 'undefined' ? this.shouldShow : !this.loading;
      },
    },
    components: {
      Spinner,
    },
  };
</script>
