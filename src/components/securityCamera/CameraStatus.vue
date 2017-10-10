<template>
  <div class="camera-status" :class="classObject">
    <div class="camera-status__label" v-if="params.label">{{ status }}</div>
    <div class="camera-status__icon"></div>
  </div>
</template>

<script>
  import cameraService from '@/api/services/camera.service';

  const classNamespace = 'camera-status--';

  export default {
    name: 'CameraStatus',
    props: [
      'camera',
      'parameters',
    ],
    data() {
      return {
        params: Object.assign({
          label: false,
        }, this.parameters),
      };
    },
    computed: {
      status() {
        return cameraService.getStatus(this.camera);
      },
      classObject() {
        return {
          [`${classNamespace}${this.status}`]: Object.prototype.hasOwnProperty.call(cameraService.statuses, this.status),
        };
      },
    },
  };
</script>

<style lang="scss">
  @import "../../styles/variables.scss";

  .camera-status {
    display: flex;
    align-items: center;

    &__label {
      margin-right: $u-small;
      color: $color-gray-medium-light;
    }

    &__icon {
      $size: 1rem;
      display: inline-block;
      width: $size;
      height: $size;
      border-radius: 50%;
    }

    &--OFFLINE &__icon {
      background: $color-gray-medium-light;
    }

    &--WATCHING &__icon {
      background: $color-red;
    }

    &--ONLINE &__icon {
      background: $color-primary;
    }
  }
</style>
