import { DisplayObject } from 'pixi.js';

export const checkCollision = (objA: DisplayObject, objB: DisplayObject) => {
  const boundsA = objA.getBounds();
  const boundsB = objB.getBounds();

  return boundsA.x < boundsB.x + boundsB.width
    && boundsA.y < boundsB.y + boundsB.height
    && boundsB.x < boundsA.x + boundsA.width
    && boundsB.y < boundsA.y + boundsA.height;
};
