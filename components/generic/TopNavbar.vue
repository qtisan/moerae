<template>
  <v-toolbar dense dark class="top-navbar">
    <v-toolbar-title>
      <Logo class="top-navbar-logo" type="main-transparent" />
    </v-toolbar-title>
    <v-flex md8>
      <v-tabs dark>
        <v-tab v-for="nav in navs" :key="nav.id" :to="nav.path">
          <v-icon>{{ nav.icon }}</v-icon>
          {{ nav.name }}
        </v-tab>
      </v-tabs>
    </v-flex>
    <v-spacer></v-spacer>
    <v-menu :nudge-width="100" dark>
      <v-toolbar-title slot="activator">
        <span>{{ $t(`languages.${locale}`) }}</span>
        <v-icon dark>
          language
        </v-icon>
      </v-toolbar-title>
      <v-list>
        <v-list-tile
          v-for="(l, i) in locales"
          :key="`${i}_${l}`"
          @click="changeLanguage(l)"
        >
          <v-list-tile-title v-text="$t(`languages.${l}`)"></v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script>
import { mapState } from 'vuex';
import Logo from './Logo.vue';
export default {
  components: { Logo },
  props: {

  },
  data() {
    return {
      navs: [{
        id: '1',
        name: 'Home',
        icon: 'home',
        path: '/manage/dashboard'
      }, {
        id: '2',
        name: 'Users',
        icon: 'person',
        path: '/manage/users'
      }, {
        id: '3',
        name: 'Administration',
        icon: 'settings',
        path: '/manage/administration'
      }]
    };
  },
  computed: {
    ...mapState(['locales', 'locale'])
  },
  mounted() {
    // this.currentLanguage = 'cn';
  },
  methods: {
    changeLanguage(lang) {
      this.$router.replace(
        ['', lang].concat(this.$route.fullPath.split('/').slice(2)).join('/')
      );
    }
  }
};
</script>
