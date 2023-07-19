import { AddTransaction, AddTransactionModel, AddTransactionRepository } from './db-add-transaction-protocols'

export class DbAddTransaction implements AddTransaction {
  constructor (private readonly addTransactionRepository: AddTransactionRepository) { }
  async add (transaction: AddTransactionModel): Promise<void> {
    await this.addTransactionRepository.add(transaction)
  }
}
