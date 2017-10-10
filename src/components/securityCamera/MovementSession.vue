<template>
  <LoadingSlot :loading="fetching">
    <div class="movement-session">
      <div class="movement-session__header">
        <MovementSessionInfos :movementSession="movementSession"/>
        <MovementSessionDate :date="movementSession.start"/>
      </div>
      <videoPlayer class="movement-session__video-player" :options="playerOptions" v-if="playerOptions" width="320" height="240"/>

      <transition
        appear
        v-on:enter="onCarouselEnter"
        v-on:after-enter="afterCarouselEnter"
        v-on:leave="onCarouselLeave">
        <Carousel :images="carouselImages" v-if="showImages"/>
      </transition>

      <ExtraActionsContainer class="movement-session__extra-actions">
        <div class="btn__container">
          <SubmitButton
            class="btn--dark btn--alert"
            type="button"
            :onClick="deleteMovementSession"
            :disabled="deleting"
            :loading="deleting"
            text="Delete"/>
          <button type="button"
            v-on:click="toggleImages()"
            v-if="imagesLength"
            class="btn">{{showImages ? 'Hide images' : 'Show all ' + imagesLength + ' images'}}</button>
        </div>
      </ExtraActionsContainer>
    </div>
  </LoadingSlot>
</template>

<script>
  import { videoPlayer } from 'vue-video-player';
  import moment from 'moment';
  import urls from 'urls';
  import Velocity from 'velocity-animate';
  import animationUtils from '@/animations/utils';
  import MovementSessionDate from '@/components/securityCamera/MovementSessionDate';
  import MovementSessionInfos from '@/components/securityCamera/MovementSessionInfos';
  import ExtraActionsContainer from '@/components/common/ExtraActionsContainer';
  import SubmitButton from '@/components/common/SubmitButton';
  import Carousel from '@/components/common/Carousel';
  import LoadingSlot from '@/components/common/LoadingSlot';

  const selectors = {
    carouselInner: '.carousel__inner',
  };

  export default {
    name: 'MovementSessions',
    computed: {
      movementSession() {
        return this.$store.state.securityCamera.movementSession;
      },
      imagesLength() {
        return this.movementSession
          && this.movementSession.images
          && this.movementSession.images.length;
      },
      playerOptions() {
        return this.movementSession && this.movementSession.videos ? {
          start: 0,
          playsinline: false,
          muted: true,
          language: 'en',
          sources: [{
            type: 'video/mp4',
            src: `${urls.videos}${this.movementSession._id}.mp4`,
          }],
          poster: '',
        } : undefined;
      },
      carouselImages() {
        return this.movementSession.images.map(({ image, date }) => ({
          src: urls.images + image,
          date,
        }));
      },
      date() {
        if (!this.movementSession) {
          return {};
        }
        const startDate = moment(this.movementSession.start);
        return {
          day: startDate.format('DD'),
          month: startDate.format('MMMM'),
          year: startDate.format('YYYY'),
        };
      },
    },
    components: {
      Carousel,
      MovementSessionDate,
      MovementSessionInfos,
      videoPlayer,
      ExtraActionsContainer,
      SubmitButton,
      LoadingSlot,
    },
    data() {
      return {
        fetching: true,
        showImages: false,
        deleting: false,
      };
    },
    methods: {
      toggleImages() {
        this.showImages = !this.showImages;
      },
      deleteMovementSession() {
        this.deleting = true;
        this.$store.dispatch('deleteMovementSession', this.movementSession._id)
          .finally(() => {
            this.deleting = false;
            this.$router.push({ name: 'movementSessions' });
          });
      },
      onCarouselEnter(el, done) {
        const carouselInner = animationUtils.get(selectors.carouselInner, el);
        const toHeight = carouselInner.getBoundingClientRect().height;

        animationUtils.setStyle(carouselInner, {
          minHeight: 0,
          opacity: 0,
          overflow: 'hidden',
        });

        Velocity(carouselInner, {
          height: [`${toHeight}px`, 0],
          opacity: 1,
        }, {
          duration: 300,
          complete: done,
        });
      },
      afterCarouselEnter(el) {
        animationUtils.get(selectors.carouselInner, el).removeAttribute('style');
      },
      onCarouselLeave(el, done) {
        const carouselInner = animationUtils.get(selectors.carouselInner, el);

        animationUtils.setStyle(carouselInner, {
          minHeight: 0,
          overflow: 'hidden',
        });

        Velocity(carouselInner, {
          height: 0,
          opacity: 0,
        }, {
          duration: 300,
          complete: done,
        });
      },
    },
    created() {
      this.$store.dispatch('getMovementSessionById', this.$route.params.id)
        .finally(() => {
          this.fetching = false;
        });
    },
  };
</script>

<style lang="scss">
  @import "../../styles/variables.scss";

  .movement-session {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    box-sizing: border-box;

    &__extra-actions {
      flex: 1 1;
      display: flex;
      justify-content: flex-end;
      flex-direction: column;
    }

    &__header {
      display: flex;
      padding: $u-medium;

      .movement-session-infos {
        flex: 1 1;
      }
    }

    &__video-player {
      .video-js {
        width: 320px;
        height: 270px;
        background: $color-dark-background;
      }
    }
  }
</style>
