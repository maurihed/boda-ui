<template>
<ul class="list-group mb-2">
  <li
    class="list-group-item"
    v-for="(guest, index) in value"
    :key="index" >
    <div
      v-if="guest.id !== guestSelected.id"
      class="d-flex justify-content-between align-items-center"
    >
      {{guest.name}}
      <div>
        <button
          class="btn btn-sm btn-outline-warning rounded-circle me-2"
          @click="edit(guest)">
          <i class="bi bi-pencil-fill"></i>
        </button>
        <button
          class="btn btn-sm btn-outline-danger rounded-circle"
          @click="remove(guest.id)">
          <i class="bi bi-x"></i>
        </button>
      </div>
    </div>
    <div v-else>
      <VInput id="guestName" label="Nombre:" v-model="guestSelected.name" />
      <VInput id="guestName" label="Edad:" type="number" v-model="guestSelected.age" />
      <div class="text-center pt-2">
        <button
          class="btn btn-sm btn-secondary me-2"
          @click="cancelEdit">
          Cancelar
        </button>
        <button
          class="btn btn-sm btn-primary"
          @click="saveEdit(index)">
          Guardar
        </button>
      </div>
    </div>
  </li>
</ul>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Guest } from '@/store/guest/types';
import VInput from '@/components/common/forms/VInput.vue';

@Component({ name: 'GuestListInput', components: { VInput } })
export default class GuestListInput extends Vue {
  @Prop({ default: () => [] }) value: Guest[]|undefined;

  private guestSelected: Guest = {};

  private edit(guest: Guest): void {
    this.guestSelected = { ...guest };
  }

  private remove(id: number): void {
    this.$emit('input', this.value?.filter((guest: Guest) => guest.id !== id));
  }

  private cancelEdit(): void {
    this.guestSelected = {};
  }

  private saveEdit(index: number): void {
    const newGuests = this.value as Guest[];
    newGuests[index] = { ...this.guestSelected };
    this.$emit('input', newGuests);
    this.guestSelected = {};
  }
}
</script>
