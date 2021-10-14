export interface IPosition {
  x: number;
  y: number;
}

export interface TouchObj {
  currentPosition: IPosition;
  startPosition: IPosition;
  globalLastTouchTime: number;
  touchStarted: boolean;
}
export class TouchUtils {
  static isMouseEvent = (event: TouchEvent|MouseEvent): boolean => event.type.indexOf('mouse') > -1;

  static isTouchEvent = (event: TouchEvent|MouseEvent): boolean => event.type.indexOf('touch') > -1;

  static touchX = (event: TouchEvent|MouseEvent): number => {
    if (TouchUtils.isMouseEvent(event)) {
      return (event as MouseEvent).clientX;
    }
    return (event as TouchEvent).touches[0].clientX;
  };

  static touchY = (event: TouchEvent|MouseEvent): number => {
    if (TouchUtils.isMouseEvent(event)) {
      return (event as MouseEvent).clientY;
    }
    return (event as TouchEvent).touches[0].clientY;
  };

  static getCurrentPosition = (event: TouchEvent|MouseEvent): IPosition => ({
    x: TouchUtils.touchX(event),
    y: TouchUtils.touchY(event),
  });
}

// let globalLastTouchTime = 0;

// export const touchStartEvent = (event: TouchEvent|MouseEvent): IPosition => {
//   const isTouchEvent = event.type.indexOf('touch') >= 0;
//   const isMouseEvent = event.type.indexOf('mouse') >= 0;

//   if (isTouchEvent) {
//     globalLastTouchTime = event.timeStamp;
//   }

//   if (isMouseEvent && globalLastTouchTime && event.timeStamp - globalLastTouchTime < 350) {
//     return;
//   }

//   return {
//     x: touchX(event),
//     y: touchY(event),
//   };
// };

// const touchMoveEvent = (event: MouseEvent|TouchEvent): void => {
//   const currentX = touchX(event);
//   const currentY = touchY(event);
//   return {
//     currentX, currentY
//   }
// };
