import { createContext, useContext, useState, ReactNode } from 'react';
import { FilterState } from '../types/recipe';
import { nutrientRanges } from '../data/mockRecipes';

const initialFilterState: FilterState = {
  tags: [],
  categories: [],
  nutrients: {
    calories: { min: nutrientRanges.calories.min, max: nutrientRanges.calories.max },
    protein: { min: nutrientRanges.protein.min, max: nutrientRanges.protein.max },
    carbs: { min: nutrientRanges.carbs.min, max: nutrientRanges.carbs.max },
    fat: { min: nutrientRanges.fat.min, max: nutrientRanges.fat.max }
  },
  includedIngredients: [],
  excludedIngredients: [],
  search: ''
};

type FilterContextType = {
  filters: FilterState;
  setTagFilter: (tags: string[]) => void;
  setCategoryFilter: (categories: string[]) => void;
  setNutrientFilter: (nutrient: keyof FilterState['nutrients'], min: number, max: number) => void;
  setIncludedIngredients: (ingredients: string[]) => void;
  setExcludedIngredients: (ingredients: string[]) => void;
  setSearchTerm: (term: string) => void;
  resetFilters: () => void;
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState<FilterState>(initialFilterState);

  const setTagFilter = (tags: string[]) => {
    setFilters(prev => ({ ...prev, tags }));
  };

  const setCategoryFilter = (categories: string[]) => {
    setFilters(prev => ({ ...prev, categories }));
  };

  const setNutrientFilter = (
    nutrient: keyof FilterState['nutrients'],
    min: number,
    max: number
  ) => {
    setFilters(prev => ({
      ...prev,
      nutrients: {
        ...prev.nutrients,
        [nutrient]: { min, max }
      }
    }));
  };

  const setIncludedIngredients = (ingredients: string[]) => {
    setFilters(prev => ({ ...prev, includedIngredients: ingredients }));
  };

  const setExcludedIngredients = (ingredients: string[]) => {
    setFilters(prev => ({ ...prev, excludedIngredients: ingredients }));
  };

  const setSearchTerm = (term: string) => {
    setFilters(prev => ({ ...prev, search: term }));
  };

  const resetFilters = () => {
    setFilters(initialFilterState);
  };

  return (
    <FilterContext.Provider
      value={{
        filters,
        setTagFilter,
        setCategoryFilter,
        setNutrientFilter,
        setIncludedIngredients,
        setExcludedIngredients,
        setSearchTerm,
        resetFilters
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};
