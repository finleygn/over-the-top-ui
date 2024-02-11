import { MouseEvent, ReactNode, useEffect } from "react";
import { animated, config, to, useSpring } from '@react-spring/web';
import classNames from "classnames";
import useCursor from "../../hooks/useCursor";
import DrawerPlane from "./DrawerPlane";

export type DrawerProps = {
  entranceDirection: "top" | "bottom" | "none";
  open: boolean;
  children: ReactNode;
}

type Drawer = {
  id: string;
  icon: ReactNode;
  content: ReactNode,
}

type MultiDrawerProps = {
  selected?: string;
  setSelected: (id?: string) => void;
  open: boolean;
  setOpen: (value: boolean) => void;
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
          }}/>
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
  const drawSpring = useSpring({
    left: props.open ? 1 : 0,
    config: config.gentle,
    onRest: () => {
      if(!props.open) props.setSelected(undefined)
    }
  });

  const setOpen = props.setOpen;
  const selected = props.selected;
  useEffect(() => {
    setOpen(!!selected);
  }, [setOpen, selected]);

  const selectedIndex = props.drawers.findIndex(d => d.id === props.selected);

  return (
    <animated.div
      className='multi-drawer'
      style={{ transform: drawSpring.left.to(v => `translateX(calc((-100% + 160px) + (${v * 100}% - ${v} * 160px)))`) }}>
      <div className="multi-drawer__main">
        {props.drawers.map((drawer, index) => (
          <DrawerPlane
            open={props.selected === drawer.id && props.open}
            entranceDirection={
              selectedIndex === index || !props.open
                ? "none"
                : selectedIndex < index
                  ? "top"
                  : "bottom"
            }
          >
            {drawer.content}
          </DrawerPlane>
        ))}
      </div>
      <nav className="multi-drawer__buttons">
        {props.drawers.map(drawer => (
          <DrawButton
            key={drawer.id}
            selected={drawer.id === props.selected && props.open}
            onClick={() => {
              if(props.selected === drawer.id && props.open) {
                props.setOpen(false);
                return;
              }
              props.setSelected(drawer.id);
              props.setOpen(true)
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