import { FilterX, X } from 'lucide-react';
import CategoryFilter from './CategoryFilter';
import TagFilter from './TagFilter';
import NutrientFilter from './NutrientFilter';
import IngredientFilter from './IngredientFilter';
import { useFilter } from '../../context/FilterContext';

export default function Sidebar({ isMobileOpen, setIsMobileOpen }: { 
  isMobileOpen: boolean; 
  setIsMobileOpen: (open: boolean) => void;
}) {
  const { resetFilters } = useFilter();

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 lg:hidden transition-opacity duration-300"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-30 h-full w-full lg:w-72 transition-all duration-300 ease-in-out bg-white border-r border-gray-100
        lg:translate-x-0 lg:static lg:z-0
        ${isMobileOpen ? 'translate-x-0 shadow-xl' : '-translate-x-full lg:shadow-none'}
      `}>
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={resetFilters}
                className="inline-flex items-center px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              >
                <FilterX className="w-4 h-4 mr-1.5" />
                Reset
              </button>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="lg:hidden p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-6">
              <CategoryFilter />
              <TagFilter />
              <NutrientFilter />
              <IngredientFilter />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
