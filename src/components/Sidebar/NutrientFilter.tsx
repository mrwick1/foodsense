import { useFilter } from '../../context/FilterContext';
import { nutrientRanges } from '../../data/mockRecipes';
import { useEffect, useState, useRef } from 'react';
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
  const [activeThumb, setActiveThumb] = useState<{ nutrient: keyof typeof localFilters; type: 'min' | 'max' } | null>(null);
  const sliderRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    setLocalFilters({
      calories: { min: filters.nutrients.calories.min, max: filters.nutrients.calories.max },
      protein: { min: filters.nutrients.protein.min, max: filters.nutrients.protein.max },
      carbs: { min: filters.nutrients.carbs.min, max: filters.nutrients.carbs.max },
      fat: { min: filters.nutrients.fat.min, max: filters.nutrients.fat.max }
    });
  }, [filters.nutrients.calories, filters.nutrients.protein, filters.nutrients.carbs, filters.nutrients.fat]);

  const handleMouseDown = (e: React.MouseEvent, nutrient: keyof typeof localFilters, type: 'min' | 'max') => {
    e.preventDefault();
    setActiveThumb({ nutrient, type });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!activeThumb || !sliderRefs.current[activeThumb.nutrient]) return;

    const slider = sliderRefs.current[activeThumb.nutrient]!;
    const rect = slider.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    
    const absoluteMin = nutrientRanges[activeThumb.nutrient].min;
    const absoluteMax = nutrientRanges[activeThumb.nutrient].max;
    const range = absoluteMax - absoluteMin;
    const value = Math.round(absoluteMin + x * range);

    setLocalFilters(prev => {
      const { nutrient, type } = activeThumb;
      let newMinValue = prev[nutrient].min;
      let newMaxValue = prev[nutrient].max;

      if (type === 'min') {
        newMinValue = Math.max(absoluteMin, value);
        newMinValue = Math.min(newMinValue, prev[nutrient].max);
      } else { // type === 'max'
        newMaxValue = Math.min(absoluteMax, value);
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

  useEffect(() => {
    if (activeThumb) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [activeThumb, localFilters]);

  const handleMouseUp = () => {
    if (activeThumb) {
      const { nutrient } = activeThumb;
      const minToApply = Math.min(localFilters[nutrient].min, localFilters[nutrient].max);
      const maxToApply = Math.max(localFilters[nutrient].min, localFilters[nutrient].max);
      setNutrientFilter(nutrient, minToApply, maxToApply);
      setActiveThumb(null);
    }
  };

  const getThumbPosition = (nutrient: keyof typeof localFilters, type: 'min' | 'max') => {
    const absoluteMin = nutrientRanges[nutrient].min;
    const absoluteMax = nutrientRanges[nutrient].max;
    const range = absoluteMax - absoluteMin;
    const value = type === 'min' ? localFilters[nutrient].min : localFilters[nutrient].max;
    return ((value - absoluteMin) / range) * 100;
  };

  return (
    <div>
      <div className="flex items-center mb-4">
        <Dumbbell className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500" />
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Nutrients</h3>
      </div>

      <div className="space-y-5">
        {(Object.keys(localFilters) as Array<keyof typeof localFilters>).map((nutrient) => (
          <div key={nutrient}>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400 capitalize">
                {nutrient}
              </label>
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400 tabular-nums">
                {localFilters[nutrient].min} - {localFilters[nutrient].max}
              </span>
            </div>
            
            <div 
              ref={el => { sliderRefs.current[nutrient] = el }}
              className="relative h-2 bg-gray-200 rounded-lg dark:bg-gray-600"
            >
              {/* Selected range track */}
              <div 
                className="absolute h-full bg-slate-400 dark:bg-slate-500 rounded-lg"
                style={{
                  left: `${getThumbPosition(nutrient, 'min')}%`,
                  right: `${100 - getThumbPosition(nutrient, 'max')}%`
                }}
              />
              
              {/* Min thumb */}
              <div
                className="absolute w-4 h-4 -mt-1 bg-slate-700 dark:bg-slate-500 rounded-full shadow cursor-pointer hover:bg-slate-600 dark:hover:bg-slate-400 transition-colors"
                style={{ left: `${getThumbPosition(nutrient, 'min')}%` }}
                onMouseDown={(e) => handleMouseDown(e, nutrient, 'min')}
              />
              
              {/* Max thumb */}
              <div
                className="absolute w-4 h-4 -mt-1 bg-slate-700 dark:bg-slate-500 rounded-full shadow cursor-pointer hover:bg-slate-600 dark:hover:bg-slate-400 transition-colors"
                style={{ left: `${getThumbPosition(nutrient, 'max')}%` }}
                onMouseDown={(e) => handleMouseDown(e, nutrient, 'max')}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}