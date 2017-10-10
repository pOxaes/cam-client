<template>
  <AppForm :onSubmit="updateEmail" :disabled="updating" class="view__inner">
    <h2 class="view__title">Update your email</h2>

    <Card padded="true">
      <UnderlinedInputWrapper :model="updatedEmail" label="Email">
        <input v-model="updatedEmail" type="email" :disabled="updating" required/>
      </UnderlinedInputWrapper>
    </Card>

    <div class="btn__container">
      <SubmitButton
        type="submit"
        :disabled="updating"
        :loading="updating"
        text="Change email"/>
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
    name: 'PersonalInformations',
    components: {
      AppForm,
      Card,
      SubmitButton,
      UnderlinedInputWrapper,
    },
    data() {
      return {
        updatedEmail: this.$store.state.currentUser.email,
        updating: false,
      };
    },
    computed: {
      email() {
        return this.$store.state.currentUser.email;
      },
    },
    watch: {
      email() {
        this.updatedEmail = this.$store.state.currentUser.email;
      },
    },
    methods: {
      updateEmail() {
        this.updating = true;
        this.$store.dispatch('updateUser', { email: this.updatedEmail })
        .then(() => {
          this.$router.push({ name: 'Profile_Components' });
          this.$store.dispatch('createNotification', {
            message: 'Email updated with success!',
            type: 'info',
          });
        })
        .finally(() => {
          this.updating = false;
        });
      },
    },
  };
</script>
