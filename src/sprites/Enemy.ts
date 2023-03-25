import { HEIGHT, WIDTH } from '@/config';
import { Circle } from './Circle';
import { ColorSource } from 'pixi.js';
import { randomIntFromInterval } from '@/utils/random';

export class Enemy extends Circle {
  constructor(color: ColorSource, radius: number, speed: { x: number, y: number }) {
    super(color, radius, speed);
    this.circle.name = 'Enemy';
    this.random();
  }

  random() {
    const half = randomIntFromInterval(0, 3);
    switch (half) {
      case 0:
        this.circle.x = this.radius;
        this.circle.y = this.radius;
        break;
      case 1:
        this.circle.x = WIDTH - 2 * this.radius;
        this.circle.y = this.radius;
        break;
      case 2:
        this.circle.x = this.radius;
        this.circle.y = HEIGHT - 2 * this.radius;
        break;
      case 3:
        this.circle.x = WIDTH - 2 * this.radius;
        this.circle.y = HEIGHT - 2 * this.radius;
        break;
    }
  }

  tick() {
    this.circle.x += this.speed.x;
    this.circle.y += this.speed.y;

    if (this.circle.x >= WIDTH - this.radius || this.circle.x <= this.radius) {
      this.speed.x = -1 * this.speed.x;
    }

    if (this.circle.y >= HEIGHT - this.radius || this.circle.y <= this.radius) {
      this.speed.y = -1 * this.speed.y;
    }
  }

  reverse() {
    this.speed.x = -1 * this.speed.x;
    this.speed.y = -1 * this.speed.y;
  }
}

export const createEnemy = () => new Enemy('#c74343', Math.random() * 10 + 10, { x: 2 + Math.random(), y: 2 + Math.random() });
