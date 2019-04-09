<template>
  <div class="toggle-button">
    <input type="checkbox" />
    <div class="text">{{ setting.name }}</div>
    <div class="body">
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'simple-button',
  props: ['setting'],
};
</script>

<style lang="scss" scoped>
.toggle-button {
  position: relative;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 10px;

  width: 150px;
  height: 40px;

  .text {
    color: $card-header-text;
    font-weight: bold;
    margin-top: 10px;
    width: 100%;
    text-align: center;

    transition: color 0.4s;
  }

  .body {
    box-shadow: 0 5px 8px rgba(0, 0, 0, 0.2),
      inset 0px 0px 20px 0px rgba(0, 0, 0, 0);
    transition: box-shadow 0.2s;

    background: $card-header;
    border-radius: 10px;
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: background 0.4s, box-shadow 0.4s;

    z-index: -1;
  }

  input {
    margin: 0;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    cursor: pointer;
    opacity: 0;
    width: 100%;
    height: 100%;
    z-index: 3;

    &:hover {
      & ~ .body {
        box-shadow: 0 5px 8px rgba(0, 0, 0, 0.2),
          inset 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
      }
    }

    &:checked {
      & ~ .body {
        background: $card-body;
      }
      & ~ .text {
        color: $card-header;
      }
    }
  }
}
</style>
