import { AccountMongoRepository } from '../../../../../infra/db/mongodb/account/account-repository'
import { LoadAccountByToken } from '../../../../../domain/useCases/load-account-by-token'
import { DbLoadAccountByToken } from '../../../../../data/useCases/load-account-by-token/db-load-account-by-token'
import { JwtAdapter } from '../../../../../infra/criptography/jwt-adapter/jwt-adapter'
import env from '../../../../config/env'

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbLoadAccountByToken(jwtAdapter, accountMongoRepository)
}
