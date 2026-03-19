import { dateUtils } from '../../shared';
import { colors } from '../../shared/theme';
import { canvasSize, CollageDayInfo, drawNutrient } from '../../utils/collage.utils';
import { drawTiles } from '../../utils/image/image.utils';

const gridSize = {
  w: 6,
  h: 3,
};
const borderWidth = 12;
const maxImageCount = 8;

export async function drawTiledCollage(ctx: CanvasRenderingContext2D, info: CollageDayInfo) {
  const images = info.products
    .reduce((acc, {collageImages}) => [...acc, ...collageImages], [])
    .filter((image) => image);

  await drawTiles({
    ctx,
    canvasSize,
    gridSize,
    borderWidth,
    maxImageCount,
    images,
  });

  // draw semiblack strip
  const stripHeight = 400;
  ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
  ctx.fillRect(0, (canvasSize.h - stripHeight) / 2, canvasSize.w, stripHeight);

  // draw text
  ctx.fillStyle = 'white';
  ctx.font = 'bold 60pt Roboto';
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  const date = dateUtils.getFormattedDate(dateUtils.getDate(info.date), 'MMM d');
  ctx.fillText(`My food intake for ${date}`, canvasSize.w / 2, canvasSize.h / 5 * 2);

  // draw nutrients
  const sx = (canvasSize.w - 510 - 150) / 2;
  const sy = canvasSize.h / 2 + 50;
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
