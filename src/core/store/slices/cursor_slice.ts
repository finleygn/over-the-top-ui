import { StateCreator } from "zustand";
import { CursorSlice, RootState } from "../types";

const cursor_slice: StateCreator<
  RootState,
  [],
  [],
  CursorSlice
> = (set) => ({
  state: 'default',
  hover: () => set(s => {
    new Audio("/click.wav").play();
    return { cursor: { ...s.cursor, state: 'highlighted' }}
  }),
  unhover: () => set(s => ({ cursor: { ...s.cursor, state: 'default' }}))
});

export default cursor_slice;