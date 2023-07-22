import { RequiredFieldValidation, ValidationComposite } from '../../../../../validation/validators'
import { Validation } from '../../../../../presentation/protocols/validation'
import { makeAddTransactionValidation } from './add-transaction-validation-factory'

jest.mock('../../../../../validation/validators/validation-composite.ts')

describe('AddTransactionValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddTransactionValidation()
    const validations: Validation[] = []
    for (const field of ['type', 'description', 'categoryId', 'amount']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
