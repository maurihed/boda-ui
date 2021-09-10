<template>
  <div>
    <FamilyCard class="mb-2" :family="family" v-for="family in families" :key="family.id" />
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Family } from '@/store/guest/types';
import FamilyCard from './FamilyCard.vue';

@Component({ components: { FamilyCard } })
export default class FamilyList extends Vue {
  @Prop({ default: () => [] }) private families: Family[]|undefined;
}
</script>
