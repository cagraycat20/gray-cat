import { productHelper } from '../../components';
import { LoadedImage, loadImageFromUrl } from './image.utils';

interface Size {
  w: number;
  h: number;
}

export interface DrawPitchedTilesConfig {
  backgroundColor: string;
  canvasSize: Size;
  pitch: number;
  borderWidth: number;
}

type PolyPoint = [number, number];

function drawPolygon(ctx: CanvasRenderingContext2D, polygon: Array<PolyPoint>) {
  ctx.beginPath();
  polygon.forEach(([x, y], idx) => idx ? ctx.lineTo(x, y) : ctx.moveTo(x, y));
  ctx.closePath();
  ctx.fill();
}

async function getPolyShapedImage(image: string, polygon: Array<PolyPoint>): Promise<LoadedImage> {
  const xs = polygon.map((e) => e[0]);
  const xMin = Math.min(...xs);
  const w = Math.max(...xs) - xMin;

  const ys = polygon.map((e) => e[1]);
  const yMin = Math.min(...ys);
  const h = Math.max(...ys) - yMin;

  function shiftPoint([x, y]: PolyPoint): PolyPoint {
    // shifting to starting point of coordinate system
    return [x - xMin, y - yMin];
  }

  // create temporary canvas
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const tmpCtx = canvas.getContext('2d');
  if (tmpCtx) {
    const loadedImage = await loadImageFromUrl(productHelper.getProductImageOrGeneric(image, w, h));

    // draw centered image
    const xShift = (w - loadedImage.width) / 2;
    const yShift = (h - loadedImage.height) / 2;
    tmpCtx.drawImage(loadedImage, xShift, yShift);

    // draw polygon to crop as mask
    tmpCtx.globalCompositeOperation = 'destination-atop';
    drawPolygon(tmpCtx, polygon.map(shiftPoint));
  }
  return {
    img: canvas,
    rect: {x: xMin, y: yMin, w, h},
  };
}

function generatePitchLayout(
  canvasSize: Size, sliceCount: number, pitch: number, borderWidth: number,
): Array<Array<PolyPoint>> {

  const result: Array<Array<PolyPoint>> = [];

  for (let i = 0; i < sliceCount; i++) {
    const sliceWidth = canvasSize.w / sliceCount;
    const sliceHeight = canvasSize.h;
    const first = i === 0;
    const last = i === (sliceCount - 1);
    const x1 = sliceWidth * i;
    const x2 = x1 + sliceWidth;
    result.push([
      [first ? 0 : x1 - pitch + borderWidth / 2, 0],
      [first ? 0 : x1 + pitch + borderWidth / 2 , sliceHeight],
      [last ? x2 : x2 + pitch - borderWidth / 2, sliceHeight],
      [last ? x2 : x2 - pitch - borderWidth / 2, 0],
    ]);
  }
  return result;
}

export async function getPitchedTilesImage(
  images: Array<string>,
  config: DrawPitchedTilesConfig,
) {
  if (images.length === 0) {
    return;
  }

  // create temporary canvas
  const canvas = document.createElement('canvas');
  canvas.width = config.canvasSize.w;
  canvas.height = config.canvasSize.h;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.fillStyle = config.backgroundColor;
    ctx.fillRect(0, 0, config.canvasSize.w, config.canvasSize.h);

    const layout = generatePitchLayout(config.canvasSize, images.length, config.pitch, config.borderWidth);

    const loadedImages = await Promise.all(images.map((img, i) => getPolyShapedImage(img, layout[i])));
    loadedImages.forEach(
      (loadedImage) => ctx.drawImage(loadedImage.img, loadedImage.rect.x, loadedImage.rect.y),
      );
    return canvas.toDataURL('image/jpeg');
  } else {
    return;
  }
}
