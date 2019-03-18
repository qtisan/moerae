<template>
  <v-app class="root">
    <nuxt />
  </v-app>
</template>
<script>
export default {
  head() {
    return {
      title: this.$t('home'),
      titleTemplate: `%s | ${this.$t('name')}`
    };
  }
};
</script>
