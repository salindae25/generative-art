import { ISimObject } from "./Interfaces";
import { Particle } from "./Particle";
import { ColorPallete, particleCount } from "./Constants";
import { GetRandomInt } from "./Utils";

export class Simulation implements ISimObject {
  particles: Particle[] = [];
  pallete: string[] = [];
  constructor(private width: number, private height: number) {
    this.pallete = ColorPallete[GetRandomInt(0, ColorPallete.length)];
    for (let i = 0; i < particleCount; i++) {
      this.particles.push(new Particle(this.width, this.height, this.pallete));
    }
  }
  Update(): void {
    this.particles.forEach((p) => p.Update());
  }
  init = false;
  Draw(ctx: CanvasRenderingContext2D): void {
    if (!this.init) {
      ctx.fillStyle = `#${this.pallete[0]}`;
      ctx.fillRect(0, 0, this.width, this.height);
      this.init = true;
    }

    this.particles.forEach((p: Particle) => {
      p.Draw(ctx);
    });
  }
}
