<template>
  <div>
    <ExtraActionsContainer>
      <div class="btn__container">
        <router-link
        :to="{ name: 'Profile_RenewPassword' }"
        class="btn btn--dark">Renew password</router-link>
        <router-link
        :to="{ name: 'Profile_PersonalInformations' }"
        class="btn btn--dark">Update email</router-link>
      </div>
    </ExtraActionsContainer>
    <LoadingSlot :loading="loading">
      <div class="profile__forms">
        <AppForm :onSubmit="updatePreferences" :disabled="updating">
          <h2 class="view__title">Security Camera</h2>
          <SecurityCameraProfile :model="model.securityCamera" v-if="model.securityCamera"/>
          <div class="btn__container">
            <SubmitButton
              type="submit"
              :disabled="updating"
              :loading="updating"
              text="Save"/>
            <button class="btn btn--warning" type="button" v-on:click="resetModel()">cancel</button>
          </div>
        </AppForm>
      </div>
    </LoadingSlot>
  </div>
</template>

<script>
import _ from 'lodash';
import SecurityCameraProfile from '@/components/securityCamera/Profile';
import SubmitButton from '@/components/common/SubmitButton';
import AppForm from '@/components/form/AppForm';
import LoadingSlot from '@/components/common/LoadingSlot';
import ExtraActionsContainer from '@/components/common/ExtraActionsContainer';

export default {
  name: 'ProfileComponents',
  data() {
    return {
      showPasswordForm: false,
      showEmailForm: false,
      updating: false,
      loading: !this.$store.state.currentUser._id,
      model: {},
    };
  },
  components: {
    AppForm,
    ExtraActionsContainer,
    LoadingSlot,
    SecurityCameraProfile,
    SubmitButton,
  },
  computed: {
    preferences() {
      return {
        securityCamera: this.$store.state.currentUser.securityCamera,
      };
    },
    currentUser() {
      return this.$store.state.currentUser;
    },
  },
  watch: {
    preferences() {
      this.model = _.cloneDeep(this.preferences);
    },
  },
  methods: {
    updatePreferences() {
      const that = this;
      this.updating = true;
      this.$store.dispatch('updateUser', _.cloneDeep(this.model))
        .then(() => {
          this.$store.dispatch('createNotification', {
            message: 'Preferences updated with success!',
            type: 'info',
          });
        })
        .finally(() => {
          that.updating = false;
        });
    },
    resetModel() {
      this.model = _.cloneDeep(this.preferences);
    },
    togglePasswordForm(shouldShow) {
      this.showEmailForm = false;
      this.showPasswordForm = typeof shouldShow !== 'undefined' ? shouldShow : !this.showPasswordForm;
    },
    toggleEmailForm(shouldShow) {
      this.showPasswordForm = false;
      this.showEmailForm = typeof shouldShow !== 'undefined' ? shouldShow : !this.showEmailForm;
    },
  },
  created() {
    this.$store.dispatch('getCurrentUser')
      .finally(() => {
        this.loading = false;
      });
  },
};
</script>

<style lang="scss">
  @import "../../styles/variables.scss";

  .profile {

    &__forms {
      padding: 0 $u-medium $u-medium;
    }
  }
</style>
