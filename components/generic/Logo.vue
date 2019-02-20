<template>
  <v-flex class="logo-container">
    <img :src="src" />
  </v-flex>
</template>

<script>
import { resolve } from 'fast-url-parser';
export default {
  props: {
    type: { type: String, default: 'main' },
    icon: { type: Boolean, default: false }
  },
  computed: {
    src() {
      const { icon = false } = this;
      let { type = 'main' } = this;
      if (
        [
          'main',
          'main-transparent',
          'reverse-dark',
          'reverse-transparent'
        ].indexOf(type) === -1
      ) {
        type = 'main';
      }
      return resolve(process.env.baseUrl, `logo/moerae-${icon ? 'icon' : 'logo'}-${type}.svg`);
    }
  }
};
</script>
