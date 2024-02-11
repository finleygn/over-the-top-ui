import { MouseEvent, useRef } from 'react';
import useCursor from '../hooks/useCursor';
import './RowButton.css';
import { useSpring, animated, to } from '@react-spring/web';
import { cursorFollow } from '../core/store/slices/cursor_slice';

function useMousePosition<T extends HTMLElement>({
  onChange
}: { onChange(v: { x: number, y: number }): void }) {
  const element = useRef<T>(null);

  return {
    ref: element,
    move: (e: MouseEvent) => {
      if(!element.current) return null;

      // TODO: CACHE SIZE
      const { left, top, width, height } = element.current.getBoundingClientRect();
      onChange({
        x: (0.5 - (e.clientX - left) / width) * 2,
        y: (0.5 - (e.clientY - top) / height) * 2,
      })
    },
    reset: () => {
      onChange({
        x: 0,
        y: 0
      })
    }
  }
}

const RowButton = () => {
  const { highlight } =  useCursor();

  const [spring, api] = useSpring(() => ({ x: 0, y: 0}))

  const { move, reset, ref } = useMousePosition<HTMLButtonElement>({
    onChange: ({x,y}) => {
      api.start({ x, y });
      cursorFollow.setRotationOffset(x * 20 + 16)
    }
  });

  return (
    <div className='row-button-container'>
      <animated.button
        ref={ref}
        className="row-button"
        {...highlight}
        onMouseMove={move}
        onMouseLeave={() => {
          reset();
          highlight.onMouseLeave();
        }}
        style={{
          transform: to(
          [spring.x, spring.y],
          (x, y) => `perspective(100vw)  rotateY(${(x) * -5}deg) rotateX(${(y) * 15}deg)`
        ) }}
      >
        <div className="row-button-inner">
        row
        </div>
      </animated.button>
    </div>
  )
}

export default RowButton;