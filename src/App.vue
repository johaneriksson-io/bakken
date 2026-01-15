<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { focacciaRecipe } from '@/data/focacciaRecipe'
import { useRecipeCalculator } from '@/composables/useRecipeCalculator'

const { totalWeight, calculatedIngredients } =
  useRecipeCalculator(focacciaRecipe)

const handleSliderChange = (value: number[] | undefined) => {
  if (value?.[0] !== undefined) {
    totalWeight.value = value[0]
  }
}

const handleInputChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = parseInt(target.value, 10)
  if (!isNaN(value) && value > 0) {
    totalWeight.value = Math.min(Math.max(value, 100), 2000)
  }
}
</script>

<template>
  <main class="min-h-screen bg-stone-50 p-8">
    <div class="mx-auto max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>{{ focacciaRecipe.name }}</CardTitle>
          <CardDescription>{{ focacciaRecipe.description }}</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <Label for="weight">Total Dough Weight</Label>
              <div class="flex items-center gap-2">
                <Input
                  id="weight"
                  type="number"
                  :value="totalWeight"
                  class="w-20 text-right"
                  :min="100"
                  :max="2000"
                  @input="handleInputChange"
                />
                <span class="text-sm text-muted-foreground">g</span>
              </div>
            </div>
            <Slider
              :model-value="[totalWeight]"
              :min="100"
              :max="2000"
              :step="10"
              @update:model-value="handleSliderChange"
            />
          </div>

          <div class="space-y-2">
            <h3 class="font-medium">Ingredients</h3>
            <ul class="space-y-1">
              <li
                v-for="ingredient in calculatedIngredients"
                :key="ingredient.name"
                class="flex justify-between text-sm"
              >
                <span>{{ ingredient.name }}</span>
                <span class="tabular-nums">
                  {{ ingredient.amount }}{{ ingredient.unit }}
                  <span class="text-muted-foreground"
                    >({{ ingredient.percentage }}%)</span
                  >
                </span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  </main>
</template>
