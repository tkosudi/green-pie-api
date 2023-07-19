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

describe('Transactions Controller', () => {
  test('Should call Validation with correct values', async () => {
    class ValidationStub implements Validation {
      validate (input: any): Error | null {
        return null
      }
    }
    const validationStub = new ValidationStub()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const sut = new TransactionController(validationStub)
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })
})
