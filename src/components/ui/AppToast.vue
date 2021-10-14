<template>
  <div ref="toastRef" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-header">
      <strong class="me-auto">{{title}}</strong>
      <small class="text-muted" v-if="time">{{time}}</small>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body">
      <slot name="body"></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { Toast } from 'bootstrap';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component({})
export default class AppToast extends Vue {
  @Prop({ default: '' }) private title: string|undefined;

  @Prop({ default: '' }) private time: string|undefined;

  private toast!: Toast;

  private toastConfig = {};

  $refs!: {
    toastRef: HTMLDivElement
  };

  private mounted() {
    this.toast = new Toast(this.$refs.toastRef, this.toastConfig);
  }

  public show(): void {
    this.toast.show();
  }

  public destroy(): void {
    this.toast.hide();
  }
}
</script>
