<template>
  <div
    :class="'card wrapper ' + preview"
    v-if="song"
  >
    <input type="checkbox" />
    <div class="container">
      <div class="top">
        <div class="title">
          <h2>{{song.title}}</h2>
        </div>
        <div class="edit">
          <a href='edit/song.id' />
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
        <LyricsVue v-bind:song="song" />
      </div>
      <div class="fade">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import urlJoin from 'url-join';
import LyricsVue from './Lyrics.vue';

export default {
  name: 'song-card',
  props: { songId: String, preview: String },
  components: {
    LyricsVue,
  },
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
        .get(urlJoin(this.$rootApi, `/v1/songs/collection/${id}`))
        .then(response => response.data);
    },
  },
};
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
  border-radius: 10px 10px 10px 10px;
  width: 100%;
  margin: 5px auto 5px;
  position: relative;
  overflow: hidden;
  box-shadow: 0px -20px 30px rgba(0, 0, 0, 0.1);
  @media screen and (max-width: $break-small-horiz),
    (max-height: $break-small-vert) {
    box-shadow: unset;
  }
  // transform: scale(0.98);
  transform: scale(1);
  transition: transform 0.5s ease-in-out, box-shadow 0.5s;
  &.preview {
    &:hover {
      @media screen and (min-width: $break-small-horiz) and (min-height: $break-small-vert) {
        transform: translate(0, -10px);
        box-shadow: 0px -20px 30px rgba(0, 0, 0, 0.2);
      }
    }
  }
  &.no-preview {
    border-radius: 10px;
    & .fade,
    #fog,
    #lyrics {
      display: none;
    }

    &:hover {
      @media screen and (min-height: $break-small-vert and
      (min-width: $break-small-horiz)) {
        transform: scale(1) translate(0, -30px);
      }
    }
    & input:checked ~ .container {
      & #lyrics {
        display: unset;
      }
    }
  }
  & input:checked ~ .container {
    max-height: 10000px;
    & #fog {
      opacity: 0;
    }
    & .fade {
      opacity: 0;
    }
  }

  .fade {
    box-shadow: 0px 0px 0px rgba(89, 92, 98, 0);
    position: absolute;
    width: 100%;
    bottom: 0;
    height: 20px;
    z-index: 100;
    transition: opacity 0.5s;
    background-image: linear-gradient(
      to bottom,
      $card-body 0%,
      $background 50%
    );
  }

  & input {
    margin: 0;
    opacity: 0;
    z-index: 10;
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
  }

  .container {
    width: 100%;
    height: 100%;
    background: $card-body;
    @media screen and (max-width: $break-small-horiz) {
      max-height: $card-idle-height-small;
    }
    @media screen and (max-height: $break-small-vert) {
      max-height: $card-idle-height-small;
    }
    @media screen and (min-height: $break-small-vert) and (min-width: $break-small-horiz) {
      max-height: $card-idle-height-normal;
    }
    min-height: 0;
    transition: max-height 0.5s, min-height 0.5s;

    &.no-preview {
      border-radius: 10px 10px 10px 10px;
    }

    .top {
      height: 30%;
      min-height: 5em;
      width: 100%;

      background: $card-header;
      color: $card-header-text;

      display: inline-flex;

      .title {
        display: block;
        text-align: left;
        margin: auto auto auto 0;
        padding-left: 10px;
        width: 80%;
      }
      .edit {
        text-align: right;
        top: 0;
        right: 0;
        width: 100px;
        height: 100px;
        z-index: 100;
        margin-left: auto;
        margin-right: 0;
        position: absolute;
        // margin-bottom: auto;
        background: linear-gradient(45deg, rgba(0, 0, 0, 0) 70%, #8e92c7 70%);
        opacity: 0.5;
        // background: rgb(250, 250, 250);
        text-align: center;
        transition: opacity 0.5s;
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
      color: $card-body-text;
      background: $card-body;
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
          $card-body 90%,
          $card-body 100%
        );
        z-index: 2;
        transition: opacity 0.2s linear 0s;
        // transition: 0.3s linear 0.3s;
      }
      h1,
      p {
        margin: 0;
        padding: 0;
      }

      & #info {
        padding: 0 10%;
        display: flex;
        flex-wrap: wrap;
        & div {
          & h3 {
            margin: auto;
            padding-right: 5px;
          }
          & p {
            margin: auto;
          }
          display: flex;
          align-content: center;
          text-align: center;
          margin: auto;
          padding-bottom: 10px;
          padding-left: 10px;
          padding-right: 10px;
        }
      }
    }
  }
}
</style>
