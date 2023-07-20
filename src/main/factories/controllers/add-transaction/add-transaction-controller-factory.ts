import { AddTransactionController } from '../../../../presentation/controllers/transactions/add-transaction-controller'
import { Controller } from '../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeDbAddTransaction } from '../../usecases/add-transaction/db-add-transaction-factory'
import { makeAddTransactionValidation } from './add-transaction-validation-factory'

export const makeAddTransactionController = (): Controller => {
  const controller = new AddTransactionController(makeAddTransactionValidation(), makeDbAddTransaction())
  return makeLogControllerDecorator(controller)
}
