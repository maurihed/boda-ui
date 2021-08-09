<template>
  <div class="modal fade" ref="modalRef" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{title}}</h5>
            <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
          </div>
          <div v-if="hasBodySlot" class="modal-body">
            <slot name="body"></slot>
          </div>
          <div v-if="hasFooterSlot" class="modal-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { Modal } from 'bootstrap';

@Component({ name: 'Modal' })
export default class AppModal extends Vue {
  @Prop({ default: false }) private isVisible: boolean|undefined;

  @Prop({ default: '' }) private title: string|undefined;

  @Prop({ default: () => ({}) }) private modalOptions: Modal.Options|undefined;

  $refs!: {
    modalRef: HTMLFormElement
  }

  private modal: Modal|undefined;

  private mounted(): void {
    this.modal = new Modal(this.$refs.modalRef, this.modalOptions);
    this.$refs.modalRef.addEventListener('hide.bs.modal', this.emitCloseEvent.bind(this));
  }

  private destroyed(): void {
    this.$refs.modalRef.removeEventListener('hide.bs.modal', this.emitCloseEvent.bind(this));
  }

  @Watch('isVisible')
  private onIsVisibleChange(): void {
    /* eslint-disable no-unused-expressions */
    if (this.isVisible) {
      this.modal?.show();
    } else {
      this.modal?.hide();
    }
  }

  get hasFooterSlot(): boolean {
    return !!this.$slots.footer;
  }

  get hasBodySlot(): boolean {
    return !!this.$slots.body;
  }

  private closeModal(): void {
    this.modal?.hide();
  }

  private emitCloseEvent(e: Event): void {
    this.$emit('onBeforeClose', e);
    if (e && e.defaultPrevented) {
      return;
    }
    if (this.isVisible) {
      this.$emit('onClose');
    }
  }
}
</script>
