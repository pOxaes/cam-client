<template>
  <div>
    <CameraToken :camera="newCamera"/>
    <LoadingSlot :loading="loading">
      <div class="cameras">
        <CameraItem
          v-for="camera in cameras"
          :camera="camera"
          :key="camera.name"/>
      </div>
    </LoadingSlot>
    <ActionButton :action="goToCameraCreation" icon="ios-add"/>
  </div>
</template>

<script>
import CameraItem from '@/components/securityCamera/CameraItem';
import CameraCreation from '@/components/securityCamera/CameraCreation';
import CameraToken from '@/components/securityCamera/CameraToken';
import ActionButton from '@/components/common/ActionButton';
import LoadingSlot from '@/components/common/LoadingSlot';

export default {
  name: 'Cameras',
  computed: {
    newCamera() {
      return this.$store.state.securityCamera.newCamera;
    },
    cameras() {
      return this.$store.state.securityCamera.cameras;
    },
    password() {
      return this.$store.state.securityCamera.newCameraPassword;
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  components: {
    ActionButton,
    CameraItem,
    CameraCreation,
    CameraToken,
    LoadingSlot,
  },
  methods: {
    goToCameraCreation() {
      this.$router.push({ name: 'SecurityCamera_CameraCreation' });
    },
  },
  created() {
    this.loading = !this.$store.state.securityCamera.cameras.length || true;
    this.$store.dispatch('getCameras')
      .finally(() => {
        this.loading = false;
      });
  },
};

</script>
