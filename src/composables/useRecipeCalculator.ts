import { computed, ref, type Ref, type ComputedRef } from 'vue'
import type { Recipe, Ingredient } from '@/data/focacciaRecipe'

export interface CalculatedIngredient extends Ingredient {
  amount: number
}

export interface UseRecipeCalculatorReturn {
  totalWeight: Ref<number>
  calculatedIngredients: ComputedRef<CalculatedIngredient[]>
  flourWeight: ComputedRef<number>
}

export function useRecipeCalculator(recipe: Recipe): UseRecipeCalculatorReturn {
  const totalWeight = ref(500) // Default 500g total dough

  // Sum of all percentages to calculate flour weight from total
  const totalPercentage = computed(() =>
    recipe.ingredients.reduce((sum, ing) => sum + ing.percentage, 0)
  )

  // Flour weight = total weight / (total percentage / 100)
  const flourWeight = computed(
    () => totalWeight.value / (totalPercentage.value / 100)
  )

  const calculatedIngredients = computed(() =>
    recipe.ingredients.map((ing) => ({
      ...ing,
      amount: Math.round((flourWeight.value * ing.percentage) / 100),
    }))
  )

  return {
    totalWeight,
    calculatedIngredients,
    flourWeight,
  }
}
