<template>
  <div
    class="song-list"
    v-if="songs"
  >
    <DashboardVue v-bind:settings="[
    {name: 'Preview'}, {name: 'Animation'}, {name: 'Setting #3'}
    ]" />
    <LineBreakVue v-bind:margin="'40px'" />
    <SongCardVue
      v-for="songId in songs"
      :key="songId"
      v-bind:songId='songId'
      v-bind:preview='"no-preview"'
    />
  </div>
</template>

<script lang="ts">
// import vue from 'vue';
import axios from 'axios';
import urlJoin from 'url-join';
import SongCardVue from './SongCard.vue';
import DashboardVue from './layout/Dashboard.vue';
import LineBreakVue from './layout/LineBreak.vue';

export default {
  name: 'song-list',
  components: {
    SongCardVue,
    DashboardVue,
    LineBreakVue,
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
  padding-top: 20px;
  width: 80%;
  min-width: 300px;
  margin: auto;
}
</style>
