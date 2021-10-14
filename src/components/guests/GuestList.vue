<template>
  <div class="guestList d-flex">
    <ul>
      <li v-for="guest in leftList" :key="guest.id">
        <small
          :class="{'text-muted': guest.type === guestType.CHILD}">
          {{guest.name}} ({{guest.age}} Años)
        </small>
      </li>
    </ul>
    <ul>
      <li v-for="guest in rightList" :key="guest.id">
        <small
          :class="{'text-muted': guest.type === guestType.CHILD}">
          {{guest.name}} ({{guest.age}} Años)
        </small>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Guest, GuestType } from '@/store/guest/types';

@Component
export default class GuestList extends Vue {
  @Prop({ default: () => ({}) }) private guests: Guest[]|undefined;

  private guestType = GuestType;

  get pivot(): number {
    return Math.ceil((this.guests?.length || 0) / 2);
  }

  get leftList(): Guest[] {
    return [...(this.guests || [])].splice(0, this.pivot);
  }

  get rightList(): Guest[] {
    return [...(this.guests || [])].splice(this.pivot, this.guests?.length);
  }
}
</script>
