<template>
  <AppModal
    title="Nueva Familia"
    :isVisible="isModalOpen"
    @onClose="closeHandler"
  >
  <div slot="body">
    <VInput
      class="mb-2"
      label="Nombre:"
      placeholder="Nombre"
      id="name"
      v-model.trim="familyRequest.name"
    />
    <div>
      <VRadioInput
        :value="familySideEnum.GROOM"
        label="Novio"
        v-model="familyRequest.familySide"
      ></VRadioInput>
      <VRadioInput
        :value="familySideEnum.BRIDE"
        label="Novia"
        v-model="familyRequest.familySide">
      </VRadioInput>
    </div>
    <GuestListInput v-model="familyRequest.guests" />
  </div>
  <div slot="footer">
    <button
      class="btn btn-outline-secondary me-2"
      @click="closeModal">
      Cancelar
    </button>
    <button @click="save" class="btn btn-outline-success">Guardar</button>
  </div>
  </AppModal>
</template>
<script lang="ts">
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import ModalMixin from '@/mixins/ModalMixin';
import AppModal from '@/components/ui/AppModal.vue';
import VInput from '@/components/common/forms/VInput.vue';
import VRadioInput from '@/components/common/forms/VRadioInput.vue';
import { Family, FamilySide } from '@/store/guest/types';
import GuestListInput from '../guests/GuestListInput.vue';

@Component({
  name: 'EditFamilyModel',
  components: {
    AppModal,
    VInput,
    GuestListInput,
    VRadioInput,
  },
})
export default class EditFamilyModal extends ModalMixin {
  @Prop({ default: () => ({}) })
  private family: Family|undefined;

  private name = '';

  private familyRequest: Family|unknown = {};

  private familySideEnum = FamilySide;

  private save(): void {
    console.log(this.name);
  }

  private closeHandler(): void {
    this.closeModal();
  }

  @Watch('family')
  private updateGuest() {
    if (this.family) {
      this.familyRequest = { ...this.family as Family };
    }
  }
}
</script>
