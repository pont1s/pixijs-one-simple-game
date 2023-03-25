import { HEIGHT, WIDTH } from '@/config';
import { Circle } from './Circle';
import { ColorSource } from 'pixi.js';

export class Coin extends Circle {
  constructor(color: ColorSource, radius: number, speed: { x: number, y: number }) {
    super(color, radius, speed);
    this.circle.name = 'Coin';
  }

  random() {
    this.circle.x = this.radius + Math.random() * (WIDTH - 2 * this.radius);
    this.circle.y = this.radius + Math.random() * (HEIGHT - 2 * this.radius);
  }

  tick() {
    const s = 1 + Math.sin(Date.now() * 0.01) * 0.2;
    this.circle.scale.set(s);
  }
}
