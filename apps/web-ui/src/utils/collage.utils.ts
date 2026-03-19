import {
  Consumed,
  ConsumedProductsSummarySocialPage,
  NutrientProps,
  SocialPage,
} from '../types';

export interface CollageDayInfo {
  date: string;
  nutrients: NutrientProps;
  products: SocialPage['products'];
}

export interface CollageConsumedProductsSummary {
  dateFrom: Date;
  dateTo: Date;
  totalConsumed: Consumed;
  products: ConsumedProductsSummarySocialPage['products'];
}

export const canvasSize = {
  w: 1200,
  h: 630,
};

export interface DrawNutrientOptions {
  x: number;
  y: number;
  color: string;
  name: string;
  value: number | string;
}

export function shuffleArray<T>(array: Array<T>): Array<T> {
  const result = Array.from(array);
  for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function drawNutrient(ctx: CanvasRenderingContext2D, options: DrawNutrientOptions) {
  interface Shape {
    w: number;
    h: number;
    h1?: number;
  }

  const ww = 150;
  const wh = 75;
  const wf = 15;

  const shape1 = {w: ww, h: wh / 2};
  const shape2 = {w: ww, h: wh / 10 * 7, h1: wh};

  const drawText = (str: string, x1: number, y1: number, fontSize: number) => {
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.font = `${fontSize}pt Roboto`;
    ctx.fillText(str, x1, y1);
  };

  const drawShape = ({w, h, h1}: Shape) => {
    ctx.lineWidth = 6;
    ctx.fillStyle = options.color;
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, h);
    if (h1) {
      ctx.lineTo(w / 2, h1);
    }
    ctx.lineTo(w, h);
    ctx.lineTo(w, 0);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  };

  ctx.translate(options.x, options.y);

  drawShape(shape1);
  drawText(options.name, shape1.w / 2, shape1.h / 2, wf);

  ctx.translate(0, shape1.h);
  drawShape(shape2);
  drawText(options.value.toString(), shape2.w / 2, shape2.h1 / 9 * 4, wf * 2);
  ctx.translate(0, -shape1.h);

  ctx.translate(-options.x, -options.y);
}
