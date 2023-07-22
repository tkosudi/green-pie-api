import { Collection, InsertOneResult } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'
import env from '../config/env'
import { sign } from 'jsonwebtoken'

let transactionCollection: Collection
let accountCollection: Collection

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
    accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /transactions', () => {
    test('Should return 403 on add transaction without accessToken', async () => {
      await request(app)
        .post('/api/transactions')
        .send({
          type: 'credit',
          description: 'any_description',
          categoryId: 'any_categoryId',
          amount: 100
        })
        .expect(403)
    })
  })

  test('Should return 204 on add transaction with valid accessToken', async () => {
    const res: InsertOneResult<Document> = await accountCollection.insertOne({
      name: 'TK',
      email: 'tk@gmail.com',
      password: '123',
      role: 'admin'
    })

    const id = res.insertedId
    const accessToken = sign({ id }, env.jwtSecret)
    await accountCollection.updateOne(
      {
        _id: id
      },
      {
        $set: {
          accessToken
        }
      }
    )

    await request(app)
      .post('/api/transactions')
      .set('x-access-token', accessToken)
      .send({
        type: 'credit',
        description: 'any_description',
        categoryId: 'any_categoryId',
        amount: 100
      })
      .expect(204)
  })
})
