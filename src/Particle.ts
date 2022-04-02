import { GetRandomFloat, GetRandomInt, FromPolar } from "./Utils";
import { MaxParticleSize } from "./Constants";
import { ISimObject } from "./Interfaces";

export class Particle implements ISimObject {
  x = 0;
  y = 0; // location of the particle

  speed = 0;
  theta = 0; // speed of the particle

  radius = 0; // radius of the particle
  ttl = 500; // how much time left to live
  duration = 500; // how long this particle will live
  color = "black"; // color of the particle

  constructor(private w: number, private h: number, p: string[]) {
    this.x = GetRandomFloat(0, this.w);
    this.y = GetRandomFloat(0, this.h);
    this.color = `#${p[GetRandomInt(0, p.length)]}`;
    this.speed = GetRandomFloat(0, 0.3);
    this.theta = GetRandomFloat(0, 2 * Math.PI);
    this.radius = GetRandomFloat(0.05, MaxParticleSize);
    this.ttl = this.duration = GetRandomInt(25, 50);
  }

  Update(): void {
    const dRadius = GetRandomFloat(-MaxParticleSize / 10, MaxParticleSize / 10);
    const dSpeed = GetRandomFloat(-0.1, 0.1);
    const dTheta = GetRandomFloat(-Math.PI / 8, Math.PI / 8);

    this.speed += dSpeed;
    this.theta += dTheta;
    const [dx, dy] = FromPolar(this.speed, this.theta);

    this.x += dx;
    this.y += dy;
    this.radius += dRadius;
    this.radius += this.radius < 0 ? -2 * dRadius : 0;
  }

  Draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    this.experiment(ctx);
    ctx.restore();
  }
  experiment(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    let circle = new Path2D();
    circle.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill(circle);
  }
}
