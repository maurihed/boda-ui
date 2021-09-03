<template>
  <div class="dashboard">
    {{isLoading}}
    <pre>
      {{families}}
    </pre>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Action, Getter } from 'vuex-class';
import GuestList from '@/components/guests/GuestList.vue';
import { Family } from '@/store/guest/types';

@Component({ name: 'DashboardView', components: { GuestList } })
export default class DashboardView extends Vue {
  @Action('loadFamilies', { namespace: 'guest' }) private loadFamilies: (() => void)|undefined;

  @Getter('isLoading', { namespace: 'guest' }) private isLoading: boolean|undefined;

  @Getter('families', { namespace: 'guest' }) private families: Family[]|undefined;

  private mounted() {
    if (this.loadFamilies) {
      this.loadFamilies();
    }
  }
}
</script>
