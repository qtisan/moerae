<template>
  <div>
    <h2>Left Menu</h2>
    <nuxt-child />
  </div>
</template>
<script>
export default {
  layout: 'admin',
  data() {
    return {
      menus: []
    };
  }
};
</script>
