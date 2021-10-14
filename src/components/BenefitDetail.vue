<template>
  <div
    ref="carrusel"
    class="BenefitCarrusel"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
    @mousedown.prevent="onTouchStart"
    @mouseover.prevent="onTouchMove"
    @mouseup.prevent="onTouchEnd"
    @mouseleave="onTouchEnd"
  >
    <div
      class="CarruselItem"
      v-for="benefit in benefits"
      :key="benefit.id"
      :id="`benefit-${benefit.title}`"
    >
      <img class="CarruselItem__img" src="https://picsum.photos/400/100" alt="image">
      <h6 class="CarruselItem__title">{{benefit.title}}</h6>
      <p class="CarruselItem__desc text-start">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        Aperiam nihil est dolorum quaerat maxime consequatur voluptate asperiores in ipsum mollitia?
        Placeat ab reiciendis tempora consequuntur, omnis asperiores recusandae enim quo!
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import { TouchUtils } from '@/utils/touchUtils';

@Component({ name: 'BenefitDetail' })
export default class BenefitDetail extends Vue {
  $refs!: {
    carrusel: HTMLElement;
  };

  @Prop({ default: () => [] }) private benefits!: any;

  @Prop({ default: () => ({}) }) private benefitSelected!: any;

  @Watch('benefitSelected')
  private gotoSelectedBenefit(): void {
    const firstItem = this.$refs.carrusel.firstChild as HTMLElement;
    if (!firstItem) return;
    const index = this.benefits.findIndex((b: any) => b.id === this.benefitSelected.id);
    if (index > -1) {
      this.$refs.carrusel.scroll({
        left: (firstItem.offsetWidth + 12) * index,
        behavior: 'smooth',
      });
    }
  }

  private globalLastTouchTime = 0;

  private touchStarted = false;

  private startPosition = { x: 0, y: 0 };

  private lastPoistion = { x: 0, y: 0 };

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
    this.lastPoistion = TouchUtils.getCurrentPosition(event);
  }

  private onTouchMove(event: MouseEvent|TouchEvent): void {
    if (!this.touchStarted) return;
    const currentPosition = TouchUtils.getCurrentPosition(event);
    this.$refs.carrusel.scrollLeft += (this.lastPoistion.x - currentPosition.x);
    this.lastPoistion = currentPosition;
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
    const firstItem = this.$refs.carrusel.firstChild as HTMLElement;
    const swipe = this.startPosition.x - this.lastPoistion.x;
    if (Math.abs(swipe) > (firstItem.offsetWidth / 3)) {
      const direction = swipe > 0 ? 1 : -1;
      const index = this.benefits.findIndex((b: any) => b.id === this.benefitSelected.id);
      if ((direction > 0 && index < this.benefits.length) || (direction < 0 && index > 0)) {
        this.$emit('swipe', this.benefits[index + direction]);
      } else {
        this.gotoSelectedBenefit();
      }
    } else {
      this.gotoSelectedBenefit();
    }
    this.touchStarted = false;
  }
}
</script>

<style lang="scss" scoped>
.BenefitCarrusel {
  display: flex;
  margin: 8px 0;
  overflow: hidden;
}
.CarruselItem {
  max-width: 100%;
  flex-shrink: 0;
  margin-right: 12px;
  &__img {
    width: 100%;
    height: 100px;
    border-radius: 6px 6px 0 0;
  }

  &__title {
    color: #333333;
    font-weight: 700;
    margin: 16px 0;
  }
}
</style>
