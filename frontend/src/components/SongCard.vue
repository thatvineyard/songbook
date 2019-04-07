<template>
  <div class="card wrapper">
    <div class="container">
      <div v-if='song'>
        <div class="top">
          <div class="title">
            <h2>{{song.title}}</h2>
          </div>
          <div class="edit">
            <p>◥</p>
          </div>
        </div>
        <div class="bottom">
          <div id="info">
            <div class="melody">
              <h3>Mel.</h3>
              {{song.melody}}
            </div>
            <div class="artist">
              <h3>Tex.</h3>
              Tex. {{song.artist}}
            </div>
          </div>
          <div id='lyrics'>
            <div class='stansa'>
              <h4>Verse</h4>
              <p> lyrics are lyrics </p>
              <p> lyrics do a lot aof lyrics </p>
              <p> lyrics and a more more lyric please </p>
              <p> i want it lyrics </p>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <h2>Pending</h2>
        <p>Pending</p>
        <p>Pending</p>
        <p>Pending</p>
      </div>
      <div class="fade">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';

export default Vue.extend({
  name: 'song-card',
  props: ['songId'],
  data() {
    return {
      song: undefined,
    };
  },
  created() {
    this.getSongInfo(this.songId).then((data) => {
      this.song = data.entryData;
    });
  },
  methods: {
    getSongInfo(id) {
      return axios
        .get(`${this.$rootApi}/v1/songs/collection/${id}`)
        .then(response => response.data);
    },
  },
});
</script>

<style lang="scss" scoped>
.melody,
.artist {
  font-size: 0.8em;
  font-style: italic;
}

.clear {
  clear: both;
}
.wrapper {
  width: 80%;
  // height: 500px;
  margin: auto;
  margin-top: 1%;
  position: relative;
  overflow: hidden;
  border-radius: 10px 10px 0px 0px;
  // border-color: rgba(100, 103, 122, 0.424);
  // border-width: 4px;
  // border-style: solid;
  box-shadow: 0px -30px 20px rgba(89, 92, 98, 0.1);
  transform: scale(0.98);
  transition: box-shadow 0.2s, transform 0.2s;
  &:hover {
    transform: scale(1) translate(0, -30px);
    box-shadow: 0px -30px 30px rgba(89, 92, 98, 0.5);
  }

  .container {
    width: 100%;
    height: 100%;

    .top {
      height: 30%;
      min-height: 5em;
      width: 100%;
      box-shadow: 0px 0px 50px rgba(89, 92, 98, 0.5);

      background: rgb(58, 60, 82);
      color: white;
      // overflow: hidden;
      display: inline-flex;

      .title {
        display: block;
        text-align: left;

        padding-left: 10px;
        width: 80%;
      }
      .edit {
        text-align: right;
        // width: 4em;
        margin-left: auto;
        margin-right: 8px;
        // margin-bottom: auto;

        color: rgb(250, 250, 250);
        text-align: center;
        transition: 0.5s;
        font-size: 1.8em;
        & p {
          margin-top: 0;
          margin-right: 0;
          font-weight: bold;
        }

        &:hover {
          text-shadow: 0px 0px 50px rgba(255, 255, 255, 0.4);
          color: #ffffff;
        }
      }
    }
    .bottom {
      background: rgb(255, 255, 255);
      padding-left: 2%;
      padding-right: 2%;
      padding-top: 10px;
      padding-bottom: 2px;
      width: 96%;
      transition: transform 0.5s;

      h1 {
        margin: 0;
        padding: 0;
      }
      p {
        margin: 0;
        padding: 0;
      }

      & #info {
        padding-left: 10%;
        padding-right: 10%;
        padding-bottom: 20px;
        display: flex;
        flex-wrap: wrap;
        & div {
          & h3 {
            margin-bottom: 0;
          }
          min-width: 200px;
          width: 30%;
          text-align: center;
          margin: auto;
        }
      }
      & #lyrics {
        font-size: 0.8em;
        text-align: center;

        & .stansa {
          & h4 {
            color: lightgray;
            padding-left: 10%;
            text-align: left;
            font-size: 0.8em;
            margin: 0;
            font-style: italic;
            font-weight: normal;
          }
          margin-top: 10px;
          margin-bottom: 2px;
        }
      }
    }

    .fade {
      box-shadow: 0px 0px 0px rgba(89, 92, 98, 0);
      height: 50px;
      background-image: linear-gradient(
        to bottom,
        rgb(255, 255, 255),
        rgba(255, 255, 255, 0)
      );
    }
  }
}
</style>
