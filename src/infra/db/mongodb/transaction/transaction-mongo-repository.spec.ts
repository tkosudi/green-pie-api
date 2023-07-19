import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import env from '../../../../main/config/env'
import { TransactionMongoRepository } from './transaction-mongo-repository'

let transactionCollection: Collection

const makeSut = (): TransactionMongoRepository => {
  return new TransactionMongoRepository()
}

describe('Transaction Mongo Repository', () => {
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

  test('Should add a transaction on success', async () => {
    const sut = makeSut()
    await sut.add({
      type: 'debt',
      description: 'any_description',
      categoryId: 'any_categoryId',
      amount: 100
    })

    const transaction = await transactionCollection.findOne({ description: 'any_description' })
    expect(transaction).toBeTruthy()
  })
})
