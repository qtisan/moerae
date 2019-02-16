<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <Logo />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Logo from './Logo.vue';
export default {
  components: { Logo },
  props: {}
};
</script>
