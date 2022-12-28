import { DbAddIngredient } from './db-add-ingredient'
import { AddIngredientModel, AddIngredientRepository } from './db-add-ingredient-protocols'

const makeFakeIngredientData = (): AddIngredientModel => ({
  name: 'any_name',
  unit: 'any_unit',
  amount: 1
})

const makeAddIngredientRepository = (): AddIngredientRepository => {
  class AddIngredientRepositoryStub implements AddIngredientRepository {
    async add (ingredientData: AddIngredientModel): Promise<void> {
      return await new Promise(resolve => resolve())
    }
  }
  return new AddIngredientRepositoryStub()
}

interface SutTypes {
  sut: DbAddIngredient
  addIngredientRepositoryStub: AddIngredientRepository
}

const makeSut = (): SutTypes => {
  const addIngredientRepositoryStub = makeAddIngredientRepository()
  const sut = new DbAddIngredient(addIngredientRepositoryStub)

  return {
    sut,
    addIngredientRepositoryStub
  }
}

describe('DbAddIngredient Usecase', () => {
  test('Should call AddIngredientRepository with correct values', async () => {
    const { sut, addIngredientRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addIngredientRepositoryStub, 'add')
    const ingredientData = makeFakeIngredientData()
    await sut.add(ingredientData)

    expect(addSpy).toHaveBeenCalledWith(ingredientData)
  })

  test('Should throw if AddIngredientRepository throws', async () => {
    const { sut, addIngredientRepositoryStub } = makeSut()
    jest.spyOn(addIngredientRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.add(makeFakeIngredientData())
    await expect(promise).rejects.toThrow()
  })
})
