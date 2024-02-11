import { useState } from 'react';
import rsvg from './assets/react.svg';
import MultiDrawer from './components/drawers/MultiDrawer';
import DrawerPlaneItems from './components/drawers/DrawerPlaneItems';
import DrawerPlaneBosses from './components/drawers/DrawerPlaneBosses';
import SceneWrapper from './components/scene/Scene';
import RowButton from './components/RowButton';
import { useSpring, animated } from '@react-spring/web';
import { lerp } from './utils/math';

function OverlayContent({ open }: { open: boolean }) {
  const spring = useSpring({ x: open ? 1 : 0 });

  return (
    <animated.div className="overlay-content" style={{ width: spring.x.to(v => `${lerp(100, 60, v)}%`) }}>
      <RowButton />
    </animated.div>
  )
}

function App() {
  const [selected, setSelected] = useState<string | undefined>();
  const [open, setOpen] = useState(false);

  return (
    <>
    <div className="multi-drawer-container">
      <MultiDrawer
        open={open}
        setOpen={setOpen}
        selected={selected}
        setSelected={setSelected}
        drawers={[
          {
            id: "merchant",
            icon: <img src={rsvg} />,
            content: <DrawerPlaneItems />
          },
          {
            id: "friends",
            icon: <img src={rsvg} />,
            content: <DrawerPlaneItems />
          },
          {
            id: "stats",
            icon: <img src={rsvg} />,
            content: <DrawerPlaneItems />
          },
          {
            id: "bosses",
            icon: <img src={rsvg} />,
            content: <DrawerPlaneBosses />
          }
        ]}
      />
    </div>
    <OverlayContent open={open} />
    <SceneWrapper open={open} />
    </>
  )
}

export default App
