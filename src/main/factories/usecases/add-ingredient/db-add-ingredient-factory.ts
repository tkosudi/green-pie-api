import { AddIngredient } from '../../../../domain/useCases/add-Ingredient'
import { DbAddIngredient } from '../../../../data/useCases/add-ingredients/db-add-ingredient'
import { IngredientMongoRepository } from '../../../../infra/db/mongodb/ingredient/ingredient-mongo-repository'

export const makeDbAddIngredient = (): AddIngredient => {
  const ingredientMongoRepository = new IngredientMongoRepository()
  return new DbAddIngredient(ingredientMongoRepository)
}
