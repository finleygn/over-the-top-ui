import MultiDrawer from './MultiDrawer';
import { useState } from 'react';
import rsvg from './assets/react.svg';

function App() {
  const [selected, setSelected] = useState<string | undefined>();

  return (
    <div className="multi-drawer-container">
      <MultiDrawer
        selected={selected}
        setSelected={setSelected}
        drawers={[
          {
            id: "merchant",
            icon: <img src={rsvg} />,
            content: <h1>Test</h1>
          },
          {
            id: "friends",
            icon: <img src={rsvg} />,
            content: <h1>Test</h1>
          },
          {
            id: "stats",
            icon: <img src={rsvg} />,
            content: <h1>Test</h1>
          },
          {
            id: "bosses",
            icon: <img src={rsvg} />,
            content: <h1>Test</h1>
          }
        ]}
      />
    </div>
  )
}

export default App
