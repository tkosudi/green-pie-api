import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { IngredientMongoRepository } from './ingredient-mongo-repository'

let ingredientCollection: Collection

describe('Ingredient Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    ingredientCollection = MongoHelper.getCollection('ingredients')
    await ingredientCollection.deleteMany({})
  })

  const makeSut = (): IngredientMongoRepository => {
    return new IngredientMongoRepository()
  }

  test('Should add ingredient on success', async () => {
    const sut = makeSut()
    await sut.add({
      name: 'any_name',
      unit: 'any_unit',
      amount: 1
    })

    const ingredient = await ingredientCollection.findOne({
      name: 'any_name'
    })

    expect(ingredient).toBeTruthy()
  })
})
