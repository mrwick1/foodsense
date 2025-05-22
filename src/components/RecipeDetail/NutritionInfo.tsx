interface NutritionInfoProps {
    nutrients: {
      calories: number;
      protein: number;
      carbs: number;
      fat: number;
    };
    servingRatio: number;
  }
  
  export default function NutritionInfo({ nutrients, servingRatio }: NutritionInfoProps) {
    // Calculate adjusted nutrients based on serving ratio
    const adjustedNutrients = {
      calories: Math.round(nutrients.calories * servingRatio),
      protein: Math.round(nutrients.protein * servingRatio),
      carbs: Math.round(nutrients.carbs * servingRatio),
      fat: Math.round(nutrients.fat * servingRatio)
    };
  
    // Calculate macro percentages
    const totalMacros = adjustedNutrients.protein + adjustedNutrients.carbs + adjustedNutrients.fat;
    const proteinPercentage = Math.round((adjustedNutrients.protein / totalMacros) * 100);
    const carbsPercentage = Math.round((adjustedNutrients.carbs / totalMacros) * 100);
    const fatPercentage = Math.round((adjustedNutrients.fat / totalMacros) * 100);
  
    return (
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-900 mb-5">Nutrition</h2>
        
        {/* Calories */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-gray-700 font-medium">Calories</h3>
            <span className="text-gray-900 font-semibold">{adjustedNutrients.calories}</span>
          </div>
          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-1.5 bg-gray-800 rounded-full" 
              style={{ width: '100%' }}
            ></div>
          </div>
        </div>
        
        {/* Macronutrients */}
        <div className="space-y-5">
          {/* Protein */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-gray-700 font-medium">Protein</h3>
              <span className="text-gray-900">{adjustedNutrients.protein}g ({proteinPercentage}%)</span>
            </div>
            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-1.5 bg-gray-600 rounded-full transition-all" 
                style={{ width: `${proteinPercentage}%` }}
              ></div>
            </div>
          </div>
          
          {/* Carbs */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-gray-700 font-medium">Carbohydrates</h3>
              <span className="text-gray-900">{adjustedNutrients.carbs}g ({carbsPercentage}%)</span>
            </div>
            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-1.5 bg-gray-600 rounded-full transition-all" 
                style={{ width: `${carbsPercentage}%` }}
              ></div>
            </div>
          </div>
          
          {/* Fat */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-gray-700 font-medium">Fat</h3>
              <span className="text-gray-900">{adjustedNutrients.fat}g ({fatPercentage}%)</span>
            </div>
            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-1.5 bg-gray-600 rounded-full transition-all" 
                style={{ width: `${fatPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        {/* Disclaimer */}
        <p className="text-xs text-gray-500 mt-6 italic">
          * Nutritional information is an estimate and will vary depending on ingredient choices and preparation.
        </p>
      </div>
    );
  }
  