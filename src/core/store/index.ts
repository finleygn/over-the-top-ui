import { create } from "zustand";
import { RootState } from "./types";
import item_slice from "./slices/item_slice";
import money_slice from "./slices/money_slice";
import progress_slice from "./slices/progress_slice";
import cursor_slice from "./slices/cursor_slice";

const useStore = create<RootState>((...a) => ({
  item: item_slice(...a),
  money: money_slice(...a),
  progress: progress_slice(...a),
  cursor: cursor_slice(...a)
}))

export default useStore;