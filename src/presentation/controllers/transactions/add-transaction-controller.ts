import { badRequest, serverError } from '../../helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation, AddTransaction } from './add-transaction-controller-protocols'

export class AddTransactionController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addTransaction: AddTransaction
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)

      if (error) {
        return badRequest(error)
      }

      const { type, description, categoryId, amount } = httpRequest.body

      await this.addTransaction.add({
        type,
        description,
        categoryId,
        amount
      })

      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
