import { describe, it, expect } from 'vitest'
import { useRecipeCalculator } from '@/composables/useRecipeCalculator'
import { focacciaRecipe } from '@/data/focacciaRecipe'

describe('useRecipeCalculator', () => {
  it('calculates correct flour weight from total dough weight', () => {
    const { totalWeight, flourWeight } = useRecipeCalculator(focacciaRecipe)

    // Total percentage = 100 + 72 + 5 + 2 + 1.5 = 180.5%
    // For 500g total: flour = 500 / 1.805 ≈ 277g
    totalWeight.value = 500
    expect(flourWeight.value).toBeCloseTo(277, 0)
  })

  it('scales all ingredients proportionally', () => {
    const { totalWeight, calculatedIngredients } =
      useRecipeCalculator(focacciaRecipe)
    totalWeight.value = 1000

    const flour = calculatedIngredients.value.find(
      (i) => i.name === 'Bread Flour'
    )
    const water = calculatedIngredients.value.find((i) => i.name === 'Water')

    // Water should be 72% of flour
    expect(water!.amount / flour!.amount).toBeCloseTo(0.72, 1)
  })

  it('handles minimum weight', () => {
    const { totalWeight, calculatedIngredients } =
      useRecipeCalculator(focacciaRecipe)

    totalWeight.value = 100
    expect(calculatedIngredients.value.every((i) => i.amount >= 0)).toBe(true)
  })

  it('handles maximum weight', () => {
    const { totalWeight, calculatedIngredients } =
      useRecipeCalculator(focacciaRecipe)

    totalWeight.value = 2000
    expect(calculatedIngredients.value.every((i) => i.amount > 0)).toBe(true)
  })

  it('calculates all ingredients correctly for default weight', () => {
    const { calculatedIngredients } = useRecipeCalculator(focacciaRecipe)

    // Default is 500g total
    // Total percentage = 180.5%, flour = 500 / 1.805 ≈ 277g
    const ingredients = calculatedIngredients.value
    expect(ingredients).toHaveLength(5)

    const flour = ingredients.find((i) => i.name === 'Bread Flour')
    expect(flour?.amount).toBeCloseTo(277, 0)

    const water = ingredients.find((i) => i.name === 'Water')
    expect(water?.amount).toBeCloseTo(199, 0)

    const salt = ingredients.find((i) => i.name === 'Salt')
    expect(salt?.amount).toBeCloseTo(6, 0)
  })
})
