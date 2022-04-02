import { Simulation } from "./Simulation";
import "./style.css";

(function bootstrap() {
  const app = document.querySelector<HTMLDivElement>("#app")!;
  const [width, height] = [400, 400];
  const updateFrameRate = 50;
  const renderFrameRate = 50;
  const canvas = document.createElement("canvas");
  app.appendChild(canvas);
  if (!canvas) return;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "medium";

  const sim = new Simulation(width, height);

  setInterval(() => {
    sim.Update();
  }, 1000 / updateFrameRate);

  setInterval(() => {
    sim.Draw(ctx);
  }, 1000 / renderFrameRate);
})();
