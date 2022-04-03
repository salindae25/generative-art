import { MagicParams } from "./Interfaces";
import { Simulation } from "./Simulation";
import "./style.css";
import { GetRandomInt } from "./Utils";

function createDrawCanvas(
  imageCtx: CanvasRenderingContext2D,
  width: number,
  height: number,
  app: HTMLDivElement
) {
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
  const imageData = imageCtx.getImageData(0, 0, width, height);
  setInterval(() => {
    sim.Update(<MagicParams>{ imageData: imageData });
  }, 1000 / updateFrameRate);

  setInterval(() => {
    sim.Draw(ctx);
  }, 1000 / renderFrameRate);
}

(function bootstrap() {
  const app = document.querySelector<HTMLDivElement>("#app")!;
  const [width, height] = [640, 640];

  const imageCanvas = document.createElement("canvas");
  imageCanvas.width = width;
  imageCanvas.height = height;
  app.appendChild(imageCanvas);

  const ctx = imageCanvas.getContext("2d");
  if (!ctx) return;

  const image = new window.Image();
  if (!image) return;
  image.crossOrigin = "Anonymous";
  image.onload = (e) => {
    ctx.drawImage(image, 0, 0, width, height);
    createDrawCanvas(ctx, width, height, app);
  };
  const images = ["person"];
  image.src = `/images/${images[GetRandomInt(0, images.length)]}.jpg`;
})();
