import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeAddTransactionController } from '../factories/controllers/add-transaction/add-transaction-controller-factory'

export default (router: Router): void => {
  router.post('/transactions', adaptRoute(makeAddTransactionController()))
}
