<template>
  <div class="maquette-overlay" v-if="isVisibible">
    <img :src="'static/' + src" :style="{ opacity: opacity }">
  </div>
</template>

<script>
  const KEYCODES = {
    plus: 107,
    plus2: 187,
    minus: 109,
    minus2: 189,
    ctrl: 17,
  };

  export default {
    name: 'MaquetteOverlay',
    props: ['src'],
    data() {
      return {
        isVisibible: true,
        opacity: 0.5,
      };
    },
    methods: {
      toggleVisibility() {
        this.isVisibible = !this.isVisibible;
      },
      increaseOpacity() {
        this.opacity += 0.1;
        if (this.opacity > 1) {
          this.opacity = 1;
        }
      },
      decreaseOpacity() {
        this.opacity -= 0.1;
        if (this.opacity < 0) {
          this.opacity = 0;
        }
      },
    },
    created() {
      document.body.addEventListener('keydown', (e) => {
        switch (e.keyCode) {
          case KEYCODES.ctrl:
            this.toggleVisibility();
            break;
          case KEYCODES.plus:
          case KEYCODES.plus2:
            this.increaseOpacity();
            break;
          case KEYCODES.minus:
          case KEYCODES.minus2:
            this.decreaseOpacity();
            break;
          default: break;
        }
      });
    },
  };
</script>

<style lang="scss">
  .maquette-overlay {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
  }
</style>
