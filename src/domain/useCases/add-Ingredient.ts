export interface AddIngredientModel {
  name: string
  unit?: string
  amount?: number
}

export interface AddIngredient {
  add: (account: AddIngredientModel) => Promise<void>
}
