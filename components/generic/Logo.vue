<template>
  <div class="moerae-logo">
    <img :src="src" />
  </div>
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

<style>
.moerae-logo {
  display: inline-block;
  animation: turn 2s linear forwards 1s;
  position: relative;
  overflow: hidden;
  height: 180px;
  width: 245px;
}
</style>
