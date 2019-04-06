<template>
  <div class="card wrapper">
    <div class="container">
      <div v-if='song'>
        <div class="top">
          <div class="edit">
            <p id="edit-symbol">🖊</p>
          </div>
          <div class="title">
            <h2>{{song.title}}</h2>
          </div>
          <div class="clear">
            <!-- -->
          </div>
        </div>
        <p class="melody">Mel. {{song.melody}}</p>
        <p class="artist">Tex. {{song.artist}}</p>
        <p> lyrics </p>
      </div>
      <div v-else>
        <h2>Pending</h2>
        <p>Pending</p>
        <p>Pending</p>
        <p>Pending</p>
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
        .get(`http://localhost:8888/v1/songs/collection/${id}`)
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
  background: rgb(206, 206, 206);
  margin: auto;
  margin-top: 2%;
  position: relative;
  overflow: hidden;
  border-radius: 10px 10px 10px 10px;
  border-color: #00394b;
  border-width: 5px;
  box-shadow: 0;
  transform: scale(0.98);
  transition: box-shadow 0.5s, transform 0.5s;
  &:hover {
    transform: scale(1);
    box-shadow: 5px 20px 30px rgba(0, 0, 0, 0.2);
  }

  .container {
    width: 100%;
    height: 100%;
    .top {
      height: 100%;
      width: 100%;
      padding-top: 1px;
      padding-bottom: 1px;
      padding-left: 10px;
      padding-right: 10px;
      background: rgb(59, 59, 59);
      -webkit-background-size: 100%;
      -moz-background-size: 100%;
      -o-background-size: 100%;
      background-size: 100%;
      color: white;
      overflow: hidden;

      .title {
        width: 70%;
        height: 100%;
        float: left;
        // padding-bottom: 500em;
        // margin-bottom: -500em;
      }
      .edit {
        border-radius: 0 0 0 10px;
        height: 100%;
        width: 4em;
        min-width: 50px;
        float: right;

        background: rgb(92, 92, 92);
        color: rgb(156, 156, 156);
        text-align: center;
        transition: 0.5s;
        #edit-symbol {
          margin: 2%;
          width: 100%;
          font-size: 2em;
        }
        &:hover {
          background: #1f1f1f;
          color: #ffffff;
        }
      }
    }
    .bottom {
      width: 200%;
      height: 20%;
      transition: transform 0.5s;
      &.clicked {
        transform: translateX(-50%);
      }
      h1 {
        margin: 0;
        padding: 0;
      }
      p {
        margin: 0;
        padding: 0;
      }
      .left {
        height: 100%;
        width: 50%;
        background: #f4f4f4;
        position: relative;
        float: left;
        .details {
          padding: 20px;
          float: left;
          width: calc(70% - 40px);
        }
        .buy {
          float: right;
          width: calc(30% - 2px);
          height: 100%;
          background: #f1f1f1;
          transition: background 0.5s;
          border-left: solid thin rgba(0, 0, 0, 0.1);
          i {
            font-size: 30px;
            padding: 30px;
            color: #254053;
            transition: transform 0.5s;
          }
          &:hover {
            background: #a6cdde;
          }
          &:hover i {
            transform: translateY(5px);
            color: #00394b;
          }
        }
      }
      .right {
        width: 50%;
        background: #a6cdde;
        color: white;
        float: right;
        height: 200%;
        overflow: hidden;
        .details {
          padding: 20px;
          float: right;
          width: calc(70% - 40px);
        }
        .done {
          width: calc(30% - 2px);
          float: left;
          transition: transform 0.5s;
          border-right: solid thin rgba(255, 255, 255, 0.3);
          height: 50%;
          i {
            font-size: 30px;
            padding: 30px;
            color: white;
          }
        }
        .remove {
          width: calc(30% - 1px);
          clear: both;
          border-right: solid thin rgba(255, 255, 255, 0.3);
          height: 50%;
          background: #bc3b59;
          transition: transform 0.5s, background 0.5s;
          &:hover {
            background: #9b2847;
          }
          &:hover i {
            transform: translateY(5px);
          }
          i {
            transition: transform 0.5s;
            font-size: 30px;
            padding: 30px;
            color: white;
          }
        }
        &:hover {
          .remove,
          .done {
            transform: translateY(-100%);
          }
        }
      }
    }
  }

  .inside {
    z-index: 9;
    background: #92879b;
    width: 140px;
    height: 140px;
    position: absolute;
    top: -70px;
    right: -70px;
    border-radius: 0px 0px 200px 200px;
    transition: all 0.5s, border-radius 2s, top 1s;
    overflow: hidden;
    .icon {
      position: absolute;
      right: 85px;
      top: 85px;
      color: white;
      opacity: 1;
    }
    &:hover {
      width: 100%;
      right: 0;
      top: 0;
      border-radius: 0;
      height: 80%;
      .icon {
        opacity: 0;
        right: 15px;
        top: 15px;
      }
      .contents {
        opacity: 1;
        transform: scale(1);
        transform: translateY(0);
      }
    }
    .contents {
      padding: 5%;
      opacity: 0;
      transform: scale(0.5);
      transform: translateY(-200%);
      transition: opacity 0.2s, transform 0.8s;
      table {
        text-align: left;
        width: 100%;
      }
      h1,
      p,
      table {
        color: white;
      }
      p {
        font-size: 13px;
      }
    }
  }
}
</style>
