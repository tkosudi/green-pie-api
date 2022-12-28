import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeAddIngredientController } from '../factories/controllers/add-ingredient/add-ingredient-controller-factory'

export default (router: Router): void => {
  router.post('/ingredients', adaptRoute(makeAddIngredientController()))
}
