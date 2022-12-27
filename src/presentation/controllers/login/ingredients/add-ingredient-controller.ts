import { badRequest } from './../../../helpers/http/http-helper'
import { Controller, HttpResponse, HttpRequest, Validation } from './add-ingredients-controller-protocols'

export class AddIngredientController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    if (error) {
      return badRequest(error)
    }
    return await new Promise(resolve => resolve(null))
  }
}
