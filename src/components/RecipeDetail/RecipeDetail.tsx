import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Bookmark, BookmarkCheck, ChefHat, Clock, Download, Egg, FileDown, Minus, PenLine, Plus } from 'lucide-react';
import { recipes } from '../../data/mockRecipes';
import type { Recipe } from '../../types/recipe';
import NutritionInfo from './NutritionInfo';
import PreparationSteps from './PreperationSteps';
import IngredientsList from './IngredientList';

export default function RecipeDetail() {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [servings, setServings] = useState(4);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState<string[]>([]);
  
  // This would come from a user context in a real app
  const isPremium = false;

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchRecipe = () => {
      setLoading(true);
      try {
        const foundRecipe = recipes.find(r => r.id === Number(id));
        
        if (foundRecipe) {
          setRecipe(foundRecipe);
        }
      } catch (error) {
        console.error("Failed to fetch recipe:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleServingChange = (change: number) => {
    const newServings = Math.max(1, servings + change);
    setServings(newServings);
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // In a real app, this would save to user's profile
  };

  const generateRecipeText = (recipe: Recipe): string => {
    // Create a well-formatted text document with all recipe details
    const recipeText = `
# ${recipe.name}

${recipe.description}

## Tags
${recipe.tags.join(', ')}

## Nutrition Information
- Calories: ${recipe.nutrients.calories}
- Protein: ${recipe.nutrients.protein}g
- Carbohydrates: ${recipe.nutrients.carbs}g
- Fat: ${recipe.nutrients.fat}g

## Prep & Cook Time
- Preparation: ${recipe.prepTime} minutes
- Cooking: ${recipe.cookTime} minutes
- Total Time: ${recipe.prepTime + recipe.cookTime} minutes

## Ingredients
${recipe.ingredients.map(ingredient => `- ${ingredient}`).join('\n')}

## Instructions
${recipe.instructions.map((step, index) => `${index + 1}. ${step}`).join('\n')}

## Downloaded from Recipe Rover
Date: ${new Date().toLocaleDateString()}
    `.trim();
    
    return recipeText;
  };

  const handleDownload = (e: React.MouseEvent, all = false) => {
    e.preventDefault();
    
    if (all) { // Handle "Download All Recipes" button
      if (!isPremium) { // Keep premium check for "all"
        alert('Please upgrade to download all recipes');
        return;
      }
      alert('Downloading all recipes feature coming soon!'); // Existing logic
      return;
    }
    
    // This is for the single recipe download (Download icon)
    // This download will now serve the dummy.pdf and is always enabled.
    if (recipe) {
      const a = document.createElement('a');
      a.href = '/dummy.pdf'; // Path to the dummy PDF in the public folder
      // Use recipe name for the downloaded file if recipe is available
      a.download = `${recipe.name.replace(/\s+/g, '-').toLowerCase()}-recipe.pdf`; 
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a); // Clean up immediately
    } else {
      // Fallback if recipe is null
      const a = document.createElement('a');
      a.href = '/dummy.pdf';
      a.download = 'recipe.pdf'; // Generic name
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const toggleIngredientCheck = (ingredient: string) => {
    if (checkedIngredients.includes(ingredient)) {
      setCheckedIngredients(checkedIngredients.filter(i => i !== ingredient));
    } else {
      setCheckedIngredients([...checkedIngredients, ingredient]);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex justify-center">
        <div className="animate-pulse flex flex-col w-full">
          <div className="h-64 bg-gray-100 rounded-lg mb-6" />
          <div className="h-10 bg-gray-100 rounded-lg w-3/4 mb-4" />
          <div className="h-4 bg-gray-100 rounded-lg w-full mb-6" />
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="h-8 bg-gray-100 rounded-lg" />
            <div className="h-8 bg-gray-100 rounded-lg" />
            <div className="h-8 bg-gray-100 rounded-lg" />
          </div>
          <div className="h-64 bg-gray-100 rounded-lg mb-6" />
          <div className="h-64 bg-gray-100 rounded-lg" />
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Recipe Not Found</h2>
          <p className="text-gray-600 mb-6">The recipe you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to recipes
          </Link>
        </div>
      </div>
    );
  }

  const servingRatio = servings / 4; 

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <nav className="mx-auto mb-2 py-4 pt-6">
        <ol className="flex items-center space-x-2 text-sm text-gray-500 overflow-hidden">
          <li>
            <Link to="/" className="hover:text-gray-900 transition-colors flex items-center">
              <span>Recipes</span>
            </Link>
          </li>
          <li>
            <span className="text-gray-400">/</span>
          </li>
          <li className="font-medium text-gray-900 truncate">{recipe.name}</li>
        </ol>
      </nav>

      {/* Hero Section */}
      <div className="relative w-full h-[220px] sm:h-[300px] md:h-[420px] lg:h-[480px] overflow-hidden mb-6 sm:mb-10">
        <img 
          src={recipe.image} 
          alt={recipe.name}
          className="w-full h-full object-cover object-center rounded-lg"
          style={{maxHeight: '100%', minHeight: '100px'}}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-lg" />
        <div className="absolute left-0 bottom-0 p-4 sm:p-8 w-full flex flex-col md:flex-row md:items-end md:justify-between">
          <div>
            {recipe.tags.length > 0 && (
              <div className="mb-4">
                <span className="bg-white/80 text-gray-900 text-xs px-3 py-1.5 rounded-full shadow-sm font-medium">
                  {recipe.tags[0]}
                </span>
              </div>
            )}
            <h1 className="font-bold text-white drop-shadow mb-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl break-words">{recipe.name}</h1>
            <p className="text-white/90 drop-shadow mb-4 text-sm sm:text-base md:text-lg max-w-full break-words">{recipe.description}</p>
          </div>
          <div className="flex space-x-2 mt-4 md:mt-0">
            <button 
              type="button"
              onClick={toggleBookmark}
              className={`p-2 rounded-full transition-all ${
                isBookmarked 
                  ? 'bg-white/90 text-gray-900' 
                  : 'text-white hover:bg-white/20 hover:text-white'
              }`}
              title={isBookmarked ? "Remove from Recipe Book" : "Add to Recipe Book"}
            >
              {isBookmarked ? (
                <BookmarkCheck className="w-5 h-5" />
              ) : (
                <Bookmark className="w-5 h-5" />
              )}
            </button>
            <button 
              type="button"
              onClick={(e) => handleDownload(e)}
              className={"p-2 rounded-full transition-all  text-white hover:bg-white/20"} // Always enabled style
              title={"Download Recipe PDF"}
              // disabled={!isPremium} // Removed disabled state
            >
              <Download className="w-5 h-5" />
            </button>
            <button 
              type="button"
              onClick={(e) => handleDownload(e, true)}
              className={`p-2 rounded-full transition-all ${
                isPremium 
                  ? 'bg-white/90 text-gray-900' 
                  : 'text-white/70 cursor-not-allowed'
              }`}
              title={isPremium ? "Download All Recipes" : "Upgrade to Download All Recipes"}
              disabled={!isPremium}
            >
              <FileDown className="w-5 h-5" />
            </button>
            <Link 
              to={`/recipe/${recipe.id}/edit`}
              className="p-2 rounded-full hover:bg-white/20 transition-all text-white"
              title="Edit My Version"
            >
              <PenLine className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="mx-auto  flex flex-col lg:flex-row gap-6 lg:gap-10 min-w-0">
        {/* Sticky Sidebar (Ingredients & Nutrition) */}
        <aside className="lg:w-1/3 w-full flex-shrink-0 mb-6 lg:mb-0 lg:sticky lg:top-24 self-start min-w-0">
          <div className="bg-white rounded-2xl shadow p-4 sm:p-6 mb-6">
            <IngredientsList 
              ingredients={recipe.ingredients} 
              servingRatio={servingRatio}
              checkedIngredients={checkedIngredients}
              onToggleCheck={toggleIngredientCheck}
            />
          </div>
          <div className="bg-white rounded-2xl shadow p-4 sm:p-6">
            <NutritionInfo nutrients={recipe.nutrients} servingRatio={servingRatio} />
          </div>
        </aside>

        {/* Main Section (Steps, Info, etc.) */}
        <section className="flex-1 min-w-0 flex flex-col">
          {/* Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 sm:mb-8">
            <div className="bg-gray-50 p-4 rounded-xl flex items-center group">
              <div className="bg-white rounded-full p-2.5 mr-4 text-gray-500 border border-gray-100 shadow-sm">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Prep Time</p>
                <p className="font-semibold text-gray-900">{recipe.prepTime} min</p>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl flex items-center group">
              <div className="bg-white rounded-full p-2.5 mr-4 text-gray-500 border border-gray-100 shadow-sm">
                <ChefHat className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Cook Time</p>
                <p className="font-semibold text-gray-900">{recipe.cookTime} min</p>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl flex items-center justify-between group">
              <div className="flex items-center">
                <div className="bg-white rounded-full p-2.5 mr-4 text-gray-500 border border-gray-100 shadow-sm">
                  <Egg className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Servings</p>
                  <p className="font-semibold text-gray-900">{servings}</p>
                </div>
              </div>
              <div className="flex items-center">
                <button 
                  type="button"
                  onClick={() => handleServingChange(-1)}
                  className={`p-1.5 rounded-full ${
                    servings <= 1 
                      ? 'text-gray-300 cursor-not-allowed' 
                      : 'text-gray-500 hover:bg-white hover:shadow-sm'
                  }`}
                  disabled={servings <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <button 
                  type="button"
                  onClick={() => handleServingChange(1)}
                  className="p-1.5 rounded-full hover:bg-white hover:shadow-sm text-gray-500 ml-1"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Preparation Steps */}
          <div className="bg-white rounded-2xl shadow p-4 sm:p-6 mb-6 sm:mb-8">
            <PreparationSteps steps={recipe.instructions} />
          </div>

          {/* Related Recipes - horizontal scroll */}
          <div className="mt-6 sm:mt-8">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-5">You Might Also Like</h2>
            <div className="flex gap-4 overflow-x-auto pb-2 -mx-2 px-2">
              <div className="flex-shrink-0 w-56 sm:w-64 bg-white rounded-xl shadow p-3 hover:bg-gray-50 transition-colors">
                <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c" alt="Recipe" className="w-full h-24 sm:h-32 object-cover rounded-lg mb-2 sm:mb-3" />
                <h3 className="font-medium text-gray-900 text-sm sm:text-base">Mediterranean Quinoa Bowl</h3>
                <p className="text-xs sm:text-sm text-gray-500">Vegetarian • 35 min</p>
              </div>
              <div className="flex-shrink-0 w-56 sm:w-64 bg-white rounded-xl shadow p-3 hover:bg-gray-50 transition-colors">
                <img src="https://images.unsplash.com/photo-1565557623262-b51c2513a641" alt="Recipe" className="w-full h-24 sm:h-32 object-cover rounded-lg mb-2 sm:mb-3" />
                <h3 className="font-medium text-gray-900 text-sm sm:text-base">Chicken Tikka Masala</h3>
                <p className="text-xs sm:text-sm text-gray-500">Indian • 70 min</p>
              </div>
              {/* Add more related recipes here */}
            </div>
            <button type="button" className="mt-3 sm:mt-4 w-full py-2 border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-white transition-colors text-xs sm:text-sm">
              View More Recipes
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
