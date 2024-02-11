import { StateCreator } from "zustand";
import { CursorSlice, RootState } from "../types";
import CursorFollow from "../../cursor";

const cursorFollow = new CursorFollow({
  offsetX: -6,
});

const cursor_slice: StateCreator<
  RootState,
  [],
  [],
  CursorSlice
> = (set) => ({
  state: 'default',
  hover: () => set(s => {
    new Audio("/click.wav").play();
    cursorFollow.hover();
    return { cursor: { ...s.cursor, state: 'highlighted' } }
  }),
  unhover: () => {
    cursorFollow.unhover();
    set(s => ({ cursor: { ...s.cursor, state: 'default' } }))
  }
});

export { cursorFollow };
export default cursor_slice;