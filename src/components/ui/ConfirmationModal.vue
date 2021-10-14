<template>
  <AppModal
    :title="title"
    :isVisible="isModalOpen"
    @onClose="closeHandler"
  >
    <div slot="footer">
      <button
        class="btn btn-outline-secondary me-2"
        @click="$emit('cancel')">
        Cancelar
      </button>
      <button @click="$emit('confirm')" class="btn btn-outline-success">Continuar</button>
    </div>
  </AppModal>
</template>
<script lang="ts">
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import ModalMixin from '../../mixins/ModalMixin';
import AppModal from './AppModal.vue';

@Component({ name: 'ConfirmationModal', components: { AppModal } })
export default class ConfirmationModal extends ModalMixin {
  @Prop({ default: '' }) private title: string|undefined;

  private closeHandler(): void {
    this.closeModal();
  }

  private beforeDestroy() {
    this.closeModal();
  }
}
</script>
