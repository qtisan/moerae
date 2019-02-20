<template>
  <div class="layout-website">
    <TopNavbar />
    <nuxt />
  </div>
</template>

<script>
import TopNavbar from '~/components/generic/TopNavbar.vue';
export default {
  layout: 'root',
  components: { TopNavbar },
  head() {
    return {
      title: this.$t('website')
    };
  }
};
</script>
