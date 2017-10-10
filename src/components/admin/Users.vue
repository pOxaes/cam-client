<template>
  <div class="view__inner">
    <LoadingSlot :loading="loading" class="users">
      <User
        v-for="user in users"
        :user="user"
        :callbacks="{ goToUserEdition, deleteUser }"
        :key="user._id"/>
    </LoadingSlot>
    <ActionButton :action="goToUserEdition" icon="ios-add"/>
  </div>
</template>

<script>
  import ActionButton from '@/components/common/ActionButton';
  import User from '@/components/admin/User';
  import LoadingSlot from '@/components/common/LoadingSlot';

  export default {
    name: 'Users',
    components: {
      ActionButton,
      LoadingSlot,
      User,
    },
    data() {
      return {
        loading: false,
      };
    },
    methods: {
      deleteUser(user) {
        this.$store.dispatch('deleteUser', user._id);
      },
      goToUserEdition(id) {
        const nextRoute = id ? {
          name: 'Admin_UserUpdate',
          params: {
            id,
          },
        } : { name: 'Admin_UserCreate' };
        this.$router.push(nextRoute);
      },
      toggleUserForm(shouldShow) {
        this.showUserForm = typeof shouldShow !== 'undefined' ? shouldShow : !this.showUserForm;
      },
    },
    computed: {
      users() {
        return this.$store.state.users;
      },
    },
    created() {
      this.loading = !this.$store.state.users.length;
      this.$store.dispatch('getUsers')
        .then(() => {
          this.loading = false;
        });
    },
  };
</script>
