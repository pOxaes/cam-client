<template>
  <div class="view__inner">
    <LoadingSlot :loading="fetching">
      <AppForm :onSubmit="save" :disabled="saving" class="user-form">
        <h2 class="view__title">Profile</h2>
        <Card class="user-form__card">
          <UnderlinedInputWrapper :model="model.email" label="Email">
            <input v-model="model.email" type="email" :disabled="saving" required/>
          </UnderlinedInputWrapper>

          <UnderlinedInputWrapper :model="model.name" label="Name">
            <input v-model="model.name" :disabled="saving" required/>
          </UnderlinedInputWrapper>
        </Card>

        <h2 class="view__title">Security Camera</h2>
        <SecurityCameraProfile :model="model.securityCamera" :disabled="saving"/>

        <div class="btn__container">
          <SubmitButton type="submit" :disabled="saving" :loading="saving" text="Save"/>
          <button class="btn btn--warning" type="button" v-on:click="cancel()">Cancel</button>
        </div>
      </AppForm>
    </LoadingSlot>
  </div>
</template>

<script>
import AppForm from '@/components/form/AppForm';
import Card from '@/components/common/Card';
import SecurityCameraProfile from '@/components/securityCamera/Profile';
import SubmitButton from '@/components/common/SubmitButton';
import UnderlinedInputWrapper from '@/components/form/UnderlinedInputWrapper';
import LoadingSlot from '@/components/common/LoadingSlot';

export default {
  name: 'UserEdition',
  data() {
    return {
      saving: false,
      fetching: !!this.$route.params.id,
      model: {
        securityCamera: {},
      },
    };
  },
  components: {
    AppForm,
    Card,
    LoadingSlot,
    SecurityCameraProfile,
    SubmitButton,
    UnderlinedInputWrapper,
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  watch: {
    user() {
      this.model = Object.assign(this.model, this.user);
    },
  },
  methods: {
    save() {
      this.saving = true;
      const mutationType = this.model._id ? 'updateUser' : 'createUser';
      this.$store.dispatch(mutationType, this.model)
        .then(() => {
          this.$router.push({ name: 'Admin' });
        })
        .finally(() => {
          this.saving = false;
        });
    },
    cancel() {
      this.$router.push({ name: 'Admin_Users' });
    },
  },
  beforeCreate() {
    if (this.$route.params.id) {
      this.$store.dispatch('getUser', this.$route.params.id)
        .finally(() => {
          this.fetching = false;
        });
    }
  },
};
</script>

<style lang="scss">
  @import "../../styles/variables.scss";

  .user-form {

    &__card {
      padding: $u-medium;
    }
  }
</style>
