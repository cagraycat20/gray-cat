import { dateUtils } from '../../shared';
import { colors } from '../../shared/theme';
import { canvasSize,
  CollageDayInfo, drawNutrient,
  shuffleArray,
} from '../../utils/collage.utils';
import { loadImageFromUrl, loadProductImage, Rect } from '../../utils/image/image.utils';

function generateLayout(ctx: CanvasRenderingContext2D, text: string, cx: number, cy: number): Array<Rect> {
  // aprox https://stackoverflow.com/questions/1134586/how-can-you-find-the-height-of-text-on-an-html-canvas
  const h = Math.round(ctx.measureText('M').width) * 2;
  const wAll = Math.round(ctx.measureText(text).width);

  let prevW = 0;
  return Array.from(text).map((l, idx) => {
    const w = Math.round(ctx.measureText(text.slice(0, idx + 1)).width) - prevW;
    const result = {
      x: cx - wAll / 2 + prevW,
      y: cy - h / 2,
      w: l !== ' ' ? w : 0,
      h,
    };
    prevW += w;
    return result;
  }).filter((item) => !!item.w);
}

export async function drawWordCollage(ctx: CanvasRenderingContext2D, info: CollageDayInfo) {
  const images = shuffleArray(info.products.map((iter) => iter.product.image || ''));

  ctx.fillStyle = 'white';
  ctx.font = 'bold 140pt tahoma';
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  const date = dateUtils.getFormattedDate(dateUtils.getDate(info.date), 'MMM d');
  const text = `MY RATION`;

  const cx = canvasSize.w / 2;
  const cy = canvasSize.h / 5 * 1;

  const loadedImages = await Promise.all(
    generateLayout(ctx, text, cx, cy).map(
      (infoIter, index) => loadProductImage(images[index], infoIter),
    ),
  );

  // clear previous image
  ctx.clearRect(0, 0, canvasSize.w, canvasSize.h);
  ctx.globalCompositeOperation = 'source-over';

  // draw tiles
  loadedImages.forEach(({ img, rect: { x, y, w, h } }) => {
    // crop image to requested size
    const srcX = (Number(img.width) - w) / 2;
    const srcY = (Number(img.height) - h) / 2;
    ctx.drawImage(img, srcX, srcY, w, h, x, y, w, h);
  });

  ctx.globalCompositeOperation = 'destination-atop';

  // use text as mask
  ctx.fillStyle = 'yellow'; // color doesn't matter
  ctx.fillText(text, cx, cy);

  // draw background
  ctx.drawImage(await loadImageFromUrl(`/collage-bg3.jpg?r=${Math.round(Math.random() * 10000)}`), 0, 0);

  ctx.globalCompositeOperation = 'source-over';
  ctx.strokeStyle = 'rgba(0,0,0,0.2)';
  ctx.lineWidth = 1;
  ctx.strokeText(text, cx, cy);

  // draw date
  ctx.fillStyle = 'black';
  ctx.font = '70pt times new roman';
  const dx = canvasSize.w / 2;
  const dy = canvasSize.h / 5 * 2 + 50;
  ctx.fillText(date, dx, dy);

  // draw nutrients
  const sx = (canvasSize.w - 510 - 150) / 2;
  const sy = canvasSize.h / 2 + 100;
  const {protein, fat, carbs, calories} = info.nutrients;
  drawNutrient(ctx, {
    x: sx,
    y: sy,
    color: colors.protein,
    name: 'Protein (g)',
    value: Math.round(protein),
  });
  drawNutrient(ctx, {
    x: sx + 170,
    y: sy,
    color: colors.fat,
    name: 'Fat (g)',
    value: Math.round(fat),
  });
  drawNutrient(ctx, {
    x: sx + 340,
    y: sy,
    color: colors.carbs,
    name: 'Carbs (g)',
    value: Math.round(carbs),
  });
  drawNutrient(ctx, {
    x: sx + 510,
    y: sy,
    color: colors.calories,
    name: 'Calories (kcal)',
    value: Math.round(calories),
  });
}
