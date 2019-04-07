<template>
  <div id="app">
    <nav id="desktop">
      <ul>
        <li><a>hello</a></li>
        <li><a>hello2</a></li>
        <li><a>hello3</a></li>
      </ul>
    </nav>
    <nav id="mobile">
      <input type="checkbox" />

      <span></span>
      <span></span>
      <span></span>

      <ul>
        <li><a>hello</a></li>
        <li><a>hello2</a></li>
        <li><a>hello3</a></li>
      </ul>
    </nav>
    <SongList />
  </div>
</template>

<script>
import SongList from './components/SongList.vue';

export default {
  name: 'app',
  components: {
    SongList,
  },
  mounted() {
    console.log(process.env.VUE_APP_ROOT_API);
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  background: #232323;
  color: #cdcdcd;
  font-family: "Avenir Next", "Avenir", sans-serif;
}

nav {
  color: rgb(70, 39, 38);
  font-weight: bold;
  z-index: 1;
  position: fixed;
  & ul {
    box-shadow: 5px 20px 30px rgba(0, 0, 0, 0.2);
    background: #ededed;
    & li {
      padding: 8px;
      transition: color 0.3s ease;
      &:hover {
        color: rgb(212, 130, 116);
      }
    }
  }
  &#desktop {
    left: 0;
    right: 0;
    top: 0;
    width: 100%;

    position: fixed;

    & ul {
      margin: 0;
      top: 0;
      padding: 10px;
      list-style-type: none;

      & li {
        display: inline;
      }
    }
  }

  &#mobile {
    left: 15px;
    top: 15px;
    width: 50%;
    display: none;
    -webkit-user-select: none;
    user-select: none;

    & ul {
      background: #ededed;
      float: right;
      position: absolute;
      width: 200px;
      margin: -100px 0 0 -50px;
      padding: 50px;
      padding-top: 125px;
      background: #ededed;
      list-style-type: none;
      -webkit-font-smoothing: antialiased;

      transform-origin: 0% 0%;
      transform: translate(-100%, 0);
      transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);

      & il {
        display: float;
      }
    }

    & input {
      display: block;
      width: 40px;
      height: 32px;
      position: absolute;
      top: -7px;
      left: -5px;
      cursor: pointer;
      opacity: 0; /* hide this */
      z-index: 2; /* and place it over the hamburger */
      -webkit-touch-callout: none;

      &:checked ~ span {
        opacity: 1;
        transform: rotate(45deg) translate(-2px, -1px);
        background: #232323;
        &:nth-last-child(2) {
          transform: rotate(-45deg) translate(0, -1px);
        }

        &:nth-last-child(3) {
          opacity: 0;
          transform: rotate(0deg) scale(0.2, 0.2);
        }
      }
      &:checked ~ ul {
        transform: none;
      }
    }
    & span {
      display: block;
      width: 33px;
      height: 4px;
      margin-bottom: 5px;
      position: relative;

      background: #cdcdcd;
      border-radius: 3px;

      z-index: 1;

      transform-origin: 4px 0px;

      // transition: transform 0.1s ease, background 0.1s ease, opacity 0.15s ease;
      transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
        background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease;

      &:first-child {
        transform-origin: 0% 0%;
      }

      &:nth-last-child(2) {
        transform-origin: 0% 100%;
      }
    }
  }
}

@media screen and (max-width: 600px) {
  nav#desktop {
    display: none;
  }
  nav#mobile {
    display: block;
  }
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
