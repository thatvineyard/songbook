<template>
  <div class="song-list">
    <div v-if="songs">
      <div
        v-for="songId in songs"
        :key="songId"
      >
        <SongCard v-bind:songId='songId' />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import SongCard from './SongCard.vue';

export default Vue.extend({
  name: 'song-list',
  components: {
    SongCard,
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
  padding-left: 10px;
  padding-right: 10px;
  margin: auto;
}
</style>
