import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { DataProvider } from './components/pages/context/DataProvider.jsx'
import App from './App.js'
import './i18n.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter
    future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    }}
  >
    <DataProvider>
      <App />
    </DataProvider>
  </BrowserRouter>
)
