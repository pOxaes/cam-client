<template>
  <AppForm :onSubmit="updatePassword" :disabled="updating" class="view__inner">
    <h2 class="view__title">Update your password</h2>

    <Card padded="true">
      <UnderlinedInputWrapper :model="password" label="Current password">
        <input v-model="password" type="password" :disabled="updating" required/>
      </UnderlinedInputWrapper>

      <UnderlinedInputWrapper :model="newPassword" label="New password">
        <input v-model="newPassword" type="password" :disabled="updating" required/>
      </UnderlinedInputWrapper>

      <UnderlinedInputWrapper :model="newPasswordConfirmation" label="Confirm new password">
        <input v-model="newPasswordConfirmation" type="password" :disabled="updating" required/>
      </UnderlinedInputWrapper>
    </Card>

    <div class="btn__container">
      <SubmitButton
        type="submit"
        :disabled="updating"
        :loading="updating"
        text="Change password"/>
      <router-link
        :to="{ name: 'Profile_Components' }"
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
    name: 'passwordForm',
    components: {
      AppForm,
      Card,
      SubmitButton,
      UnderlinedInputWrapper,
    },
    data() {
      return {
        password: '',
        newPassword: '',
        newPasswordConfirmation: '',
        updating: false,
      };
    },
    methods: {
      updatePassword() {
        if (this.newPassword !== this.newPasswordConfirmation) {
          this.$store.dispatch('createNotification', {
            message: 'confirmation does not match new password.',
            type: 'error',
          });
          return;
        }
        this.updating = true;
        this.$store.dispatch('updateUser', {
          password: this.password,
          newPassword: this.newPassword,
        })
        .then(() => {
          this.$router.push({ name: 'Profile_Components' });
          this.$store.dispatch('createNotification', {
            message: 'Password updated with success!',
            type: 'info',
          });
        })
        .catch(() => {
          this.$store.dispatch('createNotification', {
            message: 'Error while updating your password!',
            type: 'error',
          });
        })
        .finally(() => {
          this.updating = false;
        });
      },
    },
  };
</script>
