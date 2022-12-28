import { badRequest } from './../../../helpers/http/http-helper'
import { AddIngredientController } from './add-ingredient-controller'
import { AddIngredient, AddIngredientModel, HttpRequest, Validation } from './add-ingredients-controller-protocols'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    unit: 'any_unit',
    amount: 1
  }
})

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeAddIngredient = (): AddIngredient => {
  class AddIngredientStub implements AddIngredient {
    async add (data: AddIngredientModel): Promise<void> {
      return await new Promise(resolve => resolve())
    }
  }
  return new AddIngredientStub()
}

interface SutTypes {
  sut: AddIngredientController
  validationStub: Validation
  addIngredientStub: AddIngredient
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const addIngredientStub = makeAddIngredient()
  const sut = new AddIngredientController(validationStub, addIngredientStub)
  return {
    sut,
    validationStub,
    addIngredientStub
  }
}

describe('AddIngredient Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call Validation with correct values', async () => {
    const { sut, addIngredientStub } = makeSut()
    const addSpy = jest.spyOn(addIngredientStub, 'add')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith(httpRequest.body)
  })
})
