import useStore from "../core/store";

const useCursor = () => {
  const cursor = useStore(s => s.cursor);

  return {
    ...cursor,
    highlight: { onMouseEnter: () => cursor.hover(), onMouseLeave: () => cursor.unhover() }
  }
}

export default useCursor;