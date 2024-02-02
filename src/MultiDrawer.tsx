import { MouseEvent, ReactNode, useEffect, useState } from "react";
import { animated, config, to, useSpring } from '@react-spring/web';
import classNames from "classnames";
import useCursor from "./hooks/useCursor";

type Drawer = {
  id: string;
  icon: ReactNode;
  content: ReactNode,
}

type MultiDrawerProps = {
  selected?: string;
  setSelected: (id?: string) => void;
  drawers: Drawer[];
}

type DrawButtonProps = {
  children: ReactNode;
  selected: boolean;
  onClick: () => void;
}

const DrawButton = (props: DrawButtonProps) => {
  const { highlight } = useCursor();
  const [spring, api] = useSpring(() => ({
    x: 0,
    y: 0
  }));

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const { top, left, width, height } = event.currentTarget.getBoundingClientRect()
    api.start({
      x: 0.5 - (event.clientX - left) / width,
      y: 0.5 - (event.clientY - top) / height
    })
  }

  const handleMouseLeave = () => {
    api.start({
      x: 0,
      y: 0
    })
  }

  return (
    <button onClick={props.onClick} className={classNames('draw-button', { 'draw-button--selected': props.selected })} {...highlight}>
      <animated.div className="draw-button__plane" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{
        perspective: 100,
        transformStyle: 'preserve-3d',
        transform: to(
          [spring.x, spring.y],
          (x, y) => `translate(${x * 5}px, ${y * 5}px) rotateY(${(x) * -60}deg) rotateX(${(y) * 60}deg)`
        )
      }}>
        <div className="draw-button__inner">
          <animated.div className="draw-button__highlight" style={{
            transform: to(
              [spring.x, spring.y],
              (x, y) => `translate(${-x * 120}px, ${-y * 120}px)`
            )
          }}></animated.div>
          <span>
            {props.children}
          </span>

        </div>
      </animated.div>
      <animated.div className="draw-button__shadow" style={{
        transform: to(
          [spring.x, spring.y],
          (x, y) => `translate(${x * 40}px, ${y * 40}px)`
        )
      }}></animated.div>
    </button>
  )
}

const MultiDrawer = (props: MultiDrawerProps) => {
  const [open, setOpen] = useState(false);
  const drawSpring = useSpring({
    left: open ? 1 : 0,
    config: config.gentle
  });

  useEffect(() => {
    setOpen(!!props.selected);
  }, [props.selected]);

  return (
    <animated.div
      className='multi-drawer'
      style={{ transform: drawSpring.left.to(v => `translateX(calc((-100% + 160px) + (${v * 100}% - ${v} * 160px)))`) }}>
      <div className="multi-drawer__main">
        {props.drawers.find(drawer => drawer.id === props.selected)?.content}
      </div>
      <nav className="multi-drawer__buttons">
        {props.drawers.map(drawer => (
          <DrawButton
            key={drawer.id}
            selected={drawer.id === props.selected && open}
            onClick={() => {
              if(props.selected === drawer.id && open) {
                setOpen(false);
                return;
              }
              props.setSelected(drawer.id);
              setOpen(true)
            }}
          >
            {drawer.icon}
          </DrawButton>
        ))}
      </nav>

    </animated.div>
  )
}

export default MultiDrawer