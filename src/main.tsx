import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import './i18n';
import {BrowserRouter} from "react-router-dom";
import {PageHeader} from "./components/layout/PageHeader.tsx";
import {TabNavigation} from "./components/layout/TabNavigation.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <PageHeader />
          <App />
          <TabNavigation />
      </BrowserRouter>

  </StrictMode>,
)
