import {
  GetRandomFloat,
  GetRandomInt,
  FromPolar,
  ToLuma,
  Clamp,
} from "./Utils";
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
  // alpha = 0;
  constructor(private w: number, private h: number, private p: string[]) {
    this.reset();
  }
  reset() {
    this.x = GetRandomFloat(0, this.w);
    this.y = GetRandomFloat(0, this.h);
    this.color = `#${this.p[GetRandomInt(0, this.p.length)]}`;
    this.speed = GetRandomFloat(0, 0.3);
    this.theta = GetRandomFloat(0, 2 * Math.PI);
    this.radius = GetRandomFloat(0.05, 1.0);
    this.ttl = this.duration = GetRandomInt(25, 50);
  }
  imageComplementLuma(imageData: ImageData) {
    const p = Math.floor(this.x) + Math.floor(this.y) * imageData.width;
    const i = Math.floor(p * 4);
    const r = imageData.data[i + 0];
    const g = imageData.data[i + 1];
    const b = imageData.data[i + 2];

    const lums = ToLuma(r, g, b);
    const ln = 1 - lums / 255.0;
    return ln;
  }
  Update(imageData: ImageData): void {
    const ln = this.imageComplementLuma(imageData);
    const dRadius = GetRandomFloat(-MaxParticleSize / 10, MaxParticleSize / 10);
    const dSpeed = GetRandomFloat(-0.1, 0.4);
    const dTheta = GetRandomFloat(-Math.PI / 8, Math.PI / 8);

    this.speed += dSpeed;
    this.theta += dTheta;
    const [dx, dy] = FromPolar(this.speed * ln, this.theta * ln);

    this.x += dx;
    this.y += dy;
    this.x = Clamp(0, this.w, this.x);
    this.y = Clamp(0, this.h, this.y);
    this.radius += dRadius;
    this.radius = Clamp(1.5, MaxParticleSize, this.radius) * ln;
    this.ttl -= 1;
    if (this.ttl === 0) {
      this.reset();
    }
  }

  Draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    this.experiment(ctx);
    ctx.restore();
  }
  experiment(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    let circle = new Path2D();
    // ctx.globalAlpha = this.alpha;
    circle.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill(circle);
  }
}
