<template>
  <div id="link-list">
    <ul
      id="logo"
      v-if="links.logo"
    >
      <li class="logo"><a :href='links.logo.ref'>
          <img
            :src='links.logo.img'
            :alt='links.logo.name'
          >
        </a></li>
    </ul>
    <ul
      id="left"
      v-if="links.left"
    >
      <li
        class="left"
        v-for="(link, index) in links.left"
        :key="`link-left-${index}`"
      ><a :href='link.ref'>
          {{ link.name }}
        </a></li>
    </ul>
    <ul
      id="right"
      v-if="links.right"
    >
      <li
        class="right"
        v-for="(link, index) in links.right"
        :key="`link-right-${index}`"
      ><a :href='link.ref'>
          <img
            v-if='link.img'
            :src='link.img'
            :alt='link.name'
          >
          <p v-else>
            {{ link.name }}
          </p>
        </a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'linklist',
  props: ['links'],
};
</script>
