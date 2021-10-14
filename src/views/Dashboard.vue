<template>
  <div class="dashboard">
    <h4 class="text-center mt-2">Dashboard page</h4>
    <!-- <button class="btn btn-sm" @click="show">Show Toast</button> -->
    <Test/>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import ToastService from '@/services/ToastService';
import AppToast from '../components/ui/AppToast.vue';
import Test from '../components/Test.vue';

@Component({ name: 'DashboardView', components: { Test } })
export default class DashboardView extends Vue {
  $refs!: {
    toast: AppToast
  }

  private toastService = new ToastService();

  private show(): void {
    this.toastService.showToast('Example toast');
  }
}
</script>
