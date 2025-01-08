import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
// import 'dotenv/config'
import App from '@pages/App'
// require('dotenv').config()
const container = document.getElementById('app')!

const root = createRoot(container)
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
