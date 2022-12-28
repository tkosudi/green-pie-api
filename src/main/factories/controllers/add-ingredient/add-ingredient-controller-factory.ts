import { AddIngredientController } from '../../../../presentation/controllers/login/ingredients/add-ingredient-controller'
import { Controller } from '../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeAddIngredientValidation } from './add-ingredient-validation-factory'
import { makeDbAddIngredient } from '../../usecases/add-ingredient/db-add-ingredient-factory'

export const makeAddIngredientController = (): Controller => {
  const controller = new AddIngredientController(makeAddIngredientValidation(), makeDbAddIngredient())
  return makeLogControllerDecorator(controller)
}
