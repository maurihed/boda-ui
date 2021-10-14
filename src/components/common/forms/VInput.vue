<template>
  <div>
    <label :for="id" class="form-label">{{label}}</label>
    <input
      v-bind="$attrs"
      class="form-control"
      @input="$emit('input', $event.target.value)"
      :value="value"
    >
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component({ name: 'VInput', inheritAttrs: false })
export default class VInput extends Vue {
  @Prop({ default: '' }) private id: string|undefined;

  @Prop({ default: '' }) private label: string|undefined;

  @Prop({ default: '' }) private value: number|string|undefined;
}
</script>
