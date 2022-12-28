import { AddIngredientModel } from '../../../../domain/useCases/add-Ingredient'

export interface AddIngredientRepository {
  add: (ingredientData: AddIngredientModel) => Promise<void>
}
