import { AccountModel } from '../../../domain/models/account'
import { LoadAccountByEmailRepository } from './../../protocols/load-account-by-email-repository'
import { DbAuthentication } from './db-authentication'

describe('DbAuthentication UseCase', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    class LoadAccountRepositoryStub implements LoadAccountByEmailRepository {
      async load (email: string): Promise<AccountModel> {
        const account: AccountModel = {
          id: 'any_id',
          name: 'any_name',
          email: 'any_email@mail.com',
          password: 'any_password'
        }
        return await new Promise(resolve => resolve(account))
      }
    }

    const loadAccountRepositoryStub = new LoadAccountRepositoryStub()
    const sut = new DbAuthentication(loadAccountRepositoryStub)
    const loadSpy = jest.spyOn(loadAccountRepositoryStub, 'load')
    await sut.auth({
      email: 'any_email@mail.com',
      password: 'any_password'
    })

    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})