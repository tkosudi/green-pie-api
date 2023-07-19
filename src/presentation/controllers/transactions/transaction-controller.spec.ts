import { HttpRequest, Validation, AddTransaction, AddTransactionModel } from './transaction-controller-protocols'
import { AddTransactionController } from './transaction-controller'
import { badRequest } from '../../helpers/http/http-helper'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    type: 'any_type',
    description: 'any_description',
    categoryId: 'any_categoryId',
    amount: 'any_valor'
  }
})

interface SutTypes {
  sut: AddTransactionController
  validationStub: Validation
  addtransactionStub: AddTransaction
}

const makeAddTransaction = (): AddTransaction => {
  class AddTransactionStub implements AddTransaction {
    async add (data: AddTransactionModel): Promise<void> {
      return await new Promise(resolve => resolve())
    }
  }
  return new AddTransactionStub()
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const addtransactionStub = makeAddTransaction()
  const sut = new AddTransactionController(validationStub, addtransactionStub)
  return {
    sut,
    validationStub,
    addtransactionStub
  }
}

describe('Transactions Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should returns 400 if Validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call AddTransaction with correct values', async () => {
    const { sut, addtransactionStub } = makeSut()
    const addSpy = jest.spyOn(addtransactionStub, 'add')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith(httpRequest.body)
  })
})
