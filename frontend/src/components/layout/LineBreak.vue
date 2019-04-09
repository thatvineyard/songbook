<template>
  <hr :style="cssProps" />
</template>

<script lang="ts">
export default {
  name: 'line-break',
  props: {
    margin: {
      default: '40px',
      type: String,
    },
  },
  //   data() {
  //     return {
  //       margin: "100px"
  //     };
  //   },
  computed: {
    cssProps() {
      return {
        '--margin': `${this.margin} auto`,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
hr {
  width: 100%;
  display: block;
  margin: var(--margin);
  border-style: none;
  height: 2px;
  background-image: linear-gradient(
    90deg,
    transparent 0%,
    $background-dark 50%,
    transparent 100%
  );
  opacity: 1;
}
</style>
