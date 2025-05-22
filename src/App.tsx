import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Routes, Route, Link } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import Sidebar from './components/Sidebar/Sidebar';
import RecipeGrid from './components/RecipeGrid';
import RecipeDetail from './components/RecipeDetail/RecipeDetail';
import { FilterProvider } from './context/FilterContext';
import './index.css';

export function App() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  return (
    <FilterProvider>
      <div className="min-h-screen flex flex-col bg-gray-50" style={{ fontFamily: 'Inter, sans-serif' }}>
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <button
                  className="lg:hidden mr-4 p-2 rounded-md hover:bg-gray-100 focus:outline-none"
                  onClick={() => setIsMobileOpen(!isMobileOpen)}
                >
                  {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
                <Link to="/" className="text-xl font-bold text-gray-900">Foodsense</Link>
              </div>
              <div className="hidden md:block flex-1 max-w-lg mx-8">
                <SearchBar />
              </div>
              <nav className="flex items-center space-x-4">
                <Link to="/upgrade" className="text-gray-600 hover:text-gray-900 font-medium">Upgrade</Link>
                <Link to="/signin" className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700">Sign In</Link>
              </nav>
            </div>
            <div className="md:hidden py-3">
              <SearchBar />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={
              <div className="flex flex-col lg:flex-row gap-8 flex-1 min-h-0 py-8 ">
                <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />
                <div className="flex-1 min-w-0 ">
                  <RecipeGrid />
                </div>
              </div>
            } />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route path="/upgrade" element={<div>Upgrade Page</div>} />
            <Route path="/signin" element={<div>Sign In Page</div>} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm">© 2025 Foodsense. All rights reserved.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link to="/terms" className="text-gray-500 hover:text-gray-900 text-sm">Terms</Link>
                <Link to="/privacy" className="text-gray-500 hover:text-gray-900 text-sm">Privacy</Link>
                <Link to="/contact" className="text-gray-500 hover:text-gray-900 text-sm">Contact</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </FilterProvider>
  );
}

export default App;
