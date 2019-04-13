<template>
  <div
    class="song-list"
    v-if="songs"
  >
    <SongCardVue
      v-for="songId in songs"
      :key="songId"
      v-bind:songId='songId'
      v-bind:preview='"preview"'
    />
  </div>
</template>

<script lang="ts">
// import vue from 'vue';
import axios from 'axios';
import urlJoin from 'url-join';
import SongCardVue from './SongCard.vue';

export default {
  name: 'song-list',
  components: {
    SongCardVue,
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
        .get(urlJoin(this.$rootApi, '/v1/songs/index'))
        .then(response => response.data);
    },
  },
};
</script>

<style lang="scss" scoped>
.song-list {
  // padding-top: 20px;
  width: 80%;
  min-width: 300px;
  margin: 0px auto;
}
</style>
