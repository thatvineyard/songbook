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
        <div id='lyrics'>
          <div
            class='stanza'
            v-for='(stanza, index) in song.stanzas'
            :key="`stanza-${index}`"
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
      <div class="fade">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import urlJoin from 'url-join';

export default {
  name: 'song-card',
  props: { songId: String, preview: String },
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
  border-radius: 10px 10px 0px 0px;
  width: 100%;
  margin: auto;
  margin-top: 1%;
  position: relative;
  overflow: hidden;
  box-shadow: 0px -20px 30px rgba(0, 0, 0, 0.1);
  @media screen and (max-width: $break-small-horiz),
    (max-height: $break-small-vert) {
    box-shadow: unset;
  }
  transform: scale(0.98);
  transition: transform 0.5s, box-shadow 0.5s;
  &:hover {
    @media screen and (min-height: $break-small-vert or
      (min-width: $break-small-horiz)) {
      transform: scale(1) translate(0, -30px);
      box-shadow: 0px -30px 30px rgba(0, 0, 0, 0.3);
    }

    & .container div .bottom #lyrics .stanza .lyrics-preview {
      opacity: 1;
    }
  }

  // Change container
  &:hover .container {
    @media screen and (max-width: $break-small-horiz) {
      // max-height: $card-hover-height-small;
    }
    @media screen and (max-height: $break-small-vert) {
      // max-height: $card-hover-height-small;
    }
    @media screen and (min-height: $break-small-vert or
      (min-width: $break-small-horiz)) {
      max-height: $card-hover-height-normal;
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
    max-height: $card-idle-height-normal;
    min-height: 0;
    transition: max-height 0.3s, min-height 0.3s;

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
        padding-left: 10%;
        padding-right: 10%;
        padding-bottom: 10px;
        display: flex;
        flex-wrap: wrap;
        & div {
          & h3 {
            margin: auto;
            padding-right: 5px;
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
          padding-bottom: 10px;
          padding-left: 10px;
          padding-right: 10px;
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
          padding-bottom: 20px;
        }
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
      transform: scale(1) translate(0, 0px);
      box-shadow: 0px -30px 30px rgba(0, 0, 0, 0.3);
    }
    & input:checked ~ .container {
      max-height: 1000px;
      min-height: 500px;
      & #lyrics {
        display: unset;
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
    background-image: linear-gradient(to bottom, $card-body, $background);
  }
}
</style>
