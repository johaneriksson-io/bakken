<script setup lang="ts">
import { ref, watch } from 'vue'
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

// Track which ingredients are currently highlighted
const highlightedIngredients = ref<Set<string>>(new Set())

// Watch for changes in calculated ingredients and trigger highlight
watch(
  calculatedIngredients,
  (newIngredients, oldIngredients) => {
    if (!oldIngredients) return

    newIngredients.forEach((newIng, index) => {
      const oldIng = oldIngredients[index]
      if (oldIng && newIng.amount !== oldIng.amount) {
        highlightedIngredients.value.add(newIng.name)
        setTimeout(() => {
          highlightedIngredients.value.delete(newIng.name)
        }, 300)
      }
    })
  },
  { deep: true }
)

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
  <main class="min-h-screen bg-background px-4 py-8 sm:px-6 sm:py-12">
    <div class="mx-auto max-w-2xl">
      <div class="mb-6 flex items-center justify-center">
        <img
          src="@/assets/culinarial_hat_logo_vector_tight.svg"
          alt="Culinarial hat logo"
          class="h-16 w-auto"
        />
      </div>
      <Card class="border-border/80 bg-card shadow-sm">
        <CardHeader>
          <CardTitle class="text-2xl">{{ focacciaRecipe.name }}</CardTitle>
          <CardDescription class="text-base">
            {{ focacciaRecipe.description }}
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-8">
          <section class="space-y-4">
            <div class="flex flex-wrap items-center justify-between gap-4">
              <Label for="weight" class="text-base font-medium sm:text-sm">
                Total Dough Weight
              </Label>
              <div class="flex items-center gap-2">
                <Input
                  id="weight"
                  type="number"
                  :value="totalWeight"
                  class="w-28 text-right text-lg sm:w-24 sm:text-base"
                  :min="100"
                  :max="2000"
                  @input="handleInputChange"
                />
                <span class="text-base text-muted-foreground sm:text-sm"
                  >g</span
                >
              </div>
            </div>
            <div
              class="rounded-lg border border-border bg-secondary/60 p-4 sm:p-4"
            >
              <div class="mb-4 flex items-center justify-center">
                <span
                  class="text-4xl font-bold tabular-nums text-primary transition-all duration-200 sm:text-3xl"
                >
                  {{ totalWeight }}g
                </span>
              </div>
              <div class="px-2 py-3 sm:px-0 sm:py-0">
                <Slider
                  :model-value="[totalWeight]"
                  :min="100"
                  :max="2000"
                  :step="10"
                  @update:model-value="handleSliderChange"
                />
              </div>
              <div
                class="mt-3 flex items-center justify-between text-sm text-muted-foreground sm:text-xs"
              >
                <span>100g</span>
                <span>2000g</span>
              </div>
            </div>
          </section>

          <section class="space-y-4">
            <h3
              class="text-sm font-semibold uppercase tracking-wide text-muted-foreground sm:text-sm"
            >
              Ingredients
            </h3>
            <ul class="divide-y divide-border text-base sm:text-base">
              <li
                v-for="ingredient in calculatedIngredients"
                :key="ingredient.name"
                class="grid grid-cols-[1fr_auto] items-center gap-4 py-3 transition-colors duration-200 sm:py-2"
                :class="{
                  'bg-primary/10': highlightedIngredients.has(ingredient.name),
                }"
              >
                <span class="font-medium">{{ ingredient.name }}</span>
                <span class="flex items-baseline gap-2 tabular-nums">
                  <span
                    class="text-lg font-semibold transition-all duration-200 sm:text-base"
                    :class="{
                      'scale-105 text-primary': highlightedIngredients.has(
                        ingredient.name
                      ),
                    }"
                  >
                    {{ ingredient.amount }}{{ ingredient.unit }}
                  </span>
                  <span
                    class="text-sm font-semibold text-foreground/70 sm:text-xs"
                  >
                    {{ ingredient.percentage }}%
                  </span>
                </span>
              </li>
            </ul>
          </section>
        </CardContent>
      </Card>
    </div>
  </main>
</template>
