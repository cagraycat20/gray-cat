import { productHelper } from '../../components';

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface LoadedImage {
  img: CanvasImageSource;
  rect: Rect;
}

export interface DrawTilesOptions {
  ctx: CanvasRenderingContext2D;
  images: Array<string>;
  maxImageCount: number;
  canvasSize: {
    w: number;
    h: number;
  };
  gridSize: {
    w: number;
    h: number;
  };
  borderWidth: number;
}

export async function loadProductImage(url: string, rect: Rect): Promise<LoadedImage> {
  const img = await loadImageFromUrl(productHelper.getProductImageOrGeneric(url, rect.w, rect.h));
  return {img, rect};
}

export function loadImageFromUrl(url: string): Promise<HTMLImageElement> {
  const img = new Image();
  return new Promise((resolve) => {
    img.onload = () => resolve(img);
    img.setAttribute('crossOrigin', 'anonymous');
    img.src = url;
  });
}

export function shuffleArray<T>(array: Array<T>): Array<T> {
  const result = Array.from(array);
  for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function generateLayout({images, gridSize, canvasSize, borderWidth}: DrawTilesOptions): Array<Rect> {

  // scale rect from grid size to layout size
  const scale = ({ x, y, w, h }: Rect) => {
    const xk = (canvasSize.w - borderWidth) / gridSize.w;
    const yk = (canvasSize.h - borderWidth) / gridSize.h;
    return {
      x: borderWidth + x * xk,
      y: borderWidth + y * yk,
      w: w * xk - borderWidth,
      h: h * yk - borderWidth,
    };
  };

  // divide item, success ? return 2 items : initial item
  const divideItem = ({ x, y, w, h }: Rect): Array<Rect> => {
    if (w === 1 && h === 1) {
      return [{ x, y, w, h }];
    }

    const random = () => Math.round(Math.random()); // 1 or 0

    // divide by larger size or random
    if (w > h || (w === h && random())) {
      // prirority if can divide by 3
      if (w % 3 === 0) {
        w = w / 3;
        if (random()) {
          return [{ x, y, w, h }, { x: x + w, y, w: w * 2, h }];
        } else {
          return [{ x, y, w: w * 2, h }, { x: x + w * 2, y, w, h }];
        }
      } else {
        w = w / 2;
        return [{ x, y, w, h }, { x: x + w, y, w, h }];
      }
    } else {
      if (h % 3 === 0) {
        h = h / 3;
        if (random()) {
          return [{ x, y, w, h }, { x, y: y + h, w, h: h * 2 }];
        } else {
          return [{ x, y, w, h: h * 2 }, { x, y: y + h * 2, w, h }];
        }
      } else {
        h = h / 2;
        return [{ x, y, w, h }, { x, y: y + h, w, h }];
      }
    }
  };

  const divideRandomItem = (items: Array<Rect>): Array<Rect> => {
    let result: Array<Rect> = [];
    while (items.length > 0) {
      const [item] = items.splice(Math.floor(Math.random() * items.length), 1);
      const afterDivide = divideItem(item);
      result = [...result, ...afterDivide];
      if (afterDivide.length > 1) {
        break;
      }
    }
    return [...result, ...items];
  };

  let layout: Array<Rect> = [
    { x: 0, y: 0, w: gridSize.w, h: gridSize.h },
  ];

  for (let i = 0; i < images.length - 1; i++) {
    layout = divideRandomItem(layout);
  }

  return layout.map(scale);
}

export async function drawTiles(options: DrawTilesOptions) {
  const imageSet = new Set(options.images); // remove duplicates
  const images = shuffleArray(Array.from(imageSet)).slice(0, options.maxImageCount);

  const loadedImages = await Promise.all(
    generateLayout({...options, images}).map(
      (infoIter, index) => loadProductImage(images[index], infoIter),
    ),
  );

  const {ctx, canvasSize} = options;

  // draw background
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvasSize.w, canvasSize.h);

  // draw tiles
  loadedImages.forEach(({ img, rect: { x, y, w, h } }) => {
    // crop image to requested size
    const srcX = (Number(img.width) - w) / 2;
    const srcY = (Number(img.height) - h) / 2;
    ctx.drawImage(img, srcX, srcY, w, h, x, y, w, h);
  });
}
