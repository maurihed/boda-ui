<template>
  <div class="dashboard">
    Inicio
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import GuestList from '@/components/guests/GuestList.vue';

@Component({ name: 'DashboardView', components: { GuestList } })
export default class DashboardView extends Vue {}
</script>
