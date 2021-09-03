<template>
  <div class="card familyCard">
    <div class="card-body">
      <h4 class="card-title">Familia {{family.name}}</h4>
      <div class="card-text">
        <p class="text-end">Adultos: {{adults}}, Niños: {{childs}}</p>
        <GuestList :guests="family.guests" />
        <div class="actions text-end">
          <button class="btn btn-sm btn-outline-danger me-2">Eliminar</button>
          <button class="btn btn-sm btn-outline-warning">Editar</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Family, Guest, GuestType } from '@/store/guest/types';
import GuestList from '../guests/GuestList.vue';

@Component({ components: { GuestList } })
export default class FamilyCard extends Vue {
  @Prop({ default: () => ({}) }) private family: Family|undefined;

  get adults(): number {
    return this.family?.guests.reduce(
      (total: number, guest: Guest) => total + (guest.type !== GuestType.CHILD ? 1 : 0),
      0,
    ) || 0;
  }

  get childs(): number {
    return (this.family?.guests.length || 0) - this.adults;
  }
}
</script>
