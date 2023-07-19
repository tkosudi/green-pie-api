export interface AddTransactionModel {
  type: 'debt' | 'credit'
  description: string
  categoryId: string
  amount: number
}

export interface AddTransaction {
  add: (transaction: AddTransactionModel) => Promise<void>
}
