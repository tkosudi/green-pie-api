import { HttpRequest, Validation } from '../../protocols'
import { TransactionController } from './transaction-controller'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    type: 'any_type',
    description: 'any_description',
    categoryId: 'any_categoryId',
    amount: 'any_valor'
  }
})

interface SutTypes {
  sut: TransactionController
  validationStub: Validation
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
  const sut = new TransactionController(validationStub)
  return {
    sut,
    validationStub
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
})
