<template>
  <div class="view__inner">
    <h3 class="view__title" v-if="camera">{{camera.name}}</h3>
    <LoadingSlot :loading="fetching">
      <AppForm :onSubmit="onSubmit" :disabled="saving" v-if="!fetching && cameraParameters">
        <Card>
          <div
            v-for="(value, key) in fields"
            :key="key"
            class="field"
            :class="{'field--border': value.type === 'checkbox'}">
            <Checkbox
              v-if="value.type === 'checkbox'"
              :label="value.label"
              v-model="formData[key]"/>

            <UnderlinedInputWrapper
              v-if="value.type === 'text'"
              :model="formData[key]"
              :label="value.label">
              <input
                type="text"
                v-model="formData[key]"
                :disabled="saving"
                v-on:input="onChange()"
                required/>
            </UnderlinedInputWrapper>

            <UnderlinedInputWrapper
              v-if="value.type === 'number'"
              :model="formData[key]"
              :label="value.label">
              <input
                type="number"
                v-model="formData[key]"
                :disabled="saving"
                v-on:input="onChange()"
                required/>
            </UnderlinedInputWrapper>

            <UnderlinedInputWrapper
              v-if="value.type === 'list'"
              :model="formData[key]"
              :label="value.label">
              <CustomSelect
                :parameters="{ noClear: true }"
                :options="value.values"
                v-model="formData[key]"/>
            </UnderlinedInputWrapper>

          </div>
        </Card>

        <div class="btn__container">
          <SubmitButton
            type="submit"
            :disabled="saving"
            :loading="saving"
            text="Save"/>
          <button type="button"
            class="btn btn--warning"
            v-on:click="cancel()">
            Cancel
          </button>
        </div>
      </AppForm>
    </LoadingSlot>
  </div>
</template>

<script>
  import _ from 'lodash';
  import AppForm from '@/components/form/AppForm';
  import Card from '@/components/common/Card';
  import Checkbox from '@/components/form/Checkbox';
  import SubmitButton from '@/components/common/SubmitButton';
  import UnderlinedInputWrapper from '@/components/form/UnderlinedInputWrapper';
  import CustomSelect from '@/components/form/CustomSelect';
  import LoadingSlot from '@/components/common/LoadingSlot';
  import cameraParametersService from '@/api/services/cameraParameters.service';

  export default {
    name: 'CameraParameters',
    props: [
      'save',
    ],
    components: {
      AppForm,
      Card,
      Checkbox,
      CustomSelect,
      LoadingSlot,
      SubmitButton,
      UnderlinedInputWrapper,
    },
    computed: {
      cameraParameters() {
        return this.$store.state.securityCamera.cameraParameters;
      },
    },
    data() {
      return {
        hasChanged: false,
        saving: false,
        fields: cameraParametersService.FIELDS,
        formData: undefined,
        camera: undefined,
        fetching: true,
      };
    },
    watch: {
      cameraParameters() {
        this.formData = _.clone(this.cameraParameters);
      },
    },
    methods: {
      onChange() {
        this.hasChanged = true;
      },
      cancel() {
        this.$router.push({ name: 'SecurityCamera_Camera', params: { id: this.camera._id } });
      },
      onSubmit() {
        this.saving = true;
        this.$store.dispatch('updateCameraParameters', {
          id: this.$route.params.id,
          parameters: this.formData,
        })
        .then(() => {
          this.$router.push({ name: 'SecurityCamera_Camera', params: { id: this.camera._id } });
          this.$store.dispatch('createNotification', {
            message: `${this.camera.name} camera parameters saved`,
            type: 'success',
          });
        })
        .finally(() => {
          this.saving = false;
        });
      },
    },
    beforeCreate() {
      this.$store.dispatch('getCameras')
      .then(() => {
        this.camera = _.find(this.$store.state.securityCamera.cameras, camera =>
          camera._id === this.$route.params.id);

        if (!this.camera.isConnected) {
          this.$store.dispatch('createNotification', {
            message: 'You cannot edit camera parameters while it is offline.',
            type: 'warning',
          });
          this.$router.replace({ name: 'SecurityCamera_Camera', params: { id: this.camera._id } });
        }

        return this.$store.dispatch('getCameraParametersById', this.$route.params.id);
      })
      .finally(() => {
        this.fetching = false;
      });
    },
  };
</script>

<style lang="scss">
  @import "../../styles/variables.scss";
</style>
