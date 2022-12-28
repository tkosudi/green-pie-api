export interface AddIngredientModel {
  name: string
  unit: string
  amount: string
}

export interface AddIngredient {
  add: (account: AddIngredientModel) => Promise<void>
}
