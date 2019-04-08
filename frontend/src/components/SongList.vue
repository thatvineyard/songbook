<template>
  <div
    class="song-list"
    v-if="songs"
  >
    <TopButtons v-bind:settings="[{name: 'Preview'}, {name: 'Setting #2'}, {name: 'Setting #3'}]" />
    <SongCard
      v-for="songId in songs"
      :key="songId"
      v-bind:songId='songId'
      v-bind:preview='"no-preview"'
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import SongCard from './SongCard.vue';
import TopButtons from './layout/TopButtons.vue';

export default Vue.extend({
  name: 'song-list',
  components: {
    SongCard,
    TopButtons,
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
      return axios
        .get(`${this.$rootApi}/v1/songs/index`)
        .then(response => response.data);
    },
  },
});
</script>

<style scoped>
.song-list {
  padding-top: 20px;
  width: 80%;
  min-width: 300px;
  margin: auto;
}
</style>
