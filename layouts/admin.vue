<template>
  <div>
    <TopNavi />
    <nuxt />
  </div>
</template>

<script>
import TopNavi from '~/components/generic/TopNavi.vue';
export default {
  layout: 'root',
  components: { TopNavi },
  head() {
    return {
      title: this.$t('manage')
    };
  }
};
</script>
