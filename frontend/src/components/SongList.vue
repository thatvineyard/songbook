<template>
  <div
    class="song-list"
    v-if="songs"
  >
    <TopButtonsVue v-bind:settings="[{name: 'Preview'}, {name: 'Setting #2'}, {name: 'Setting #3'}]" />
    <SongCardVue
      v-for="songId in songs"
      :key="songId"
      v-bind:songId='songId'
      v-bind:preview='"no-preview"'
    />
  </div>
</template>

<script lang="ts">
import vue from 'vue';
import axios from 'axios';
import urlJoin from 'url-join';
import SongCardVue from './SongCard.vue';
import TopButtonsVue from './layout/TopButtons.vue';

export default {
  name: 'song-list',
  components: {
    SongCardVue,
    TopButtonsVue,
  },

  data() {
    return {
      songs: undefined,
    };
  },

  created() {
    this.getSongIndex().then((data) => {
      this.songs = data;
    });
  },

  methods: {
    getSongIndex() {
      return axios.get(urlJoin(this.$rootApi, '/v1/songs/index')).then(
        response => response.data,
      );
    },
  },
};
</script>

<style scoped>
.song-list {
  padding-top: 20px;
  width: 80%;
  min-width: 300px;
  margin: auto;
}
</style>
