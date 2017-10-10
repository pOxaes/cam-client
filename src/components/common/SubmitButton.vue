<template>
  <button class="btn" v-on:click="onButtonClick()" :type="type" :class="{ 'btn--loading': loading }" :disabled="disabled">
    <span class="btn__text">
      {{text}}
    </span>
    <div class="btn__loader">
      <Spinner color="light" size="small"/>
    </div>
  </button>
</template>

<script>
  import Spinner from '@/components/common/Spinner';

  export default {
    name: 'SubmitButton',
    components: {
      Spinner,
    },
    props: [
      'text',
      'loading',
      'type',
      'disabled',
      'onClick',
    ],
    methods: {
      onButtonClick() {
        if (this.onClick) {
          this.onClick();
        }
      },
    },
  };
</script>
