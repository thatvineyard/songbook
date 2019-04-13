<template>
  <div id="app">
    <NavBar v-bind:links="links" />
    <div id="content">
      <DashboardVue v-bind:settings="[
    {name: 'Preview'}, {name: 'Animation'}, {name: 'Setting #3'}
    ]" />
      <LineBreakVue v-bind:margin="'40px'" />
      <SongList />
    </div>
  </div>
</template>

<script>
import SongList from './components/SongList.vue';
import NavBar from './components/layout/NavBar.vue';
import DashboardVue from './components/layout/Dashboard.vue';
import LineBreakVue from './components/layout/LineBreak.vue';

export default {
  name: 'app',
  components: {
    SongList,
    NavBar,
    DashboardVue,
    LineBreakVue,
  },
  mounted() {},
  data() {
    return {
      links: {
        logo: {
          name: 'thatvineyard',
          ref: 'https://www.thatvineyard.com',
          img: './assets/wlogo-flat-red-transparent.png',
        },
        left: [
          { name: 'About', ref: '/about' },
          { name: 'About', ref: '/about' },
          { name: 'About', ref: '/about' },
        ],
        right: [
          { name: 'About', ref: '/about' },
          { name: 'About', ref: '/about' },
          { name: 'About', ref: '/about' },
        ],
      },
    };
  },
};
</script>

<style lang="scss">
@import "./styles/base-settings.scss";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
}

#content {
  padding-top: 80px;
  max-width: $content-max-width;
  margin: auto;
}
</style>
