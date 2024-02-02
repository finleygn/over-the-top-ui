import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Cursor from './components/Cursor.tsx'
import Ticker from './core/ticker.ts'
import useStore from './core/store/index.ts'

new Ticker(
  () => useStore.getState().progress.tick(),
  100
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <Cursor />
  </React.StrictMode>,
)
