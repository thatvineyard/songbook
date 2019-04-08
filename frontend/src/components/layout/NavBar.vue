<template>
  <div id="navbar">
    <nav id="desktop">

      <LinkList v-bind:links='links' />

    </nav>
    <nav id="mobile">
      <input type="checkbox" />

      <span></span>
      <span></span>
      <span></span>

      <LinkList v-bind:links='links' />
    </nav>
  </div>
</template>

<script>
import LinkList from './LinkList.vue';

export default {
  components: {
    LinkList,
  },
  name: 'navbar',
  props: ['links'],
};
</script>


<style lang="scss">
#navbar nav {
  color: rgb(207, 98, 79);
  font-weight: bold;
  z-index: 1;
  position: fixed;

  & #link-list {
    width: 100%;
    box-shadow: 5px 20px 30px rgba(0, 0, 0, 0.2);
    background: #25262e;

    & ul {
      & li {
        list-style-type: none;
        & a {
          color: inherit;
          text-decoration: none;
          & img {
            height: 2em;
          }
          & p {
            margin: 0;
          }
        }
        // padding: 8px;
        transition: color 0.3s ease;
        &:hover {
          color: rgb(224, 228, 166);
        }
      }
    }
  }

  &#desktop {
    left: 0;
    right: 0;
    top: 0;
    width: 100%;

    position: fixed;

    & #link-list {
      // padding: 2px;
      display: inline-flex;
      align-items: center;
      width: 100%;

      & ul {
        margin: 0;
        height: 100%;
        top: 0;
        padding: 10px;
        display: flex;
        align-items: center;

        &#logo {
        }
        &#left {
          margin-right: auto;
          & li {
            padding-left: 20px;
          }
        }
        &#right {
          margin-left: auto;
          & li {
            padding-right: 20px;
          }
        }
      }
    }
  }

  &#mobile {
    left: 15px;
    top: 15px;
    min-width: 200px;
    width: 40%;
    display: none;
    -webkit-user-select: none;
    user-select: none;

    & #link-list {
      transform-origin: 0% 0%;
      transform: translate(-100%, 0);
      transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
      float: right;
      position: absolute;
      width: 100%;
      margin: -100px 0 0 -50px;
      padding: 20px;
      padding-top: 80px;

      & ul {
        list-style-type: none;
        -webkit-font-smoothing: antialiased;

        & li {
          padding-top: 10px;
          display: float;
        }

        &#logo {
          & img {
            height: 3em;
          }
          & a {
            margin-left: 10px;
          }
        }

        &#right {
          display: flex;
          justify-content: center;
          font-weight: normal;
          font-size: 0.8em;
          flex-wrap: wrap;

          & li {
            padding: 10px;
            margin: auto;
          }
        }
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
        background: #cdcdcd;
        &:nth-last-child(2) {
          transform: rotate(-45deg) translate(0, -1px);
        }

        &:nth-last-child(3) {
          opacity: 0;
          transform: rotate(0deg) scale(0.2, 0.2);
        }
      }
      &:checked ~ #link-list {
        transform: none;
      }
    }
    & span {
      display: block;
      width: 33px;
      height: 4px;
      margin-bottom: 5px;
      position: relative;

      background: #232323;
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

  // Responsiveness
  @media screen and (max-width: $break-small-horiz),
    (max-height: $break-small-vert) {
    &#desktop {
      display: none;
    }
    &#mobile {
      display: block;
    }
  }
}
</style>
