<template>
  <div class="guest">
    Guest view
    <GuestList />
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import GuestList from '@/components/guests/GuestList.vue';

@Component({ components: { GuestList } })
export default class GuestView extends Vue {}
</script>
