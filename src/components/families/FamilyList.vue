<template>
  <div>
    <FamilyCard
      class="mb-2"
      :family="family"
      v-for="family in families"
      :key="family.id"
      @delete="deleteHandler"
      @edit="editHandler"
    />
    <ConfirmationModal
      ref="confirmModal"
      :title="deleteModalTitle"
      @confirm="handleDeleteConfirm"
      @cancel="closeConfirmModal"
    ></ConfirmationModal>
    <EditFamilyModal
      ref="editModal"
      :family="familySelected"
    />
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import { Family } from '@/store/guest/types';
import FamilyCard from './FamilyCard.vue';
import ConfirmationModal from '../ui/ConfirmationModal.vue';
import EditFamilyModal from './EditFamilyModal.vue';

@Component({ components: { FamilyCard, ConfirmationModal, EditFamilyModal } })
export default class FamilyList extends Vue {
  public $refs!: {
    confirmModal: ConfirmationModal,
    editModal: EditFamilyModal,
  };

  @Action('deleteFamily', { namespace: 'guest' }) private deleteFamily!: ((fmaily: Family) => Promise<boolean>);

  @Prop({ default: () => [] }) private families: Family[]|undefined;

  private deleteModalTitle = '';

  private familySelected: Family|null = null;

  private deleteHandler(family: Family): void {
    this.familySelected = family;
    this.deleteModalTitle = `¿Estas Seguro de Eliminar a la familia ${this.familySelected?.name}?`;
    this.$refs.confirmModal.openModal();
  }

  private async handleDeleteConfirm(): Promise<void> {
    if (this.familySelected) {
      await this.deleteFamily(this.familySelected);
      this.$refs.confirmModal.closeModal();
    }
  }

  private editHandler(family: Family): void {
    console.log('hola');
    this.familySelected = { ...family };
    this.$refs.editModal.openModal();
  }

  private closeConfirmModal(): void {
    this.$refs.confirmModal.closeModal();
  }
}
</script>
