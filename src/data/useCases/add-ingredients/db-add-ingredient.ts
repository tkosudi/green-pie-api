import { AddIngredient, AddIngredientModel, AddIngredientRepository } from './db-add-ingredient-protocols'

export class DbAddIngredient implements AddIngredient {
  constructor (private readonly addIngredientRepository: AddIngredientRepository) {}
  async add (data: AddIngredientModel): Promise<void> {
    await this.addIngredientRepository.add(data)
  }
}
