<template>
  <div v-if="camera" class="camera-token">
    <div class="camera-token__name">{{camera.name}}</div>
    <div class="camera-token__text">
      This password has been generated automatically and is not saved anywhere.
      It is associated to the camera "{{camera.name}}".
      Please be sure to save it and use it as the password for your cam-stream application.
    </div>
    <div class="camera-token__password">{{camera.password}}</div>
  </div>
</template>

<script>
  export default {
    name: 'CameraToken',
    props: ['camera'],
  };
</script>

<style lang="scss">
  @import "../../styles/variables.scss";

  .camera-token {
    background: $color-primary;
    padding: $u-medium;
    text-align: center;

    &__name {
      font-weight: 600;
      font-size: 1.4rem;
      margin-bottom: $u-medium;
    }

    &__password {
      font-weight: 600;
      font-size: 1.8rem;
      margin-top: $u-medium;
      background: #FFF;
      padding: $u-tiny;
      border-radius: .3rem;
      color: $color-primary;
    }
  }
</style>
