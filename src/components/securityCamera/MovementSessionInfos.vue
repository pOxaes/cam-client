<template>
  <div class="movement-session-infos">
    <div class="movement-session-infos__camera">{{movementSession.camera.name}}</div>
    <div class="movement-session-infos__duration">
      {{movementSession | movementSessionDuration}}
      <span class="movement-session-infos__time">{{movementSession.start | movementSessionTime}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MovementSessionInfos',
    props: ['movementSession'],
  };
</script>

<style lang="scss">
  @import "../../styles/variables.scss";

  .movement-session-infos {
    &__camera {
      margin-bottom: $u-small;
      font-weight: 600;
      font-size: 1.6rem;
    }

    &__duration {
      font-size: 1.4rem;
      color: $color-text-light;
    }

    &__time {
      &::before {
        content: " - ";
      }
    }
  }
</style>
