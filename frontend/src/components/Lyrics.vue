<template>
  <div id='lyrics'>
    <div
      class='stanza'
      v-for='(stanza, index) in song.stanzas'
      :key="`stanza-${index}`"
    >
      <p class='stanza-type lyrics-teaser'>{{stanza.type}}</p>
      <p
        class='lyrics-teaser'
        v-for='line in stanza.lines'
        :key='line'
      > {{line}} </p>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: ['song'],
};
</script>

<style lang="scss" scoped>
#lyrics {
  font-size: 1em;
  text-align: left;
  width: 100%;
  padding: 0 2px 20px 2px;
  position: relative;

  & .stanza {
    & .stanza-type {
      padding-left: 10%;
      text-align: left;
      font-size: 0.9em;
      margin: 0;
      font-style: italic;
      font-weight: bold;
      color: lightgray;
    }
    & p {
      padding-left: 1.5em;
      text-indent: -1.5em;
      text-align: left;
      padding-left: 20%;
      margin: 5px 0;
    }
    margin-top: 10px;
    padding-bottom: 10px;
  }
}
</style>
