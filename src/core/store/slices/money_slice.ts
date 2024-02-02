import { StateCreator } from "zustand";
import { MoneySlice, RootState } from "../types";

const money_slice: StateCreator<
  RootState,
  [],
  [],
  MoneySlice
> = (set) => ({
  balance: 0,
  credit: (amount: number) => set(s => ({
    money: {
      ...s.money,
      balance: s.money.balance+=amount
    }
  })),
  debit: (amount: number) => set(s => ({
    money: {
      ...s.money,
      balance: s.money.balance-=amount
    }
  }))
});

export default money_slice;