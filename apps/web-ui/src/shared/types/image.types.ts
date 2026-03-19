export interface ImageEdits {
  resize?: {
    width: number;
    height: number;
    fit: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
    background?: {
      r: number; // 0..255
      g: number; // 0..255
      b: number; // 0..255
      alpha: number | null; // 0..1
    };
  };
  flatten?: {
    background: {
      r: number; // 0..255
      g: number; // 0..255
      b: number; // 0..255
      alpha: number | null; // 0..1
    };
  };
  grayscale?: boolean;
  flip?: boolean;
  flop?: boolean;
  negate?: boolean;
  normalise?: boolean;
  tint?: {
    r: number; // 0..255
    g: number; // 0..255
    b: number; // 0..255
  };
  smartCrop?: {
    faceIndex: number;
    padding: number;
  };
}

export interface ImageInfo {
  baseUrl: string;
  imagePath?: string;
  edits: ImageEdits;
}
