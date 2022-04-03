export interface ISimObject {
  Update(magicParams: MagicParams): void;
  Draw(ctx: CanvasRenderingContext2D): void;
}

export interface MagicParams {
  imageData: ImageData;
  index: number;
}
