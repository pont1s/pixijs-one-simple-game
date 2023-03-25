import { ColorSource, Graphics } from 'pixi.js';
export class Circle {
  protected readonly circle: Graphics;
  public readonly radius: number;
  public readonly speed: { x: number, y: number };

  constructor(color: ColorSource, radius: number, speed: { x: number, y: number }) {
    this.radius = radius;
    this.speed = speed;

    const circle = new Graphics();
    circle.beginFill(color);
    circle.drawCircle(0, 0, radius);
    circle.endFill();
    circle.x = radius;
    circle.y = radius;
    this.circle = circle;
  }

  getCircle() {
    return this.circle;
  }

  getPosition() {
    return { x: this.circle.x, y: this.circle.y };
  }
}
