<template>
  <div v-if="camera" class="camera">
    <div class="camera__header">
      <h3 class="view__title camera__header__name">{{camera.name}}<button v-on:click="toggleNameForm(true)" class="btn btn--icon"><Icon icon="md-create" size="big"/></button></h3>

      <router-link
        v-if="camera.isConnected"
        :to="{ name: 'SecurityCamera_CameraParameters', params: { id: camera._id }}"
        class="btn btn--icon"><Icon icon="ios-settings" size="big"/></router-link>

      <CameraStatus :camera="camera" :parameters="{ label: true }"/>
    </div>

    <AppForm v-if="showNameForm" :onSubmit="saveName" :disabled="saving" class="view__inner">
      <Card padded="true">
        <UnderlinedInputWrapper :model="name" label="Camera name">
          <input v-model="name" type="text" :disabled="saving" required v-on:input="onChange()"/>
        </UnderlinedInputWrapper>
      </Card>
      <div class="btn__container">
        <SubmitButton
          type="submit"
          :disabled="saving || !hasChanged"
          :loading="saving"
          text="Change name"/>
        <button type="button"
          class="btn btn--warning"
          v-on:click="cancelChange()">
          Cancel
        </button>
      </div>
    </AppForm>

    <CameraItem :camera="camera" :parameters="{ name: false, status: false, actions: true }"/>

    <ExtraActionsContainer class="camera__extra-actions">
      <div class="btn__container">
        <SubmitButton
          :onClick="renewPassword"
          class="btn--dark"
          type="button"
          :disabled="renewingPassword"
          :loading="renewingPassword"
          text="Renew password"/>
        <button type="button"
          v-on:click="deleteCamera()"
          class="btn btn--alert">Remove</button>
      </div>
    </ExtraActionsContainer>

    <CameraToken :camera="newCamera"/>
  </div>
</template>

<script>
import _ from 'lodash';
import CameraItem from '@/components/securityCamera/CameraItem';
import CameraStatus from '@/components/securityCamera/CameraStatus';
import CameraToken from '@/components/securityCamera/CameraToken';
import AppForm from '@/components/form/AppForm';
import Card from '@/components/common/Card';
import SubmitButton from '@/components/common/SubmitButton';
import UnderlinedInputWrapper from '@/components/form/UnderlinedInputWrapper';
import ExtraActionsContainer from '@/components/common/ExtraActionsContainer';
import Icon from '@/components/common/Icon';

export default {
  name: 'Camera',
  computed: {
    camera() {
      return _.find(this.$store.state.securityCamera.cameras, camera =>
        camera._id === this.$route.params.id);
    },
    newCamera() {
      return this.$store.state.securityCamera.newCamera
        && this.$store.state.securityCamera.newCamera.id === this.$route.params.id ?
        this.$store.state.securityCamera.newCamera
        : undefined;
    },
  },
  data() {
    return {
      fetching: true,
      deleting: false,
      saving: false,
      name: undefined,
      hasChanged: false,
      showNameForm: false,
      renewingPassword: false,
    };
  },
  components: {
    CameraItem,
    CameraStatus,
    CameraToken,
    AppForm,
    Card,
    Icon,
    SubmitButton,
    UnderlinedInputWrapper,
    ExtraActionsContainer,
  },
  watch: {
    camera(camera) {
      this.name = camera.name;
    },
  },
  methods: {
    onChange() {
      this.hasChanged = true;
    },
    cancelChange() {
      this.hasChanged = false;
      this.name = this.camera.name;
      this.toggleNameForm(false);
    },
    saveName() {
      this.saving = true;
      this.$store.dispatch('updateCamera', { ...this.camera, name: this.name })
        .finally(() => {
          this.saving = false;
          this.hasChanged = false;
        });
    },
    renewPassword() {
      this.renewingPassword = true;
      this.$store.dispatch('renewCameraPassword', this.camera._id)
        .finally(() => {
          this.renewingPassword = false;
        });
    },
    deleteCamera() {
      this.deleting = true;
      this.$store.dispatch('deleteCamera', this.camera._id)
        .finally(() => {
          this.deleting = false;
        });
    },
    toggleNameForm(show) {
      this.showNameForm = typeof show === 'undefined' ? !this.showNameForm : !!show;
    },
  },
  created() {
    this.$store.dispatch('getCameras')
    .finally(() => {
      this.fetching = false;
    });
  },
};
</script>

<style lang="scss">
  @import "../../styles/variables.scss";

  .camera {
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
      justify-content: space-between;
      align-items: center;
      margin: $u-medium;

      &__name {
        flex: 1 1;
        margin: 0;
      }
    }
  }
</style>
