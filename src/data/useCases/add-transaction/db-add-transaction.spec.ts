import { AddTransactionRepository, AddTransactionModel } from './db-add-transaction-protocols'
import { DbAddTransaction } from './db-add-transaction'

const makeFakeTransactionData = (): AddTransactionModel => ({
  type: 'debt',
  description: 'any_description',
  categoryId: 'any_categoryId',
  amount: 100
})

describe('AddTransaction Usecase', () => {
  test('Should call AddTransactionRepository with correct values', async () => {
    class AddTransactionRepositoryStub implements AddTransactionRepository {
      async add (transactionData: AddTransactionModel): Promise<void> {
        return await new Promise(resolve => resolve())
      }
    }
    const addTransactionRepositoryStub = new AddTransactionRepositoryStub()
    const addSpy = jest.spyOn(addTransactionRepositoryStub, 'add')
    const sut = new DbAddTransaction(addTransactionRepositoryStub)
    const transactionData = makeFakeTransactionData()
    await sut.add(transactionData)
    expect(addSpy).toHaveBeenCalledWith(transactionData)
  })
})
