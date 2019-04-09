<template>
  <div class="dashboard">
    <SimpleButtonVue
      class="toggle-button"
      v-for="setting in settings"
      :key='setting.name'
      v-bind:setting="setting"
    />
  </div>
</template>

<script lang="ts">
import SimpleButtonVue from './SimpleButton.vue';

export default {
  name: 'dashboard',
  props: ['settings'],
  components: { SimpleButtonVue },
};
</script>

<style lang="scss" scoped>
.dashboard {
  font-family: Lato, Arial;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
