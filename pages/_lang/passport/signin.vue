<template>
  <v-container>
    <v-layout>
      <v-flex md5>
        <v-btn @click="signin()">
          Signin
        </v-btn>
        <h3>{{ currentUser.id ? `Hello, ${currentUser.name}!` : 'you should Login!' }}</h3>
        <p v-if="currentUser.id">
          TEL: <em>{{ currentUser.phone }}</em>
        </p>
        <p>{{ status }}</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import gql from 'graphql-tag';

export default {
  apollo: {
    status: gql`{ 
      status 
    }`
  },
  data() {
    return {
      status: ''
    };
  },
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    ...mapActions(['signin'])
  }
};
</script>
