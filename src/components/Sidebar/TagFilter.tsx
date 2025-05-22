import { useFilter } from '../../context/FilterContext';
import { allTags } from '../../data/mockRecipes';
import { Tag } from 'lucide-react';

export default function TagFilter() {
  const { filters, setTagFilter } = useFilter();
  
  const handleTagClick = (tag: string) => {
    if (filters.tags.includes(tag)) {
      setTagFilter(filters.tags.filter(t => t !== tag));
    } else {
      setTagFilter([...filters.tags, tag]);
    }
  };

  return (
    <div>
      <div className="flex items-center mb-3">
        <Tag className="w-4 h-4 mr-2 text-gray-500" />
        <h3 className="text-sm font-medium text-gray-900">Tags</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={`
              px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200
              ${filters.tags.includes(tag)
                ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-200 hover:bg-blue-100'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }
            `}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
