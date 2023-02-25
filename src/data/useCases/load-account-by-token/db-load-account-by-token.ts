import { AccountModel } from '../add-account/db-add-account-protocols'
import { Decrypter } from '../../protocols/criptography/decrypter'

export class DbLoadAccountByToken {
  constructor (private readonly decrypter: Decrypter) { }

  async load (accessToken: string, role?: string): Promise<AccountModel> {
    await this.decrypter.decrypt(accessToken)
    return await new Promise(resolve => resolve(null))
  }
}
