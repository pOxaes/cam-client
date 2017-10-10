<template>
  <div>
  <router-link
    class="camera-item"
    :to="{ name: 'SecurityCamera_Camera', params: { id: camera._id }}">
    <div class="camera-item__header">
      <CameraStatus :camera="camera" v-if="params.status"/>
      <div class="camera-item__name" v-if="params.name">{{camera.name}}</div>
      <div class="camera-item__date" v-if="params.date && pingDate">
        {{pingDate | toDate}}
      </div>
    </div>
    <div class="camera-item__inner">
      <LoadingSlot :should-show="pingSrc" :loading="loading" loader-type="centered" loader-color="" loader-size="">
        <img
          class="camera-item__inner__image"
          v-if="pingSrc"
          v-bind:src="'data:image/png;base64,' + pingSrc"/>
        <Icon
          v-if="!pingSrc && !loading"
          class="camera-item__inner__icon"
          icon="md-eye-off"
            size="super-big"/>
      </LoadingSlot>
    </div>
  </router-link>
  <div class="btn__container view__inner" v-if="params.actions && camera.isConnected">
    <button type="button"
      class="btn"
      :class="{ 'btn--warning': camera.isWatching }"
      v-on:click="toggleWatch()">{{ camera.isWatching ? 'Stop watch' : 'Start watch' }}</button>
    <button type="button"
      class="btn"
      v-on:click="ping()">Ping</button>
  </div>
  </div>
</template>

<script>
  import moment from 'moment';
  import cameraService from '@/api/services/camera.service';
  import CameraStatus from '@/components/securityCamera/CameraStatus';
  import Icon from '@/components/common/Icon';
  import LoadingSlot from '@/components/common/LoadingSlot';

  const PING_INTERVAL = 20000;

  export default {
    name: 'CameraItem',
    props: [
      'camera',
      'parameters',
    ],
    data() {
      return {
        pingSrc: undefined,
        pingDate: undefined,
        loading: false,
        params: Object.assign({
          name: true,
          status: true,
          date: true,
          actions: false,
          interval: PING_INTERVAL,
        }, this.parameters),
      };
    },
    components: {
      CameraStatus,
      Icon,
      LoadingSlot,
    },
    computed: {
      status() {
        return cameraService.getStatus(this.camera);
      },
    },
    watch: {
      status() {
        if (this.status === cameraService.statuses.OFFLINE && this.pingInterval) {
          clearInterval(this.pingInterval);
        } else if (!this.pingInterval) {
          setTimeout(this.startPingInterval, 500);
        }
      },
    },
    methods: {
      ping() {
        this.loading = true;
        cameraService.ping(this.camera._id)
        .then((base64image) => {
          this.pingSrc = base64image;
          this.pingDate = moment(new Date());
        })
        .finally(() => {
          this.loading = false;
        });
      },
      startPingInterval() {
        this.pingInterval = setInterval(() => {
          this.ping();
        }, this.params.interval);
        this.ping();
      },
      toggleWatch() {
        const actions = this.camera.isWatching ?
          'cameraStopWatch'
          : 'cameraStartWatch';
        this.$store.dispatch(actions, this.camera._id);
      },
    },
    created() {
      if (this.status === cameraService.statuses.OFFLINE) {
        return;
      }
      this.startPingInterval();
    },
    beforeDestroy() {
      clearInterval(this.pingInterval);
    },
  };
</script>

<style lang="scss">
  @import "../../styles/variables.scss";

  .camera-item {
    position: relative;
    display: block;
    background: $color-dark-background;
    text-decoration: none;
    margin-bottom: -1px;

    &__header {
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: $u-small;
      background: rgba($color-dark-background, 0.5);
    }

    &__name {
      color: $color-primary;
      font-weight: 600;
      margin-left: $u-small;
      font-size: 1.4rem;
      flex: 1 1;
    }

    &__date {
      color: $color-gray-lighter;
      font-size: 1.5rem;
    }

    &__inner {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      color: $color-gray-medium-light;
      min-height: 12rem;

      &__image {
        max-width: 100%;
        width: 100%;
      }

      &__icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
</style>
