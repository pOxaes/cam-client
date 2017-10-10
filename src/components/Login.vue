<template>
  <div class="login">
    <div class="login__header">
      <Logo size="big"/>
      <h1 class="login__title">klOe</h1>
    </div>
    <AppForm :onSubmit="onSubmit" :disabled="checkingLogin">
      <UnderlinedInputWrapper icon="ios-mail-outline" :model="email" light="true">
        <input v-model="email" type="email" placeholder="email" :disabled="checkingLogin" required/>
      </UnderlinedInputWrapper>
      <UnderlinedInputWrapper icon="ios-lock-outline" :model="password" light="true">
        <input v-model="password" type="password" placeholder="password" :disabled="checkingLogin" required/>
      </UnderlinedInputWrapper>
      <div class="">
        <SubmitButton class="btn--dark login__submit" type="submit" :disabled="checkingLogin" :loading="checkingLogin" text="Log In"/>
      </div>
    </AppForm>
  </div>
</template>

<script>
import UnderlinedInputWrapper from '@/components/form/UnderlinedInputWrapper';
import Logo from '@/components/common/Logo';
import SubmitButton from '@/components/common/SubmitButton';
import AppForm from '@/components/form/AppForm';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      checkingLogin: false,
    };
  },
  components: {
    UnderlinedInputWrapper,
    Logo,
    SubmitButton,
    AppForm,
  },
  methods: {
    onSubmit() {
      this.checkingLogin = true;
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password,
      })
      .then(token => this.$store.dispatch('connect', { token, store: this.$store }))
      .then(() => {
        this.$router.replace({ name: 'SecurityCamera_MovementSessions' });
      })
      .catch(() => {
        this.$store.dispatch('createNotification', {
          message: 'error while connecting',
          type: 'error',
        });
      })
      .finally(() => {
        this.checkingLogin = false;
      });
    },
  },
  beforeCreate() {
    if (this.$store.state.isLoggedIn) {
      this.$router.replace({ name: 'SecurityCamera_MovementSessions' });
    }
  },
};

</script>

<style lang="scss">
  @import "../styles/variables.scss";

  .login {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    min-height: 100vh;
    min-width: 100vw;

    display: flex;
    flex-direction: column;
    justify-content: space-around;

    padding: $u-extraLarge;
    box-sizing: border-box;

    background: $color-dark-background;
    // background: linear-gradient(to bottom, $color-dark-background-grad1 0%,$color-dark-background-grad2 100%);
    color: $color-text-reversed;

    form {
      display: flex;
      flex-direction: column;
    }

    &__header {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    &__submit {
      display: block;
      width: 100%;
    }

    &__title {
      text-align: center;
      margin-top: $u-large;
    }

    .btn {
      margin-top: $u-large;
    }

  }

  @media screen and (max-height: 360px) {

    .login__header {
      flex-direction: row;
      align-items: center;
      justify-content: center;

      img {
        transform: scale(0.5);
        margin-left: -9rem;
      }
    }

  }
</style>
