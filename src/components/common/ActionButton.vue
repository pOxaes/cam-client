<template>
    <button :class="classObject" type="button" class="btn btn--circle btn--action" v-on:click="onClick()">
      <Icon :icon="icon" size="super-big"/>
    </button>
  </transition>
</template>

<script>
import Icon from '@/components/common/Icon';

const classNamespace = 'btn--action--';

export default {
  name: 'ActionButton',
  data() {
    return {
      clicked: false,
    };
  },
  props: [
    'icon',
    'action',
  ],
  components: {
    Icon,
  },
  computed: {
    classObject() {
      return {
        [`${classNamespace}clicked`]: !!this.clicked,
      };
    },
  },
  methods: {
    onClick() {
      this.clicked = true;
      setTimeout(this.action, 10);
    },
  },
};
</script>
