<template>
  <div>
    <AnimatedView>
      <router-view></router-view>
    </AnimatedView>
  </div>
</template>

<script>
  import AnimatedView from '@/components/common/AnimatedView';

  export default {
    name: 'Profile',
    components: {
      AnimatedView,
    },
  };
</script>
