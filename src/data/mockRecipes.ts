import { Recipe } from '../types/recipe';

export const recipes: Recipe[] = [
  {
    id: 1,
    name: "Avocado Toast with Poached Egg",
    description: "A delicious and nutritious breakfast option featuring creamy avocado and perfectly poached eggs.",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
    tags: ["Breakfast", "Healthy", "Vegetarian"],
    category: "Dairy and Egg Products",
    ingredients: ["avocado", "egg", "sourdough bread", "salt", "pepper", "red pepper flakes"],
    nutrients: {
      calories: 320,
      protein: 15,
      carbs: 28,
      fat: 18
    },
    prepTime: 10,
    cookTime: 5,
    instructions: [
      "Toast the bread until golden and crisp",
      "Mash the avocado and spread on toast",
      "Poach the egg for 3 minutes",
      "Place egg on top of avocado",
      "Season with salt, pepper, and red pepper flakes"
    ]
  },
  {
    id: 2,
    name: "Mediterranean Quinoa Bowl",
    description: "A protein-packed quinoa bowl with fresh vegetables and feta cheese inspired by Mediterranean flavors.",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80",
    tags: ["Lunch", "Vegetarian", "Mediterranean"],
    category: "Cereal Grains and Pasta",
    ingredients: ["quinoa", "cucumber", "cherry tomatoes", "red onion", "feta cheese", "olive oil", "lemon juice"],
    nutrients: {
      calories: 380,
      protein: 12,
      carbs: 45,
      fat: 16
    },
    prepTime: 15,
    cookTime: 20,
    instructions: [
      "Cook quinoa according to package instructions",
      "Chop vegetables into bite-sized pieces",
      "Combine quinoa and vegetables in a bowl",
      "Crumble feta cheese on top",
      "Drizzle with olive oil and lemon juice"
    ]
  },
  {
    id: 3,
    name: "Chicken Tikka Masala",
    description: "A classic Indian dish featuring tender chicken in a creamy, spiced tomato sauce.",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    tags: ["Dinner", "Indian", "Spicy"],
    category: "Poultry Products",
    ingredients: ["chicken breast", "yogurt", "garam masala", "tomato sauce", "cream", "garlic", "ginger"],
    nutrients: {
      calories: 450,
      protein: 35,
      carbs: 15,
      fat: 25
    },
    prepTime: 30,
    cookTime: 40,
    instructions: [
      "Marinate chicken in yogurt and spices for at least 30 minutes",
      "Grill or bake chicken until cooked through",
      "Prepare sauce with tomatoes, cream, and spices",
      "Combine chicken with sauce and simmer for 10 minutes",
      "Serve with rice or naan bread"
    ]
  },
  {
    id: 4,
    name: "Berry Smoothie Bowl",
    description: "A refreshing and nutritious smoothie bowl topped with fresh fruits and granola.",
    image: "https://images.unsplash.com/photo-1494597564530-871f2b93ac55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2013&q=80",
    tags: ["Breakfast", "Vegan", "Healthy"],
    category: "Fruits and Fruit Juices",
    ingredients: ["mixed berries", "banana", "almond milk", "granola", "chia seeds", "honey"],
    nutrients: {
      calories: 280,
      protein: 8,
      carbs: 52,
      fat: 5
    },
    prepTime: 10,
    cookTime: 0,
    instructions: [
      "Blend berries, banana, and almond milk until smooth",
      "Pour into a bowl",
      "Top with fresh berries, granola, and chia seeds",
      "Drizzle with honey"
    ]
  },
  {
    id: 5,
    name: "Baked Salmon with Roasted Vegetables",
    description: "Flaky salmon fillet with colorful roasted vegetables and fresh herbs.",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    tags: ["Dinner", "Seafood", "Healthy"],
    category: "Finfish and Shellfish Products",
    ingredients: ["salmon fillet", "bell peppers", "zucchini", "red onion", "olive oil", "lemon", "dill"],
    nutrients: {
      calories: 420,
      protein: 32,
      carbs: 18,
      fat: 24
    },
    prepTime: 15,
    cookTime: 25,
    instructions: [
      "Preheat oven to 400°F (200°C)",
      "Arrange vegetables on a baking sheet and drizzle with olive oil",
      "Place salmon on top of vegetables",
      "Season with salt, pepper, and herbs",
      "Bake for 20-25 minutes until salmon is cooked through"
    ]
  },
  {
    id: 6,
    name: "Vegetable Stir Fry",
    description: "A quick and colorful vegetable stir fry with a savory sauce, perfect for weeknight dinners.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    tags: ["Dinner", "Vegan", "Asian"],
    category: "Vegetables and Vegetable Products",
    ingredients: ["broccoli", "carrot", "bell pepper", "snap peas", "garlic", "soy sauce", "ginger"],
    nutrients: {
      calories: 220,
      protein: 8,
      carbs: 35,
      fat: 5
    },
    prepTime: 15,
    cookTime: 10,
    instructions: [
      "Chop all vegetables into bite-sized pieces",
      "Heat oil in a wok or large skillet",
      "Add garlic and ginger, stir for 30 seconds",
      "Add vegetables and stir fry for 5-7 minutes",
      "Add sauce and cook for another 2 minutes"
    ]
  },
  {
    id: 7,
    name: "Classic Beef Burger",
    description: "A juicy homemade beef burger with all the traditional toppings on a toasted bun.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1899&q=80",
    tags: ["Lunch", "American", "Beef"],
    category: "Beef Products",
    ingredients: ["ground beef", "burger bun", "lettuce", "tomato", "onion", "cheese", "ketchup", "mustard"],
    nutrients: {
      calories: 580,
      protein: 30,
      carbs: 40,
      fat: 32
    },
    prepTime: 15,
    cookTime: 10,
    instructions: [
      "Form ground beef into patties",
      "Season with salt and pepper",
      "Grill or pan-fry until desired doneness",
      "Toast buns lightly",
      "Assemble burger with toppings and condiments"
    ]
  },
  {
    id: 8,
    name: "Chocolate Banana Smoothie",
    description: "A creamy, chocolatey smoothie that tastes like dessert but is packed with nutrients.",
    image: "https://images.unsplash.com/photo-1577805947697-89e18249d767?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1898&q=80",
    tags: ["Breakfast", "Vegetarian", "Sweet"],
    category: "Beverages",
    ingredients: ["banana", "cocoa powder", "almond milk", "Greek yogurt", "honey", "ice"],
    nutrients: {
      calories: 250,
      protein: 12,
      carbs: 42,
      fat: 4
    },
    prepTime: 5,
    cookTime: 0,
    instructions: [
      "Combine all ingredients in a blender",
      "Blend until smooth and creamy",
      "Pour into a glass and enjoy immediately"
    ]
  },
  {
    id: 9,
    name: "Caprese Salad",
    description: "A simple Italian salad with fresh tomatoes, mozzarella, and basil, drizzled with balsamic glaze.",
    image: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1972&q=80",
    tags: ["Appetizer", "Italian", "Vegetarian"],
    category: "Cheese",
    ingredients: ["tomatoes", "fresh mozzarella", "fresh basil", "olive oil", "balsamic glaze", "salt", "pepper"],
    nutrients: {
      calories: 280,
      protein: 14,
      carbs: 10,
      fat: 20
    },
    prepTime: 10,
    cookTime: 0,
    instructions: [
      "Slice tomatoes and mozzarella into rounds",
      "Arrange tomato and mozzarella slices on a plate, alternating",
      "Tuck fresh basil leaves between slices",
      "Drizzle with olive oil and balsamic glaze",
      "Season with salt and pepper"
    ]
  },
  {
    id: 10,
    name: "Mushroom Risotto",
    description: "A creamy Italian rice dish with sautéed mushrooms, white wine, and Parmesan cheese.",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    tags: ["Dinner", "Italian", "Vegetarian"],
    category: "Cereal Grains and Pasta",
    ingredients: ["arborio rice", "mushrooms", "onion", "garlic", "white wine", "vegetable broth", "Parmesan cheese", "butter"],
    nutrients: {
      calories: 420,
      protein: 10,
      carbs: 58,
      fat: 15
    },
    prepTime: 15,
    cookTime: 30,
    instructions: [
      "Sauté onion and garlic until soft",
      "Add mushrooms and cook until browned",
      "Add rice and toast for 1-2 minutes",
      "Add wine and simmer until absorbed",
      "Gradually add hot broth, stirring constantly",
      "Finish with butter and Parmesan cheese"
    ]
  }
];

export const allTags = Array.from(new Set(recipes.flatMap(recipe => recipe.tags)));

export const allIngredients = Array.from(new Set(recipes.flatMap(recipe => recipe.ingredients)));

export const nutrientRanges = {
  calories: {
    min: Math.min(...recipes.map(r => r.nutrients.calories)),
    max: Math.max(...recipes.map(r => r.nutrients.calories))
  },
  protein: {
    min: Math.min(...recipes.map(r => r.nutrients.protein)),
    max: Math.max(...recipes.map(r => r.nutrients.protein))
  },
  carbs: {
    min: Math.min(...recipes.map(r => r.nutrients.carbs)),
    max: Math.max(...recipes.map(r => r.nutrients.carbs))
  },
  fat: {
    min: Math.min(...recipes.map(r => r.nutrients.fat)),
    max: Math.max(...recipes.map(r => r.nutrients.fat))
  }
};
