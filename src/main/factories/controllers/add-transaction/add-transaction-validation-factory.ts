import { RequiredFieldValidation, ValidationComposite } from '../../../../validation/validators'
import { Validation } from '../../../../presentation/protocols/validation'

export const makeAddTransactionValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['type', 'description', 'categoryId', 'amount']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
