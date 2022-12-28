import { DbAddIngredient } from './db-add-ingredient'
import { AddIngredientModel, AddIngredientRepository } from './db-add-ingredient-protocols'

const makeFakeIngredientData = (): AddIngredientModel => ({
  name: 'any_name',
  unit: 'any_unit',
  amount: 1
})

describe('DbAddIngredient Usecase', () => {
  test('Should call AddIngredientRepository with correct values', async () => {
    class AddIngredientRepositoryStub implements AddIngredientRepository {
      async add (ingredientData: AddIngredientModel): Promise<void> {
        return await new Promise(resolve => resolve())
      }
    }
    const addIngredientRepositoryStub = new AddIngredientRepositoryStub()
    const addSpy = jest.spyOn(addIngredientRepositoryStub, 'add')
    const sut = new DbAddIngredient(addIngredientRepositoryStub)
    const ingredientData = makeFakeIngredientData()
    await sut.add(ingredientData)

    expect(addSpy).toHaveBeenCalledWith(ingredientData)
  })
})
