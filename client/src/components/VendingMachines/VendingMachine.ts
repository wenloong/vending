import { Soda } from './../Sodas/Soda'

export interface VendingMachine {
  _id?: string
  location: string
  money: number
  drinks: [{
    soda: Soda
    sodaLeft: number
  }]
}