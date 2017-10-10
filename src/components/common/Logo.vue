<template>
  <img :src="'static/' + src" alt="klOe" :width="logoSize" :height="logoSize"/>
</template>

<script>
const sizes = {
  small: 16,
  medium: 28,
  big: 150,
};

const sources = {
  default: 'logo.png',
  bold: 'logo-mono-bold.png',
};

export default {
  name: 'Logo',
  props: [
    'size',
    'type',
  ],
  computed: {
    logoSize() {
      return this.size && sizes[this.size] ? sizes[this.size] : sizes.medium;
    },
    src() {
      return this.type && sources[this.type] ? sources[this.type] : sources.default;
    },
  },
};
</script>
