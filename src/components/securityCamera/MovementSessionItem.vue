<template>
  <Card class="movement-session-item" :class="{'false-positive': falsePositive}">
    <router-link class="movement-session-item__link"
      :to="{ name: 'SecurityCamera_MovementSession', params: { id: movementSession._id }}">
      <div class="movement-session-item__header">
        <MovementSessionInfos :movementSession="movementSession"/>
      </div>
      <div class="movement-session-item__thumbnail">
          <img v-bind:src="imgUrl + movementSession.images[0].image"/>
      </div>
    </router-link>
  </Card>
</template>

<script>
  import urls from 'urls';
  import Card from '@/components/common/Card';
  import MovementSessionInfos from '@/components/securityCamera/MovementSessionInfos';

  const isFalsePositive = images => images && images.length === 1;

  export default {
    name: 'MovementSessionItem',
    props: ['movementSession'],
    data() {
      return {
        imgUrl: urls.images,
        thumbnails: [],
      };
    },
    components: {
      Card,
      MovementSessionInfos,
    },
    computed: {
      falsePositive: component => isFalsePositive(component.movementSession.images),
    },
  };
</script>

<style lang="scss">
  @import "../../styles/variables.scss";

  .movement-session-item {
    margin: $u-medium;

    &__link {
      display: flex;
      justify-content: space-between;
      text-decoration: none;
      color: $color-text;
    }

    &__header {
      position: relative;
      flex: 1 1;
      padding: $u-medium;
      margin-right: $u-medium;
    }

    &__thumbnail {
      width: 11rem;
      position: relative;
      background: red;
      overflow: hidden;

      img {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        max-width: 120%;
        max-height: 120%;
      }
    }
  }

</style>
