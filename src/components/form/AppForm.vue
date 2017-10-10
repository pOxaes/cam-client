<template>
  <form v-on:submit.prevent="submit" :disabled="disabled">
    <slot></slot>
  </form>
</template>

<script>
  export default {
    name: 'AppForm',
    props: [
      'onSubmit',
      'disabled',
    ],
    methods: {
      submit() {
        if (this.disabled) {
          return;
        }
        this.onSubmit();
      },
    },
  };
</script>
