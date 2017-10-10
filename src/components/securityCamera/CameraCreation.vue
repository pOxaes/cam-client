<template>
    <AppForm :onSubmit="onSubmit" :disabled="saving" class="view__inner">
      <h2 class="view__title">Create new camera</h2>

      <Card padded="true">
        <UnderlinedInputWrapper :model="name" label="New camera name">
          <input v-model="name" type="text" :disabled="saving" required/>
        </UnderlinedInputWrapper>
      </Card>

      <div class="btn__container">
        <SubmitButton
          type="submit"
          :disabled="saving"
          :loading="saving"
          text="Create camera"/>
        <router-link
          :to="{ name: 'SecurityCamera_Cameras' }"
          class="btn btn--warning">Cancel</router-link>
      </div>
  </AppForm>
</template>

<script>
  import AppForm from '@/components/form/AppForm';
  import Card from '@/components/common/Card';
  import SubmitButton from '@/components/common/SubmitButton';
  import UnderlinedInputWrapper from '@/components/form/UnderlinedInputWrapper';

  export default {
    name: 'CameraCreation',
    data() {
      return {
        saving: false,
        name: '',
      };
    },
    components: {
      AppForm,
      Card,
      SubmitButton,
      UnderlinedInputWrapper,
    },
    methods: {
      onSubmit() {
        this.saving = true;
        this.$store.dispatch('createCamera', this.name)
          .then(() => {
            this.name = '';
            this.$router.push({ name: 'SecurityCamera_Cameras' });
          })
          .finally(() => {
            this.saving = false;
          });
      },
    },
  };
</script>
