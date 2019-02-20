<template>
  <div class="layout-admin">
    <TopNavbar class="top-navbar-admin" />
    <div class="left-menu-warpper">
      <LeftMenu class="left-menu-admin" />
    </div>
    <div class="container-admin">
      <div class="content-warpper">
        <nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import TopNavbar from '~/components/generic/TopNavbar.vue';
import LeftMenu from '~/components/generic/LeftMenu.vue';
export default {
  layout: 'root',
  components: { TopNavbar, LeftMenu },
  head() {
    return {
      title: this.$t('manage'),
      titleTemplate: `%s | ${this.$t('name')}`
    };
  }
};
</script>
