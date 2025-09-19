import { useState } from 'react';
import { useFilter } from '../../context/FilterContext';
import { ChevronDown, ChevronUp, Layers } from 'lucide-react';

export const foodCategories = [
  "Baked Products",
  "Beans, peas, legumes",
  "Beef Products",
  "Beverages",
  "Breads & Buns",
  "Cabbage",
  "Cake, Cookie & Cupcake Mixes",
  "Canned & Bottled Beans",
  "Canned Fruit",
  "Cereal Grains and Pasta",
  "Cheese",
  "Chips, Pretzels & Snacks",
  "Cream",
  "Dairy and Egg Products",
  "Energy, Protein & Muscle Recovery Drinks",
  "Fats and Oils",
  "Finfish and Shellfish Products",
  "Fruit & Vegetable Juice, Nectars & Fruit Drinks",
  "Fruits and Fruit Juices",
  "Lamb, goat, game",
  "Lamb, Veal, and Game Products",
  "Legumes and Legume Products",
  "Meal Replacement Supplements",
  "Milk",
  "Milk, whole",
  "Nut & Seed Butters",
  "Nut and Seed Products",
  "Nuts and seeds",
  "Olives, pickles, pickled vegetables",
  "Other Cooking Sauces",
  "Other fruits and fruit salads",
  "Other Snacks",
  "Other vegetables and combinations",
  "Pasta by Shape & Type",
  "Plant Based Milk",
  "Pork Products",
  "Poultry Products",
  "Restaurant Foods",
  "Salad dressings and vegetable oils",
  "Sausages and Luncheon Meats",
  "Soups, Sauces and Gravies",
  "Specialty Formula Supplements",
  "Spices and Herbs",
  "String beans",
  "Sweets",
  "Vegetable and Lentil Mixes",
  "Vegetables and Vegetable Products"
];

export default function CategoryFilter() {
  const { filters, setCategoryFilter } = useFilter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = foodCategories.filter(category =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayCategories = isExpanded ? filteredCategories : filteredCategories.slice(0, 5);

  const handleCategoryClick = (category: string) => {
    if (filters.categories.includes(category)) {
      setCategoryFilter(filters.categories.filter(c => c !== category));
    } else {
      setCategoryFilter([...filters.categories, category]);
    }
  };

  return (
    <div>
      <div className="flex items-center mb-3">
        <Layers className="w-4 h-4 mr-2 text-gray-500" />
        <h3 className="text-sm font-medium text-gray-900">Food Categories</h3>
      </div>

      {/* Search input */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search categories..."
        className="w-full px-3 py-1.5 mb-3 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Categories list */}
      <div className="space-y-1.5 max-h-48 overflow-y-auto">
        {displayCategories.map((category) => (
          <label
            key={category}
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-2 py-1.5 rounded-md transition-colors"
          >
            <input
              type="checkbox"
              checked={filters.categories.includes(category)}
              onChange={() => handleCategoryClick(category)}
              className="w-3.5 h-3.5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700 truncate">{category}</span>
          </label>
        ))}
      </div>

      {/* Show more/less button */}
      {filteredCategories.length > 5 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4" />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              Show {filteredCategories.length - 5} More
            </>
          )}
        </button>
      )}

      {/* Selected count */}
      {filters.categories.length > 0 && (
        <div className="mt-2 text-xs text-gray-500">
          {filters.categories.length} selected
        </div>
      )}
    </div>
  );
}