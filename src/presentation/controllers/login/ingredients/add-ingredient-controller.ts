import { Controller, HttpResponse, HttpRequest, Validation } from './add-ingredients-controller-protocols'

export class AddIngredientController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    this.validation.validate(httpRequest.body)
    return await new Promise(resolve => resolve(null))
  }
}
