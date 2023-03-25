import { ColorSource } from 'pixi.js';
import { HEIGHT, WIDTH } from '@/config';
import { Circle } from './Circle';
import { Point } from '@/types';

export class Player extends Circle {
  constructor(color: ColorSource, radius: number, speed: { x: number, y: number }) {
    super(color, radius, speed);
    this.circle.name = 'Player';
    this.reset();
  }

  reset() {
    this.circle.x = WIDTH / 2;
    this.circle.y = HEIGHT / 2;
  }

  tick(mousePosition: Point) {
    this.circle.x = mousePosition.x;
    this.circle.y = mousePosition.y;
  }
}
