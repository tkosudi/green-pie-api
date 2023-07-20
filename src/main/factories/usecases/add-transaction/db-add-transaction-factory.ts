import { AddTransaction } from '../../../../domain/useCases/add-transaction'
import { DbAddTransaction } from '../../../../data/useCases/add-transaction/db-add-transaction'
import { TransactionMongoRepository } from '../../../../infra/db/mongodb/transaction/transaction-mongo-repository'

export const makeDbAddTransaction = (): AddTransaction => {
  const transactionMongoRepository = new TransactionMongoRepository()
  return new DbAddTransaction(transactionMongoRepository)
}
