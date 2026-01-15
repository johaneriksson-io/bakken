# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Project Overview

Bakken is a parametric bread recipe application. It displays a focaccia recipe with a slider to scale all ingredients based on total dough weight (100-2000g) using baker's percentages.

## Tech Stack

- **Framework**: Vue 3 + TypeScript + Vite
- **UI Components**: shadcn-vue (Card, Slider, Input, Label)
- **Styling**: Tailwind CSS v4
- **Testing**: Vitest with @vue/test-utils
- **Linting/Formatting**: ESLint + Prettier
- **Git Hooks**: Husky + lint-staged (pre-commit)
- **Tool Management**: mise (Node.js pinning)
- **Deployment**: Firebase Hosting

## Project Structure

```
src/
├── components/ui/     # shadcn-vue components
├── composables/       # Vue composables (useRecipeCalculator)
├── data/              # Recipe definitions (focacciaRecipe)
├── App.vue            # Main application component
└── main.ts            # Entry point

tests/
└── composables/       # Unit tests for composables
```

## Key Files

- `src/data/focacciaRecipe.ts` - Recipe with baker's percentages
- `src/composables/useRecipeCalculator.ts` - Scaling calculation logic
- `src/App.vue` - Main UI with slider and ingredient list

## Commands

```bash
pnpm dev          # Start dev server
pnpm build        # Build for production
pnpm test         # Run tests (watch mode)
pnpm test:run     # Run tests once
pnpm lint         # Run ESLint
pnpm format       # Run Prettier
pnpm deploy       # Build and deploy to Firebase
```

## Baker's Percentages

The recipe uses baker's percentages where flour is always 100%:
- Bread Flour: 100%
- Water: 72%
- Olive Oil: 5%
- Salt: 2%
- Instant Yeast: 1.5%

Total dough weight is calculated from the sum of percentages (180.5%).
