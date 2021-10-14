<template>
  <div class="d-flex" id="app">
    <SideNav class="flex-shrink-0 h-100"/>
    <div class="content flex-grow-1 h-100 encapsulated-mt overflow-auto">
      <router-view/>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import SideNav from '@/components/layout/SideNav.vue';

@Component({ components: { SideNav } })
export default class App extends Vue {}
</script>
<style lang="scss" scoped>
#app {
  width: 100vw;
  height: 100%;
}
.encapsulated-mt {
  padding-top: 40px;
}
</style>
