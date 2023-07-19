import { AddTransactionModel } from '../../../../domain/useCases/add-transaction'

export interface AddTransactionRepository {
  add: (transactionData: AddTransactionModel) => Promise<void>
}
