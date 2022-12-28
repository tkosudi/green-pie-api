import { badRequest } from './../../../helpers/http/http-helper'
import { Controller, HttpResponse, HttpRequest, Validation, AddIngredient } from './add-ingredients-controller-protocols'

export class AddIngredientController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addIngredient: AddIngredient
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    if (error) {
      return badRequest(error)
    }
    const { name, unit, amount } = httpRequest.body
    await this.addIngredient.add({
      name,
      unit,
      amount
    })
    return await new Promise(resolve => resolve(null))
  }
}
