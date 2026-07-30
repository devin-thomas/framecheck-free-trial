import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { FrameCheckApp } from './app/FrameCheckApp'
import './styles/global.css'
import './styles/framecheck.css'

const root = document.getElementById('root')

if (!root) {
  throw new Error('FrameCheck root element is missing')
}

createRoot(root).render(
  <StrictMode>
    <FrameCheckApp />
  </StrictMode>,
)
