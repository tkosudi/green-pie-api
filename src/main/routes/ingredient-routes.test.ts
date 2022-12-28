import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

let ingredientCollection: Collection

describe('Login Routes', () => {
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

  describe('POST /ingredients', () => {
    test('Should return 204 on add ingredient success', async () => {
      await request(app)
        .post('/api/ingredients')
        .send({
          name: 'anu_name',
          unit: 'any_unit',
          amount: 1
        })
        .expect(204)
    })
  })
})
