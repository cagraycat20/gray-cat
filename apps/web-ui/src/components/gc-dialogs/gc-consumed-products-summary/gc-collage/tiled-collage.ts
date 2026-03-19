import { colors } from '../../../../shared/theme';
import { formatValue } from '../../../../shared/utils/consumed-products-summary.utils';
import { getValueOfSelectedPeriod } from '../../../../shared/utils/date-selector.utils';
import { canvasSize, CollageConsumedProductsSummary, drawNutrient } from '../../../../utils/collage.utils';
import { drawTiles } from '../../../../utils/image/image.utils';

const gridSize = {
  w: 6,
  h: 3,
};
const borderWidth = 12;
const maxImageCount = 8;

export async function drawTiledCollage(ctx: CanvasRenderingContext2D, info: CollageConsumedProductsSummary) {
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
  ctx.fillText('My food intake', canvasSize.w / 2, canvasSize.h / 5 * 1.5);
  ctx.font = 'bold 50pt Roboto';
  ctx.fillText(getValueOfSelectedPeriod(info.dateFrom, info.dateTo), canvasSize.w / 2, canvasSize.h / 5 * 2.3);

  // draw nutrients
  const sx = (canvasSize.w - 510 - 150) / 2;
  const sy = canvasSize.h / 2 + 50;
  const { protein, fat, carbs, calories } = info.totalConsumed;
  drawNutrient(ctx, {
    x: sx,
    y: sy,
    color: colors.protein,
    name: 'Protein (kg)',
    value: formatValue(protein / 1000),
  });
  drawNutrient(ctx, {
    x: sx + 170,
    y: sy,
    color: colors.fat,
    name: 'Fat (kg)',
    value: formatValue(fat / 1000),
  });
  drawNutrient(ctx, {
    x: sx + 340,
    y: sy,
    color: colors.carbs,
    name: 'Carbs (kg)',
    value: formatValue(carbs / 1000),
  });
  drawNutrient(ctx, {
    x: sx + 510,
    y: sy,
    color: colors.calories,
    name: 'Calories (kcal)',
    value: formatValue(calories),
  });
}
