import {Variants} from '@scripttype/ng-motion';

export const SLIDE_UP: Variants = {
  initial: {y: 40, opacity: 0},
  animate: {y: 0, opacity: 1},
  exit: {y: 40, opacity: 0},
};

export const SLIDE_LEFT: Variants = {
  initial: {x: 40, opacity: 0},
  animate: {x: 0, opacity: 1},
};

export const SLIDE_RIGHT: Variants = {
  initial: {x: -40, opacity: 0},
  animate: {x: 0, opacity: 1},
};

export const LIST_ITEM_PRESENCE = (height: number): Variants => ({
  initial: { opacity: 0, y: -20, height: 0 },
  animate: { opacity: 1, y: 0, height: height },
  exit: { opacity: 0, y: 20, height: 0 },
});

export const PANEL_CONTAINER: Variants = {
  open: {
    opacity: 1, scaleY: 1, originY: 0, height: 230,
    transition: {
      ease: 'anticipate', duration: .4, stiffness: 200
    }
  },
  closed: {
    opacity: 0, scaleY: 0, originY: 0, height: 0,
    transition: {
      ease: 'anticipate', duration: .4, stiffness: 200
    }
  },
}
