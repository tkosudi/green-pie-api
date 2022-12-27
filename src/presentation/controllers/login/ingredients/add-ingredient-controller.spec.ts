import { Validation } from './../../../protocols/validation'
import { AddIngredientController } from './add-ingredient-controller'
import { HttpRequest } from './add-ingredients-controller-protocols'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    unit: 'any_unit',
    amount: 1
  }
})

describe('AddIngredient Controller', () => {
  test('Should call Validation with correct values', async () => {
    class ValidationStub implements Validation {
      validate (input: any): Error {
        return null
      }
    }
    const validationStub = new ValidationStub()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const sut = new AddIngredientController(validationStub)
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })
})
