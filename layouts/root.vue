<template>
  <v-app>
    <nuxt />
  </v-app>
</template>
<script>
export default {
  head() {
    return {
      title: this.$t('home')
    };
  }
};
</script>
