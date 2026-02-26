import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SmoothScroll from './SmoothScroll.jsx'

createRoot(document.getElementById('root')).render(
  <div className='scroll-smooth'>
    <SmoothScroll>
      <StrictMode>
        <App />
      </StrictMode>
    </SmoothScroll>
  </div>
)
