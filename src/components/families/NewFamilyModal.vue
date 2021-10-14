<template>
  <AppModal
    title="Nueva Familia"
    :isVisible="isModalOpen"
    @onClose="closeHandler"
  >
    <div slot="body">
      <div class="mb-2">
        <label for="familyName" class="form-label">Nombre de la familia</label>
        <input
          id="familyName"
          class="form-control form-control-sm"
          type="text"
          v-model.trim="familyRequest.name"
        >
      </div>
      <div class="mb-2">
        <p>Lado de la familia: </p>
        <div class="form-check form-check-inline">
          <input
            id="groom"
            name="familySide"
            v-model="familyRequest.familySide"
            :value="familySideEnum.GROOM"
            class="form-check-input"
            type="radio"
          >
          <label class="form-check-label" for="inlineRadio1">Novio</label>
        </div>
        <div class="form-check form-check-inline">
          <input
            id="bride"
            name="familySide"
            v-model="familyRequest.familySide"
            :value="familySideEnum.BRIDE"
            class="form-check-input"
            type="radio"
          >
          <label class="form-check-label" for="inlineRadio2">Novia</label>
        </div>
      </div>
      <h6 class="text-center">Miembros</h6>
      <ul v-if="familyRequest.guests.length" class="list-group mb-2">
        <li
          class="list-group-item d-flex justify-content-between align-items-center"
          v-for="(guest, index) in familyRequest.guests"
          :key="index" >
          {{guest.name}}
          <div>
            <button
              class="btn btn-sm btn-outline-warning rounded-circle me-2"
              @click="edit(index)">
              <i class="bi bi-pencil-fill"></i>
            </button>
            <button
              class="btn btn-sm btn-outline-danger rounded-circle"
              @click="remove(index)">
              <i class="bi bi-x"></i>
            </button>
          </div>
        </li>
      </ul>
      <div class="card px-2">
        <div class="d-flex">
          <div class="mb-2 me-2">
            <label for="name" class="form-label">Nombre</label>
            <input
              id="name"
              class="form-control form-control-sm"
              type="text"
              v-model.trim="newGuest.name"
            >
          </div>
          <div class="mb-2">
            <label for="age" class="form-label">Edad</label>
            <input
              id="age"
              class="form-control form-control-sm"
              type="number"
              v-model.number="newGuest.age"
            >
          </div>
        </div>
        <div class="mb-2">
          <label for="type" class="form-label">Tipo</label>
          <select class="form-select form-select-sm" v-model="newGuest.type">
            <option :value="guestTypes.CHILD">Niño</option>
            <option :value="guestTypes.YOUNG_ADULT">Adolecente</option>
            <option :value="guestTypes.OLD_ADULT">Adulto</option>
          </select>
        </div>
        <div class="text-center">
          <button
            v-if="isEditing"
            class="btn btn-sm btn-outline-secondary me-2"
            @click="cancelEditing"
          >
            Cancelar
          </button>
          <button
            class="btn btn-sm btn-outline-primary mb-2"
            @click="addGuest"
          >Guardar</button>
        </div>
      </div>
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
import { Action } from 'vuex-class';
import ModalMixin from '@/mixins/ModalMixin';
import AppModal from '@/components/ui/AppModal.vue';
import {
  Family, GuestType, Guest, FamilySide,
} from '@/store/guest/types';

@Component({ components: { AppModal } })
export default class NewFamilyModal extends ModalMixin {
  @Action('newFamily', { namespace: 'guest' }) private newFamily!: ((fmaily: Family) => void);

  private familySideEnum = FamilySide;

  private guestTypes = GuestType;

  private isEditing = false;

  private editingGuestIndex = -1;

  private familyRequest: Family = {
    name: '',
    familySide: FamilySide.GROOM,
    guests: [],
  };

  private newGuest: Guest = {
    name: '',
    age: undefined,
    type: GuestType.YOUNG_ADULT,
  };

  private resetNewGuest(): void {
    this.newGuest = {
      name: '',
      age: undefined,
      type: GuestType.YOUNG_ADULT,
    };
  }

  private resetFamilyRequest(): void {
    this.familyRequest = {
      name: '',
      familySide: FamilySide.GROOM,
      guests: [],
    };
  }

  private cancelEditing(): void {
    this.isEditing = false;
    this.resetNewGuest();
  }

  private addGuest(): void {
    if (this.isEditing) {
      this.familyRequest.guests[this.editingGuestIndex] = { ...this.newGuest };
      this.isEditing = false;
    } else {
      this.familyRequest.guests.push(this.newGuest);
    }
    this.resetNewGuest();
  }

  private edit(guestIndex: number): void {
    this.isEditing = true;
    this.editingGuestIndex = guestIndex;
    this.newGuest = { ...this.familyRequest.guests[guestIndex] };
  }

  private remove(guestIndex: number): void {
    this.familyRequest.guests = this.familyRequest.guests.filter(
      (_, index) => index !== guestIndex,
    );
  }

  private save(): void {
    this.newFamily(this.familyRequest);
    this.resetFamilyRequest();
    this.closeModal();
  }

  private closeHandler(): void {
    this.closeModal();
  }

  private beforeDestroy() {
    this.closeModal();
  }
}
</script>
