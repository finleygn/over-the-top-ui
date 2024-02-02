import { Item, ItemsResource } from "../resources/items"

type OwnedQuantities = {
  [K in Item as K['key']]: number
}

export type ItemSlice = {
  owned: OwnedQuantities,
  available: ItemsResource
}

export type MoneySlice = {
  balance: number;
  credit(amount: number): void;
  debit(amount: number): void;
}

export type ProgressSlice = {
  distance: 0;
  tick(): void;
}

export type CursorSlice = {
  state: "highlighted" | "default";
  hover(): void;
  unhover(): void;
}

export type RootState = {
  item: ItemSlice;
  money: MoneySlice;
  progress: ProgressSlice;
  cursor: CursorSlice;
}