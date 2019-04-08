<template>
  <div class="dashboard">
    <div
      class="toggle-button"
      v-for="setting in settings"
      :key=setting.name
    >
      <input type="checkbox" />
      <span>
        <p>{{ setting.name }}</p>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'top-buttons',
  props: ['settings'],
});
</script>

<style lang="scss" scoped>
.dashboard {
  font-family: Lato, Arial;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-bottom: 40px;

  .toggle-button {
    position: relative;
    display: inline-block;
    margin-left: 20px;
    margin-right: 20px;
    // margin-top: 10px;
    // margin-bottom: 10px;

    width: 150px;
    height: 40px;

    span {
      text-align: center;
      display: inline-block;

      box-shadow: 0 5px 8px rgba(0, 0, 0, 0.2),
        inset 0px 0px 20px 0px rgba(255, 255, 255, 0);
      transition: box-shadow 0.2s;
      &:hover {
        box-shadow: 0 5px 8px rgba(0, 0, 0, 0.2),
          inset 0px 0px 20px 0px rgba(255, 255, 255, 0.2);
      }
      background: $card-header;
      color: $card-header-text;
      border-radius: 10px;
      // border-style: none;
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      transition: 0.4s;

      // margin: auto;
    }
    input {
      position: absolute;
      cursor: pointer;
      opacity: 0;
      width: 100%;
      height: 100%;
      z-index: 3;

      &:checked ~ span {
        color: $card-header;
        background: $card-body;
      }
    }
  }
}
</style>
