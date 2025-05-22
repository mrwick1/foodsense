import { Download, Clock, ChefHat } from "lucide-react";
import { Link } from "react-router-dom";

interface RecipeCardProps {
  id: number;
  name: string;
  description: string;
  image: string;
  tags: string[];
  isPremium: boolean;
  prepTime?: number;
  cookTime?: number;
}

export default function RecipeCard({
  id,
  name,
  description,
  image,
  tags,
  isPremium,
  prepTime = 15,
  cookTime = 30,
}: RecipeCardProps) {
  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isPremium) {
      alert("Please upgrade to Premium to download recipes");
    }
  };

  return (
    <div className="group relative bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {tags.length > 0 && (
          <div className="absolute top-3 left-3">
            <div className="bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-medium px-3 py-1.5 rounded-full shadow-sm">
              {tags[0]}
            </div>
          </div>
        )}
        <button
          onClick={handleDownload}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
            isPremium
              ? "bg-white/90 text-gray-400 cursor-not-allowed"
              : "bg-white/90 text-gray-700 hover:bg-white hover:text-gray-900"
          }`}
          title={isPremium ? "Upgrade to Premium to download" : "Download recipe"}
          disabled={isPremium}
        >
          <Download className="w-4 h-4" />
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{prepTime}m</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <ChefHat className="w-4 h-4" />
            <span>{cookTime}m</span>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        <Link
          to={`/recipe/${id}`}
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          View Recipe
          <svg
            className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
