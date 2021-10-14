<template>
  <div class="container shadow py-4">
    <div>
      <nav
        class="nav"
        ref="nav"
        @click="selectItem"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
        @mousedown="onTouchStart"
        @mouseover="onTouchMove"
        @mouseup="onTouchEnd"
        @mouseleave="onTouchEnd"
      >
        <div v-for="item in navItems" :key="item.id" class="navItem">
          <button
            class="navItem__button"
            :class="{'navItem__button--active': item.id === itemSelected.id}"
          >{{item.title}}</button>
        </div>
      </nav>
      <div>
        <BenefitDetail @swipe="onSwipe" :benefits="navItems" :benefitSelected="itemSelected"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { TouchUtils } from '../utils/touchUtils';
import BenefitDetail from './BenefitDetail.vue';

@Component({ name: 'Test', components: { BenefitDetail } })
export default class Test extends Vue {
  public $refs!: {
    nav: HTMLElement
  };

  private navItems = [
    { id: 1, title: 'Item 1', desc: 'lorem lorem loremlorem lorem lorem' },
    { id: 2, title: 'Item 2', desc: 'lorem lorem loremlorem lorem lorem' },
    { id: 3, title: 'Item 3', desc: 'lorem lorem loremlorem lorem lorem' },
    { id: 4, title: 'Item 4', desc: 'lorem lorem loremlorem lorem lorem' },
    { id: 5, title: 'Item 5', desc: 'lorem lorem loremlorem lorem lorem' },
    { id: 6, title: 'Item 6', desc: 'lorem lorem loremlorem lorem lorem' },
    { id: 7, title: 'Item 7', desc: 'lorem lorem loremlorem lorem lorem' },
  ];

  private itemSelected: any = null;

  private touchStarted = false;

  private startPosition = { x: 0, y: 0 };

  private globalLastTouchTime = 0;

  private created() {
    [this.itemSelected] = this.navItems;
  }

  private onSwipe(benefit: any): void {
    this.itemSelected = benefit;
  }

  private selectItem(event: Event): void {
    const button = event.target as HTMLButtonElement;
    if (button.tagName !== 'BUTTON') return;
    this.itemSelected = this.navItems.find((item: any) => item.title === button.textContent)
      || this.itemSelected;
  }

  private onTouchStart(event: MouseEvent|TouchEvent): void {
    const isTouchEvent = TouchUtils.isTouchEvent(event);
    const isMouseEvent = TouchUtils.isMouseEvent(event);

    if (isTouchEvent) {
      this.globalLastTouchTime = event.timeStamp;
    }

    if (isMouseEvent
        && this.globalLastTouchTime
        && event.timeStamp - this.globalLastTouchTime < 350) {
      return;
    }

    if (this.touchStarted) {
      return;
    }

    this.touchStarted = true;
    this.startPosition = TouchUtils.getCurrentPosition(event);
  }

  private onTouchEnd(event: MouseEvent|TouchEvent): void {
    const isTouchEvent = TouchUtils.isTouchEvent(event);
    const isMouseEvent = TouchUtils.isMouseEvent(event);

    if (isTouchEvent) {
      this.globalLastTouchTime = event.timeStamp;
    }

    if (isMouseEvent
        && this.globalLastTouchTime
        && event.timeStamp - this.globalLastTouchTime < 350) {
      return;
    }

    this.touchStarted = false;
  }

  private onTouchMove(event: MouseEvent|TouchEvent): void {
    if (!this.touchStarted) return;
    const currentPosition = TouchUtils.getCurrentPosition(event);
    this.$refs.nav.scrollLeft += (this.startPosition.x - currentPosition.x);
    this.startPosition = currentPosition;
  }
}
</script>

<style lang="scss" scoped>
  .shadow {
    max-width: 445px;
    margin: 0 auto;
  }
  .nav {
    flex-wrap: nowrap;
    overflow: hidden;
  }
  .navItem {
    flex-shrink: 0;
    &__button {
      border: none;
      background: white;
      padding: 12px;
      color: #767676;
      &:hover {
        background: #EEEEEE;
      }
      &--active {
        color: #333333;
        font-weight: 600;
        background: #EEEEEE;
        box-shadow: inset 0 -2px 0 #3A5EBA;
      }
    }
  }
</style>
