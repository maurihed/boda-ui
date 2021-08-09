<template>
  <div
    class="d-flex flex-column SideNav border-end position-absolute"
    :class="{'opened': isDrawerOpen}"
  >
    <div class="SideNav__header position-absolute border">
      <button @click="isDrawerOpen = !isDrawerOpen" class="btn p-0">
        <i class="bi bi-x-circle-fill" v-if="isDrawerOpen"></i>
        <i class="bi bi-list" v-else></i>
      </button>
    </div>
    <DrawerMenu class="flex-grow-1" />
    <DrawerProfile class="border-top flex-shrink-0" />
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import DrawerMenu from '@/components/ui/DrawerMenu.vue';
import DrawerProfile from '@/components/ui/DrawerProfile.vue';

@Component({ name: 'SideNav', components: { DrawerMenu, DrawerProfile } })
export default class SideNav extends Vue {
  private isDrawerOpen = false;
}
</script>
<style lang="scss" scoped>
  @import "../../assets/variables";
  .SideNav {
    width: $sideNav-width;
    background: $sideNav-background;
    left: -220px;
    padding-top: 40px;
    &__header {
      left: calc(#{$sideNav-width} - 1px);
      top: 0;
      background: $sideNav-background;
      border-radius: 0 2rem 2rem 0;
      width: 41px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-content: center;
      border-left: 0 !important;
      button {
        font-size: 1.5rem;
        display: flex;
        align-items: center;
      }
    }
    &.opened {
      left: 0;
    }
  }
</style>
