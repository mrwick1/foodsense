import { useFilter } from '../../context/FilterContext';
import { nutrientRanges } from '../../data/mockRecipes';
import { useEffect, useState } from 'react';
import { Dumbbell } from 'lucide-react';

export default function NutrientFilter() {
  const { filters, setNutrientFilter } = useFilter();

  const initialLocalFilters = {
    calories: { min: filters.nutrients.calories.min, max: filters.nutrients.calories.max },
    protein: { min: filters.nutrients.protein.min, max: filters.nutrients.protein.max },
    carbs: { min: filters.nutrients.carbs.min, max: filters.nutrients.carbs.max },
    fat: { min: filters.nutrients.fat.min, max: filters.nutrients.fat.max }
  };

  const [localFilters, setLocalFilters] = useState(initialLocalFilters);

  useEffect(() => {
    setLocalFilters({
      calories: { min: filters.nutrients.calories.min, max: filters.nutrients.calories.max },
      protein: { min: filters.nutrients.protein.min, max: filters.nutrients.protein.max },
      carbs: { min: filters.nutrients.carbs.min, max: filters.nutrients.carbs.max },
      fat: { min: filters.nutrients.fat.min, max: filters.nutrients.fat.max }
    });
  }, [filters.nutrients.calories, filters.nutrients.protein, filters.nutrients.carbs, filters.nutrients.fat]);

  const handleNutrientChange = (
    nutrient: keyof typeof localFilters,
    type: 'min' | 'max',
    value: number
  ) => {
    setLocalFilters(prev => {
      let newMinValue = prev[nutrient].min;
      let newMaxValue = prev[nutrient].max;
      const absoluteMin = nutrientRanges[nutrient].min;
      const absoluteMax = nutrientRanges[nutrient].max;

      if (type === 'min') {
        newMinValue = Math.max(absoluteMin, Number(value));
        newMinValue = Math.min(newMinValue, prev[nutrient].max);
      } else { // type === 'max'
        newMaxValue = Math.min(absoluteMax, Number(value));
        newMaxValue = Math.max(newMaxValue, prev[nutrient].min);
      }

      return {
        ...prev,
        [nutrient]: {
          min: newMinValue,
          max: newMaxValue,
        }
      };
    });
  };

  const applyNutrientFilter = (nutrient: keyof typeof localFilters) => {
    const minToApply = Math.min(localFilters[nutrient].min, localFilters[nutrient].max);
    const maxToApply = Math.max(localFilters[nutrient].min, localFilters[nutrient].max);
    setNutrientFilter(nutrient, minToApply, maxToApply);
  };

  // Updated sliderClassName for new colors
  const sliderClassName = "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600 " +
    "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-slate-700 [&::-webkit-slider-thumb]:shadow dark:[&::-webkit-slider-thumb]:bg-slate-500 [&::-webkit-slider-thumb]:transition-colors [&::-webkit-slider-thumb]:hover:bg-slate-600 dark:[&::-webkit-slider-thumb]:hover:bg-slate-400 " +
    "[&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-slate-700 [&::-moz-range-thumb]:shadow dark:[&::-moz-range-thumb]:bg-slate-500 [&::-moz-range-thumb]:transition-colors [&::-moz-range-thumb]:hover:bg-slate-600 dark:[&::-moz-range-thumb]:hover:bg-slate-400";


  return (
    <div>
      <div className="flex items-center mb-4">
        <Dumbbell className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500" /> {/* Slightly more muted icon */}
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Nutrients</h3> {/* Title text color */}
      </div>

      <div className="space-y-5">
        {(Object.keys(localFilters) as Array<keyof typeof localFilters>).map((nutrient) => (
          <div key={nutrient}>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor={`${nutrient}-min-slider`} className="text-sm font-medium text-gray-500 dark:text-gray-400 capitalize"> {/* Nutrient name color */}
                {nutrient}
              </label>
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400 tabular-nums"> {/* Value range color */}
                {localFilters[nutrient].min} - {localFilters[nutrient].max}
              </span>
            </div>
            
            <input
              id={`${nutrient}-min-slider`}
              type="range"
              aria-label={`${nutrient} minimum value`}
              min={nutrientRanges[nutrient].min}
              max={localFilters[nutrient].max} 
              value={localFilters[nutrient].min}
              onChange={(e) => handleNutrientChange(nutrient, 'min', Number(e.target.value))}
              onMouseUp={() => applyNutrientFilter(nutrient)}
              onTouchEnd={() => applyNutrientFilter(nutrient)}
              className={sliderClassName + " mb-2"}
            />
            
            <input
              type="range"
              aria-label={`${nutrient} maximum value`}
              min={localFilters[nutrient].min}
              max={nutrientRanges[nutrient].max}
              value={localFilters[nutrient].max}
              onChange={(e) => handleNutrientChange(nutrient, 'max', Number(e.target.value))}
              onMouseUp={() => applyNutrientFilter(nutrient)}
              onTouchEnd={() => applyNutrientFilter(nutrient)}
              className={sliderClassName}
            />
          </div>
        ))}
      </div>
    </div>
  );
}