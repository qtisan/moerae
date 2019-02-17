<template>
  <v-flex class="logo-container" :style="{ height: `${height}px` }">
    <img :src="src" :style="{ height: `${height}px`, position: 'relative', top: `${offset}px` }" />
  </v-flex>
</template>

<script>
import { resolve } from 'fast-url-parser';
export default {
  props: {
    type: { type: String, default: 'main' },
    icon: { type: Boolean, default: false },
    size: { type: String, default: 'md' },
    offset: { type: Number, default: 0 }
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
    },
    height() {
      switch (this.size) {
        case 'xl': return 80;
        case 'lg': return 64;
        case 'md': return 48;
        case 'sm': return 32;
        case 'xs': return 16;
        default: break;
      }
      return 48;
    }
  }
};
</script>

<style>
.logo-container {
  display: inline-block;
  animation: turn 2s linear forwards 1s;
  position: relative;
  overflow: hidden;
}
</style>
