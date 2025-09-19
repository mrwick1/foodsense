export interface Recipe {
  id: number;
  name: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  ingredients: string[];
  nutrients: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  prepTime: number;
  cookTime: number;
  instructions: string[];
}

export interface FilterState {
  tags: string[];
  categories: string[];
  nutrients: {
    calories: { min: number; max: number };
    protein: { min: number; max: number };
    carbs: { min: number; max: number };
    fat: { min: number; max: number };
  };
  includedIngredients: string[];
  excludedIngredients: string[];
  search: string;
}
