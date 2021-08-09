<template>
  <router-link
    :to="{name: route}"
    v-slot="{ href, navigate, isExactActive }"
    custom
  >
    <li :class="{'active': isExactActive }" class="px-3 position-relative">
      <span class="position-absolute link-decorator"></span>
      <a
        class="text-decoration-none py-2 d-inline-block w-100 ps-3 encapsulated-rounded"
        :href="href"
        @click="navigate"
      >
        <i class="bi bi-gift me-4 font-weight-bold"></i>
        <span>{{routeName}}</span>
      </a>
    </li>
  </router-link>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component({ name: 'MenuItem' })
export default class MenuItem extends Vue {
  @Prop({ default: 'Inicio' }) private route: string|undefined;

  @Prop({ default: '' }) private routeName: string|undefined;
}
</script>

<style lang="scss" scoped>
  li {
    .link-decorator {
      left: 0;
      display: inline-block;
      width: 5px;
      height: 20px;
      border-radius: 0 4px 4px 0;
      padding-left: -2rem;
      top: 50%;
      transform: translateY(-50%);
    }
    a {
      color: #a6b0bb;
      font-weight: bold;
      &.encapsulated-rounded {
        border-radius: .5rem;
      }
    }
    i {
      color: #a6b0bb;
    }
    &.active {
      .link-decorator {
        background: var(--bs-primary);
      }
    }
    &.active, &:hover {
      a {
        background: #def3ee;
        color: #222222;
      }
      i {
        color: var(--bs-primary)
      }
    }
  }
</style>
