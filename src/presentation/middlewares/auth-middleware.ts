import { HttpRequest, HttpResponse, Middleware } from '../protocols'
import { forbidden, ok } from '../helpers/http/http-helper'
import { AccessDeniedError } from '../errors/access-denied-error'
import { LoadAccountByToken } from '../../domain/useCases/load-account-by-token'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const accessToken = httpRequest.headers?.['x-access-token']
    if (accessToken) {
      const account = await this.loadAccountByToken.load(accessToken)
      if (account) {
        return ok({
          accountId: account.id
        })
      }
    }
    return forbidden(new AccessDeniedError())
  }
}
