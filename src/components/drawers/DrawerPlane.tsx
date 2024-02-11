import { useSpring, animated } from "@react-spring/web";
import { DrawerProps } from "./MultiDrawer";
import { useEffect } from "react";
import './DrawerPlane.css';

const getY = (direction: DrawerProps['entranceDirection']) => {
  if(direction === 'top') return 500;
  if(direction === 'bottom') return -500;
  return 0;
}

const DrawerPlane = (props: DrawerProps) => {
  const [spring, api] = useSpring(() => ({
    from: { y: getY(props.entranceDirection), opacity: 0 },
    to: { y: 0, opacity: 1 },
  }), [props.entranceDirection]);
  
  useEffect(() => {
    if(props.open) {
      api.start({
        y: 0,
        delay: 0
      })
      api.start({
        opacity: 1,
        delay: 100
      })
    }
    else api.start({ y: getY(props.entranceDirection), opacity: 0, config: { duration: 300} });
  }, [props.entranceDirection, api, props.open])

  return (
    <animated.div style={spring} className="items-drawer">
      {props.children}
    </animated.div>
  )
}

export default DrawerPlane;