export type NutrientName = 'protein' | 'fat' | 'carbs';

export type NutrientPropName = NutrientName | 'calories';

export type NutrientProps = {
  [name in NutrientPropName]: number
};

export interface ProductWeight {
  productId: string;
  productWeight: number;
}

export interface Product extends NutrientProps {
  id: string;
  name: string;
  custom?: boolean;
  deleted?: boolean;
  image?: string;
  isGeneratedImage?: boolean;
  thumb?: string;
  lastModified?: number;
  keyWords?: Array<string>;
  ingredients?: Array<ProductWeight>;
  comment?: string;
  description?: string;
}

export interface DndProduct {
  productId: Product['id'];
  fromMeal?: boolean;
  mealTime?: number;
  productWeight?: number;
  mainNutrient?: NutrientName;
}
