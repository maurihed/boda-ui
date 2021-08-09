<template>
  <div class="drawerProfile p-3 text-center">
    <!-- <i class="bi bi-person-circle"></i>
    <span>Mauricio Hernandez</span> -->
    <button class="btn btn-primary py-2 px-3 text-white fw-bold">
      <i class="bi bi-box-arrow-in-left me-2"></i> Cerrar session
    </button>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({ name: 'DrawerProfile' })
export default class DrawerProfile extends Vue {}
</script>
