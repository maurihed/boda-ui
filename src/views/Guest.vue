<template>
  <div class="guestView container">
    <div class="text-end mb-2">
      <button
        @click="openNewFamilyModal"
        class="btn btn-outline-primary">
          Nueva Familia
      </button>
    </div>
    <FamilyList :families="families" />
    <NewFamilyModal ref="newFamilyModal" />
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Action, Getter } from 'vuex-class';
import FamilyList from '@/components/families/FamilyList.vue';
import NewFamilyModal from '@/components/families/NewFamilyModal.vue';
import { Family } from '@/store/guest/types';

@Component({ components: { FamilyList, NewFamilyModal } })
export default class GuestView extends Vue {
  public $refs: {
    newFamilyModal?: NewFamilyModal,
  } = {};

  @Action('loadFamilies', { namespace: 'guest' }) private loadFamilies: (() => void)|undefined;

  @Getter('isLoading', { namespace: 'guest' }) private isLoading: boolean|undefined;

  @Getter('families', { namespace: 'guest' }) private families: Family[]|undefined;

  private mounted() {
    if (this.loadFamilies) {
      this.loadFamilies();
    }
  }

  private openNewFamilyModal() {
    if (this.$refs.newFamilyModal) {
      this.$refs.newFamilyModal.openModal();
    }
  }
}
</script>
