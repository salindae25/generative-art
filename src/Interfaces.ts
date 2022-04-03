export interface ISimObject {
  Update(imageData: ImageData): void;
  Draw(ctx: CanvasRenderingContext2D): void;
}
