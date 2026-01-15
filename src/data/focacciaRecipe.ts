export interface Ingredient {
  name: string
  percentage: number // Baker's percentage (flour = 100)
  unit: string
}

export interface Recipe {
  name: string
  description: string
  ingredients: Ingredient[]
}

export const focacciaRecipe: Recipe = {
  name: 'Classic Focaccia',
  description: 'A simple, olive oil-rich Italian flatbread',
  ingredients: [
    { name: 'Bread Flour', percentage: 100, unit: 'g' },
    { name: 'Water', percentage: 72, unit: 'g' },
    { name: 'Olive Oil', percentage: 5, unit: 'g' },
    { name: 'Salt', percentage: 2, unit: 'g' },
    { name: 'Instant Yeast', percentage: 1.5, unit: 'g' },
  ],
}
