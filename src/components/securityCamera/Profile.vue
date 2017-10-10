<template>
  <Card>
    <Checkbox class="field field--border" v-model="model.allowMails" label="Enable emails"/>
    <Checkbox class="field field--border" v-model="model.allowPushNotifications" label="Enable Push Notifications"/>
  </Card>
</template>

<script>
  import Card from '@/components/common/Card';
  import Checkbox from '@/components/form/Checkbox';

  export default {
    name: 'SecurityCameraProfile',
    props: ['model'],
    components: {
      Card,
      Checkbox,
    },
  };
</script>
