import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Bookmark, BookmarkCheck, ChefHat, Clock, Download, Egg, FileDown, Minus, PenLine, Plus } from 'lucide-react';
import { recipes } from '../../data/mockRecipes';
import { Recipe } from '../../types/recipe';
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
    
    if (!isPremium) {
      alert('Please upgrade to download recipes');
      return;
    }
    
    if (all) {
      alert('Downloading all recipes feature coming soon!');
      return;
    }
    
    if (recipe) {
      // Generate recipe text content
      const recipeText = generateRecipeText(recipe);
      
      // Create a Blob with the text content
      const blob = new Blob([recipeText], { type: 'text/plain' });
      
      // Create a URL for the Blob
      const url = URL.createObjectURL(blob);
      
      // Create a temporary anchor element
      const a = document.createElement('a');
      a.href = url;
      a.download = `${recipe.name.replace(/\s+/g, '-').toLowerCase()}-recipe.txt`;
      
      // Append to body, click to download, then remove
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);
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
          <div className="h-64 bg-gray-100 rounded-lg mb-6"></div>
          <div className="h-10 bg-gray-100 rounded-lg w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-100 rounded-lg w-full mb-6"></div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="h-8 bg-gray-100 rounded-lg"></div>
            <div className="h-8 bg-gray-100 rounded-lg"></div>
            <div className="h-8 bg-gray-100 rounded-lg"></div>
          </div>
          <div className="h-64 bg-gray-100 rounded-lg mb-6"></div>
          <div className="h-64 bg-gray-100 rounded-lg"></div>
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

  const servingRatio = servings / 4; // Assuming base recipe is for 4 servings

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          <li>
            <Link to="/" className="hover:text-gray-900 transition-colors flex items-center">
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
              <span>Recipes</span>
            </Link>
          </li>
          <li>
            <span className="text-gray-400">/</span>
          </li>
          <li className="font-medium text-gray-900 truncate">{recipe.name}</li>
        </ol>
      </nav>

      {/* Two-column layout for the main content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column - Image and basic info */}
        <div>
          {/* Hero Image */}
          <div className="rounded-lg overflow-hidden h-[450px] relative mb-8">
            <img 
              src={recipe.image} 
              alt={recipe.name}
              className="w-full h-full object-cover"
            />
            {recipe.tags.length > 0 && (
              <div className="absolute bottom-4 left-4">
                <span className="bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full">
                  {recipe.tags[0]}
                </span>
              </div>
            )}
          </div>

          {/* Recipe Header */}
          <div className="mb-8">
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">{recipe.name}</h1>
              <div className="flex space-x-2">
                <button 
                  onClick={toggleBookmark}
                  className={`p-2 rounded-full transition-all ${
                    isBookmarked 
                      ? 'bg-gray-100 text-gray-900' 
                      : 'text-gray-400 hover:bg-gray-100 hover:text-gray-900'
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
                  onClick={(e) => handleDownload(e)}
                  className={`p-2 rounded-full transition-all ${
                    isPremium 
                      ? 'hover:bg-gray-100 text-gray-700' 
                      : 'text-gray-300 cursor-not-allowed'
                  }`}
                  title={isPremium ? "Download Recipe" : "Upgrade to Download Recipe"}
                  disabled={!isPremium}
                >
                  <Download className="w-5 h-5" />
                </button>
                <button 
                  onClick={(e) => handleDownload(e, true)}
                  className={`p-2 rounded-full transition-all ${
                    isPremium 
                      ? 'hover:bg-gray-100 text-gray-700' 
                      : 'text-gray-300 cursor-not-allowed'
                  }`}
                  title={isPremium ? "Download All Recipes" : "Upgrade to Download All Recipes"}
                  disabled={!isPremium}
                >
                  <FileDown className="w-5 h-5" />
                </button>
                <Link 
                  to={`/recipe/${recipe.id}/edit`}
                  className="p-2 rounded-full hover:bg-gray-100 transition-all text-gray-700"
                  title="Edit My Version"
                >
                  <PenLine className="w-5 h-5" />
                </Link>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed">{recipe.description}</p>
          </div>

          {/* Recipe Info Cards */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg flex items-center group">
              <div className="bg-white rounded-full p-2.5 mr-4 text-gray-500 border border-gray-100 shadow-sm">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Prep Time</p>
                <p className="font-semibold text-gray-900">{recipe.prepTime} min</p>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg flex items-center group">
              <div className="bg-white rounded-full p-2.5 mr-4 text-gray-500 border border-gray-100 shadow-sm">
                <ChefHat className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Cook Time</p>
                <p className="font-semibold text-gray-900">{recipe.cookTime} min</p>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between group">
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
                  onClick={() => handleServingChange(1)}
                  className="p-1.5 rounded-full hover:bg-white hover:shadow-sm text-gray-500 ml-1"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Ingredients List */}
          <IngredientsList 
            ingredients={recipe.ingredients} 
            servingRatio={servingRatio}
            checkedIngredients={checkedIngredients}
            onToggleCheck={toggleIngredientCheck}
          />
        </div>

        {/* Right Column - Preparation and Nutrition */}
        <div>
          {/* Preparation */}
          <PreparationSteps steps={recipe.instructions} />
          
          <div className="mt-8">
            {/* Nutrition */}
            <NutritionInfo nutrients={recipe.nutrients} servingRatio={servingRatio} />
          </div>
          
          {/* Upgrade CTA for free users */}
          {/* Premium upgrade section removed for testing download functionality */}
          
          {/* Related Recipes */}
          <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-5">You Might Also Like</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white transition-colors">
                <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c" alt="Recipe" className="w-16 h-16 object-cover rounded-lg" />
                <div>
                  <h3 className="font-medium text-gray-900">Mediterranean Quinoa Bowl</h3>
                  <p className="text-sm text-gray-500">Vegetarian • 35 min</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white transition-colors">
                <img src="https://images.unsplash.com/photo-1565557623262-b51c2513a641" alt="Recipe" className="w-16 h-16 object-cover rounded-lg" />
                <div>
                  <h3 className="font-medium text-gray-900">Chicken Tikka Masala</h3>
                  <p className="text-sm text-gray-500">Indian • 70 min</p>
                </div>
              </div>
            </div>
            <button className="mt-4 w-full py-2 border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-white transition-colors text-sm">
              View More Recipes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
