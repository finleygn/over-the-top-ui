import { useLayoutEffect, useRef } from "react";
import useStore from "../core/store";
import { animated, useSpring } from "@react-spring/web";
import { cursorFollow } from "../core/store/slices/cursor_slice";

function lerp(start: number, end: number, amt: number) {
  return (1 - amt) * start + amt * end
}

function Cursor() {
  const ref = useRef<SVGSVGElement>(null);
  const cursorState = useStore(s => s.cursor.state);

  const spring = useSpring({
    value: cursorState === 'highlighted' ? 1 : 0,
    colour: cursorState === 'highlighted' ? "#AAAAFF" : "#FFF",
    config: {
      duration: 100
    }
  });

  useLayoutEffect(() => {
    if (!ref.current) return;
    cursorFollow.setMount(ref.current);
  }, []);

  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width="40"
      viewBox="0 0 56.903 73.387"
    >
      <g transform="translate(-47.752 -116.554)">
        <animated.path
          fill={spring.colour}
          fillOpacity={spring.value.to(v => lerp(0.2, 1.0, v))}
          stroke="#ffffff"
          strokeDasharray="none"
          strokeLinecap="round"
          strokeOpacity="1"
          strokeWidth="6.765"
          d="M58.146 120.186c-6.275 2.79-9.972 58.062-3.34 64.128 8.44 7.721 13.064-8.82 20.477-11.157 8.24-2.596 23.298 7.697 25.755-2.89 2.457-10.586-36.618-52.87-42.892-50.08z"
        ></animated.path>
      </g>
    </svg>
  )
}

export default Cursor;