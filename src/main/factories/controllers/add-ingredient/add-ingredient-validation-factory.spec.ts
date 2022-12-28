import { RequiredFieldValidation, ValidationComposite } from '../../../../validation/validators'
import { Validation } from '../../../../presentation/protocols/validation'
import { makeAddIngredientValidation } from './add-ingredient-validation-factory'

jest.mock('../../../../validation/validators/validation-composite.ts')

describe('AddIngredientValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddIngredientValidation()
    const validations: Validation[] = []
    for (const field of ['name']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
