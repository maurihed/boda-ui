<template>
    <div class="form-check">
      <input
        type="radio"
        v-bind="$attrs"
        class="form-check-input"
        @input="$emit('input', $event.target.value)"
        :value="value"
      >
      <label class="form-check-label" :for="id">
        {{label}}
      </label>
    </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component({ name: 'VRadioInput', inheritAttrs: false })
export default class VRadioInput extends Vue {
  @Prop({ default: '' }) private id: string|undefined;

  @Prop({ default: '' }) private value: string|undefined;

  @Prop({ default: '' }) private label: string|undefined;
}
</script>
