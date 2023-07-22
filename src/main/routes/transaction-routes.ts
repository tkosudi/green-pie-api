import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddTransactionController } from '../factories/controllers/transaction/add-transaction/add-transaction-controller-factory'
import { adaptMiddleware } from '../adapters/express-middleware-adapter'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'

export default (router: Router): void => {
  const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
  router.post('/transactions', adminAuth, adaptRoute(makeAddTransactionController()))
}
