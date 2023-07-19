import { AddTransactionRepository, AddTransactionModel } from './db-add-transaction-protocols'
import { DbAddTransaction } from './db-add-transaction'

const makeFakeTransactionData = (): AddTransactionModel => ({
  type: 'debt',
  description: 'any_description',
  categoryId: 'any_categoryId',
  amount: 100
})

const makeAddtransactionRepository = (): AddTransactionRepository => {
  class AddTransactionRepositoryStub implements AddTransactionRepository {
    async add (transactionData: AddTransactionModel): Promise<void> {
      return await new Promise(resolve => resolve())
    }
  }
  return new AddTransactionRepositoryStub()
}

interface SutTypes {
  sut: DbAddTransaction
  addTransactionRepositoryStub: AddTransactionRepository
}

const makeSut = (): SutTypes => {
  const addTransactionRepositoryStub = makeAddtransactionRepository()
  const sut = new DbAddTransaction(addTransactionRepositoryStub)

  return {
    sut,
    addTransactionRepositoryStub
  }
}

describe('AddTransaction Usecase', () => {
  test('Should call AddTransactionRepository with correct values', async () => {
    const { sut, addTransactionRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addTransactionRepositoryStub, 'add')
    const transactionData = makeFakeTransactionData()
    await sut.add(transactionData)
    expect(addSpy).toHaveBeenCalledWith(transactionData)
  })
})
