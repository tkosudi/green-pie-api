import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'
import env from '../config/env'

let transactionCollection: Collection

describe('Transaction Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrl)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    transactionCollection = MongoHelper.getCollection('transactions')
    await transactionCollection.deleteMany({})
  })

  describe('POST /transactions', () => {
    test('Should return 204 on transaction success', async () => {
      await request(app)
        .post('/api/transactions')
        .send({
          type: 'credit',
          description: 'any_description',
          categoryId: 'any_categoryId',
          amount: 100
        })
        .expect(204)
    })
  })
})
