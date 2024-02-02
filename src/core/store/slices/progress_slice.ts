import { StateCreator } from "zustand";
import { ProgressSlice, RootState } from "../types";

const progress_slice: StateCreator<
  RootState,
  [],
  [],
  ProgressSlice
> = () => ({
  distance: 0,
  tick: () => {}
});

export default progress_slice;