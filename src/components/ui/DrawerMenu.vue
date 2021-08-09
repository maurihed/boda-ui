<template>
  <div class="drawerMenu">
    <ul class="list-group">
      <MenuItem class="mb-2" route="Dashboard" route-name="Inicio" />
      <MenuItem route="Guests" route-name="Invitados" />
    </ul>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import MenuItem from './MenuItem.vue';

@Component({ name: 'DrawerMenu', components: { MenuItem } })
export default class DrawerMenu extends Vue {}
</script>
