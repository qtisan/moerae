<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-xs-center">
        <TopNavi />
        {{ $t('home') }}
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import TopNavi from '~/components/generic/TopNavi.vue';

export default {
  components: {
    TopNavi
  }
};
</script>
