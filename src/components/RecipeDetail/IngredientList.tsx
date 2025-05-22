import { useState } from 'react';

interface IngredientsListProps {
  ingredients: string[];
  servingRatio: number;
  checkedIngredients: string[];
  onToggleCheck: (ingredient: string) => void;
}

export default function IngredientsList({ 
  ingredients, 
  servingRatio, 
  checkedIngredients, 
  onToggleCheck 
}: IngredientsListProps) {
  // Mock quantities for the ingredients (in a real app, these would come from the API)
  const [quantities] = useState([
    "2 medium", "1 cup", "3 tablespoons", "1/2 teaspoon", 
    "1 pound", "2 cloves", "1/4 cup", "1 tablespoon",
    "1 teaspoon", "3 large", "2 tablespoons", "1/2 cup",
    "1 small", "4 ounces", "1/3 cup", "1 cup"
  ]);

  // Generate ingredient entries with quantities
  const ingredientEntries = ingredients.map((ingredient, index) => {
    const originalQuantity = quantities[index % quantities.length];
    const [amount, unit] = originalQuantity.split(' ');
    
    // Parse and adjust quantity based on serving ratio
    let adjustedAmount;
    if (amount.includes('/')) {
      const [numerator, denominator] = amount.split('/').map(Number);
      adjustedAmount = (numerator / denominator) * servingRatio;
      
      // Convert back to fraction if needed
      if (adjustedAmount < 1) {
        // Find the closest simple fraction
        if (adjustedAmount <= 0.25) adjustedAmount = '1/4';
        else if (adjustedAmount <= 0.33) adjustedAmount = '1/3';
        else if (adjustedAmount <= 0.5) adjustedAmount = '1/2';
        else if (adjustedAmount <= 0.67) adjustedAmount = '2/3';
        else adjustedAmount = '3/4';
      } else {
        // Round to nearest 0.25
        adjustedAmount = Math.round(adjustedAmount * 4) / 4;
        
        // Format with fraction if needed
        const whole = Math.floor(adjustedAmount);
        const fraction = adjustedAmount - whole;
        
        if (fraction === 0) {
          adjustedAmount = whole.toString();
        } else {
          let fractionStr = '';
          if (fraction === 0.25) fractionStr = '1/4';
          else if (fraction === 0.33 || fraction === 0.5) fractionStr = '1/3';
          else if (fraction === 0.5) fractionStr = '1/2';
          else if (fraction === 0.67 || fraction === 0.75) fractionStr = '2/3';
          else if (fraction === 0.75) fractionStr = '3/4';
          
          adjustedAmount = whole > 0 ? `${whole} ${fractionStr}` : fractionStr;
        }
      }
    } else {
      // Simply multiply and round for whole numbers
      adjustedAmount = Math.round(Number(amount) * servingRatio * 10) / 10;
      // Remove trailing zeros for whole numbers
      if (adjustedAmount % 1 === 0) {
        adjustedAmount = Math.round(adjustedAmount);
      }
    }
    
    return {
      id: index,
      name: ingredient,
      quantity: `${adjustedAmount} ${unit || ''}`.trim()
    };
  });

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h2 className="text-xl font-semibold text-gray-900 mb-5">Ingredients</h2>
      <ul className="space-y-3">
        {ingredientEntries.map((item) => (
          <li key={item.id} className="flex items-start group">
            <div className="flex-shrink-0 pt-1">
              <input
                id={`ingredient-${item.id}`}
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-500 focus:ring-offset-0 transition-all"
                checked={checkedIngredients.includes(item.name)}
                onChange={() => onToggleCheck(item.name)}
              />
            </div>
            <label
              htmlFor={`ingredient-${item.id}`}
              className={`ml-3 cursor-pointer select-none transition-all ${
                checkedIngredients.includes(item.name)
                  ? 'text-gray-400 line-through'
                  : 'text-gray-700'
              }`}
            >
              <span className="font-medium">{item.quantity}</span> {item.name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
