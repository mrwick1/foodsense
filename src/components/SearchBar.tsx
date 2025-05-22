import { Search } from 'lucide-react';
import { useFilter } from '../context/FilterContext';
import { useState, useEffect } from 'react';

export default function SearchBar() {
  const { setSearchTerm, filters } = useFilter();
  const [searchInput, setSearchInput] = useState(filters.search);
  
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setSearchTerm(searchInput);
    }, 300);
    
    return () => clearTimeout(debounceTimer);
  }, [searchInput, setSearchTerm]);

  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="w-5 h-5 text-gray-400" />
      </div>
      <input
        type="text"
        className="bg-white border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 shadow-sm"
        placeholder="Search recipes..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
    </div>
  );
}
