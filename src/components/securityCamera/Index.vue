<template>
  <div>
    <ExtraActionsContainer>
      <div class="btn__container">
        <router-link
          :to="{ name: 'SecurityCamera_Cameras' }"
          class="btn btn--dark">Cameras</router-link>
        <router-link
          :to="{ name: 'SecurityCamera_MovementSessions' }"
          class="btn btn--dark">Movement sessions</router-link>
      </div>
    </ExtraActionsContainer>
    <AnimatedView>
      <router-view></router-view>
    </AnimatedView>
  </div>
</template>

<script>
  import ExtraActionsContainer from '@/components/common/ExtraActionsContainer';
  import AnimatedView from '@/components/common/AnimatedView';

  export default {
    name: 'SecurityCamera',
    components: {
      AnimatedView,
      ExtraActionsContainer,
    },
  };
</script>
