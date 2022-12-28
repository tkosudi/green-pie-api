import { AddIngredientRepository } from '../../../../data/protocols/db/ingredient/add-ingredient-repository'
import { AddIngredientModel } from '../../../../domain/useCases/add-Ingredient'
import { MongoHelper } from '../helpers/mongo-helper'

export class IngredientMongoRepository implements AddIngredientRepository {
  async add (ingredientData: AddIngredientModel): Promise<void> {
    const ingredientCollection = MongoHelper.getCollection('ingredients')
    await ingredientCollection.insertOne(ingredientData)
  }
}
