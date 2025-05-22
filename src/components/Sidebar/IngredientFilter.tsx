import { useFilter } from '../../context/FilterContext';
import { allIngredients } from '../../data/mockRecipes';
import { useState } from 'react';
import { Apple, CircleMinus, CirclePlus, Search, Trash2 } from 'lucide-react';

export default function IngredientFilter() {
  const { filters, setIncludedIngredients, setExcludedIngredients } = useFilter();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredIngredients = allIngredients
    .filter(ing => ing.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(ing => 
      !filters.includedIngredients.includes(ing) && 
      !filters.excludedIngredients.includes(ing)
    )
    .slice(0, 5);

  const addIncludedIngredient = (ingredient: string) => {
    setIncludedIngredients([...filters.includedIngredients, ingredient]);
    setSearchTerm('');
  };

  const addExcludedIngredient = (ingredient: string) => {
    setExcludedIngredients([...filters.excludedIngredients, ingredient]);
    setSearchTerm('');
  };

  const removeIncludedIngredient = (ingredient: string) => {
    setIncludedIngredients(filters.includedIngredients.filter(i => i !== ingredient));
  };

  const removeExcludedIngredient = (ingredient: string) => {
    setExcludedIngredients(filters.excludedIngredients.filter(i => i !== ingredient));
  };

  return (
    <div>
      <div className="flex items-center mb-3">
        <Apple className="w-4 h-4 mr-2 text-gray-500" />
        <h3 className="text-sm font-medium text-gray-900">Ingredients</h3>
      </div>
      
      <div className="mb-4">
        <div className="relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Search ingredients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {searchTerm && filteredIngredients.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
              {filteredIngredients.map((ingredient) => (
                <div 
                  key={ingredient} 
                  className="flex justify-between items-center px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <span className="text-gray-700">{ingredient}</span>
                  <div className="flex gap-1">
                    <button 
                      onClick={() => addIncludedIngredient(ingredient)}
                      className="p-1.5 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-md transition-colors"
                      title="Include ingredient"
                    >
                      <CirclePlus className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => addExcludedIngredient(ingredient)}
                      className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                      title="Exclude ingredient"
                    >
                      <CircleMinus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {filters.includedIngredients.length > 0 && (
        <div className="mb-4">
          <h4 className="text-xs font-medium text-gray-500 mb-2">Included Ingredients</h4>
          <div className="flex flex-wrap gap-2">
            {filters.includedIngredients.map((ingredient) => (
              <div 
                key={ingredient} 
                className="group flex items-center gap-1.5 bg-green-50 text-green-700 text-xs px-2.5 py-1.5 rounded-full ring-1 ring-green-200"
              >
                <span>{ingredient}</span>
                <button 
                  onClick={() => removeIncludedIngredient(ingredient)}
                  className="text-green-500 hover:text-green-700 hover:bg-green-100 rounded-full p-0.5 transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {filters.excludedIngredients.length > 0 && (
        <div>
          <h4 className="text-xs font-medium text-gray-500 mb-2">Excluded Ingredients</h4>
          <div className="flex flex-wrap gap-2">
            {filters.excludedIngredients.map((ingredient) => (
              <div 
                key={ingredient} 
                className="group flex items-center gap-1.5 bg-red-50 text-red-700 text-xs px-2.5 py-1.5 rounded-full ring-1 ring-red-200"
              >
                <span>{ingredient}</span>
                <button 
                  onClick={() => removeExcludedIngredient(ingredient)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full p-0.5 transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
