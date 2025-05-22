import { useState, useEffect } from 'react';
import { useFilter } from '../context/FilterContext';
import RecipeCard from './RecipeCard';
import { Recipe } from '../types/recipe';
import { recipes } from '../data/mockRecipes';
import { ChevronLeft, ChevronRight, SearchX } from 'lucide-react';

export default function RecipeGrid() {
  const { filters } = useFilter();
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const isPremium = false; // This would come from auth context in a real app
  const recipesPerPage = 9;
  
  useEffect(() => {
    // Reset to first page when filters change
    setCurrentPage(1);
    
    // Apply filters
    let result = [...recipes];
    
    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(recipe => 
        recipe.name.toLowerCase().includes(searchTerm)
      );
    }
    
    // Tag filter
    if (filters.tags.length > 0) {
      result = result.filter(recipe => 
        filters.tags.some(tag => recipe.tags.includes(tag))
      );
    }
    
    // Nutrient filters
    result = result.filter(recipe => {
      return (
        recipe.nutrients.calories >= filters.nutrients.calories.min &&
        recipe.nutrients.calories <= filters.nutrients.calories.max &&
        recipe.nutrients.protein >= filters.nutrients.protein.min &&
        recipe.nutrients.protein <= filters.nutrients.protein.max &&
        recipe.nutrients.carbs >= filters.nutrients.carbs.min &&
        recipe.nutrients.carbs <= filters.nutrients.carbs.max &&
        recipe.nutrients.fat >= filters.nutrients.fat.min &&
        recipe.nutrients.fat <= filters.nutrients.fat.max
      );
    });
    
    // Included ingredients filter
    if (filters.includedIngredients.length > 0) {
      result = result.filter(recipe => 
        filters.includedIngredients.every(ing => 
          recipe.ingredients.some(recipeIng => 
            recipeIng.toLowerCase().includes(ing.toLowerCase())
          )
        )
      );
    }
    
    // Excluded ingredients filter
    if (filters.excludedIngredients.length > 0) {
      result = result.filter(recipe => 
        !filters.excludedIngredients.some(ing => 
          recipe.ingredients.some(recipeIng => 
            recipeIng.toLowerCase().includes(ing.toLowerCase())
          )
        )
      );
    }
    
    setFilteredRecipes(result);
  }, [filters]);

  // Calculate pagination values
  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);
  const displayedRecipes = filteredRecipes.slice(
    (currentPage - 1) * recipesPerPage,
    currentPage * recipesPerPage
  );
  
  // If not premium, limit to 5 recipes total
  const limitedRecipes = isPremium ? displayedRecipes : displayedRecipes.slice(0, 5);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="w-full">
      {/* Results count */}
      <div className="mb-6">
        <p className="text-sm text-gray-600">
          {filteredRecipes.length} {filteredRecipes.length === 1 ? 'recipe' : 'recipes'} found
        </p>
      </div>
      
      {/* Recipe grid */}
      {filteredRecipes.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {limitedRecipes.map(recipe => (
              <RecipeCard
                key={recipe.id}
                id={recipe.id}
                name={recipe.name}
                description={recipe.description}
                image={recipe.image}
                tags={recipe.tags}
                isPremium={!isPremium}
                prepTime={recipe.prepTime}
                cookTime={recipe.cookTime}
              />
            ))}
          </div>
          
          {/* Premium limit message */}
          {!isPremium && filteredRecipes.length > 5 && (
            <div className="mt-8 p-6 bg-amber-50 border border-amber-200 rounded-xl text-center">
              <p className="text-amber-800">
                <span className="font-semibold">Free plan limitation:</span> Only showing 5 recipes. Upgrade to Premium to see all recipes and enable downloads.
              </p>
              <button className="mt-4 px-4 py-2 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 transition-colors">
                Upgrade to Premium
              </button>
            </div>
          )}
          
          {/* Pagination */}
          {isPremium && totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <nav className="inline-flex rounded-lg shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-3 py-2 rounded-l-lg border border-gray-300 bg-white text-sm font-medium ${
                    currentPage === 1 
                      ? 'text-gray-300 cursor-not-allowed' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      currentPage === page
                        ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center px-3 py-2 rounded-r-lg border border-gray-300 bg-white text-sm font-medium ${
                    currentPage === totalPages 
                      ? 'text-gray-300 cursor-not-allowed' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </nav>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16 px-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <SearchX className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No recipes found</h3>
          <p className="text-gray-500 mb-6">Try adjusting your filters or search terms</p>
          <button 
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
}
