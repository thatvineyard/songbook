<template>
  <div class="card wrapper">
    <input type="checkbox" />
    <div class="container">
      <div v-if='song'>
        <div class="top">
          <div class="title">
            <h2>{{song.title}}</h2>
          </div>
          <div class="edit">
            <a href='edit/song.id' />
            <!--
              <p
            >◥</p> -->
          </div>
        </div>
        <div class="bottom">
          <div id="fog"></div>
          <div id="info">
            <div class="melody">
              <h3>Melody:</h3>
              <p>
                {{song.melody}}
              </p>
            </div>
            <div class="artist">
              <h3>Written by:</h3>
              <p>
                {{song.artist}}
              </p>
            </div>
          </div>
          <div id='lyrics'>
            <div
              class='stanza'
              v-for='stanza in song.stanzas'
              :key='stanza'
            >
              <h4 class='lyrics-teaser'>{{stanza.type}}</h4>
              <p
                class='lyrics-teaser'
                v-for='line in stanza.lines'
                :key='line'
              > {{line}} </p>
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
  transition: 0.5s;
  &:hover {
    transform: scale(1) translate(0, -30px);
    box-shadow: 0px -30px 30px rgba(89, 92, 98, 0.5);

    & .container div .bottom #lyrics .stanza .lyrics-preview {
      opacity: 1;
      font-size: unset;
      // transition: 0.3s linear 0s;
    }
    & .container {
      // opacity: 0;
      // transform: ;
      max-height: 500px;
    }
  }
  & input:checked ~ .container {
    max-height: 1000px;
    & #fog {
      opacity: 0;
    }
  }
  & input {
    opacity: 0;
    z-index: 10;
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    // height: 70%;
    // height: 200px;

    &:checked {
      // height: 100%;
    }
  }

  .container {
    width: 100%;
    height: 100%;
    max-height: 300px;
    transition: 0.5s;

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
        top: 0;
        right: 0;
        width: 8vmax;
        height: 8vmax;
        z-index: 100;
        margin-left: auto;
        margin-right: 0;
        position: absolute;
        // margin-bottom: auto;
        background: linear-gradient(45deg, rgba(0, 0, 0, 0) 50%, #8e92c7 50%);
        opacity: 0.5;
        // background: rgb(250, 250, 250);
        text-align: center;
        transition: 0.5s;

        // transition: background 0.5s;
        font-size: 1.8em;
        & a {
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          position: absolute;
        }

        &:hover {
          // text-shadow: 0px 0px 50px rgba(255, 255, 255, 0.4);
          // color: #ffffff;
          opacity: 1;
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
      transition: transform 0.2s;

      & #fog {
        // height: 200px;
        width: 100%;
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        background: linear-gradient(
          to bottom,
          rgba(255, 255, 255, 0) 0%,
          rgba(255, 255, 255, 0) 70%,
          rgba(255, 255, 255, 1) 95% rgba(255, 255, 255, 1) 100%
        );
        z-index: 2;
        transition: 0.2s linear 0s;
        // transition: 0.3s linear 0.3s;
      }
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
            margin: auto;
            // margin-right: 2px;
          }
          & p {
            margin: auto;
            // margin-left: 2px;
          }
          display: flex;
          align-content: center;
          // min-width: 200px;
          // width: 30%;
          text-align: center;
          margin: auto;
        }
      }
      & #lyrics {
        font-size: 1em;
        text-align: left;
        width: 96%;
        padding-bottom: 20px;
        position: relative;
        overflow: hidden;
        text-overflow: clip;

        & .stanza {
          & h4 {
            color: lightgray;
            padding-left: 10%;
            text-align: left;
            font-size: 1em;
            margin: 0;
            font-style: italic;
            font-weight: bold;
          }
          & p {
            text-align: left;
            padding-left: 20%;
          }
          margin-top: 10px;
          margin-bottom: 2px;
        }
      }
    }

    .fade {
      box-shadow: 0px 0px 0px rgba(89, 92, 98, 0);
      position: absolute;
      width: 100%;
      bottom: 0;
      height: 20px;
      z-index: 100;
      background-image: linear-gradient(to bottom, rgb(255, 255, 255), #e1e1e6);
    }
  }
}
</style>
