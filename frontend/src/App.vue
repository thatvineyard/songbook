<template>
  <div id="app">
    <NavBar v-bind:links="links" />
    <div id="content">
      <SongList />
    </div>
  </div>
</template>

<script>
import SongList from './components/SongList.vue';
import NavBar from './components/layout/NavBar.vue';

export default {
  name: 'app',
  components: {
    SongList,
    NavBar,
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
          {
            name: 'About',
            ref: '/about',
          },
          { name: 'About', ref: '/about' },
        ],
        right: [
          { name: 'About', ref: '/about' },
          { name: 'About', ref: '/about' },
          { name: 'About', ref: '/about' },
          { name: 'About', ref: '/about' },
          { name: 'About', ref: '/about' },
          { name: 'About', ref: '/about' },
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
body {
  margin: 0;
  padding: 0;
  background: $background;
  // color: #cdcdcd;
  font-family: "Times", "Avenir", sans-serif;
}

h1,
h2 {
  font-family: "Lato", Arial;
  font-weight: bold;
  font-size: 1.4em;
  letter-spacing: 2px;
  font-variant: small-caps;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  margin-top: 60px;
}

#content {
  max-width: $content-max-width;
  margin: auto;
  @media screen and (max-width: $break-small-horiz),
    (max-height: $break-small-vert) {
    font-size: 0.8em;
  }
}
</style>
