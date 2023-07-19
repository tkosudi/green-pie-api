import { MongoHelper } from '../helpers/mongo-helper'
import { AddTransactionModel, AddTransactionRepository } from '../../../../data/useCases/add-transaction/db-add-transaction-protocols'

export class TransactionMongoRepository implements AddTransactionRepository {
  async add (transactionData: AddTransactionModel): Promise<void> {
    await MongoHelper.getCollection('transactions').insertOne(transactionData)
  }
}
