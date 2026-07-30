import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PlaceholderApp } from './app/PlaceholderApp'
import './styles/global.css'

const root = document.getElementById('root')

if (!root) {
  throw new Error('FrameCheck root element is missing')
}

createRoot(root).render(
  <StrictMode>
    <PlaceholderApp />
  </StrictMode>,
)
