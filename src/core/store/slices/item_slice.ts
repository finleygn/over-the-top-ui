import { StateCreator } from "zustand";
import items from "../../resources/items";
import { ItemSlice, RootState } from "../types";

const item_slice: StateCreator<
  RootState,
  [],
  [],
  ItemSlice
> = () => ({
  owned: Object.keys(items).reduce(
    (acc, item) => ({...acc, [item]: 0 }),
    {} as ItemSlice['owned']
  ),
  available: items
});

export default item_slice;