import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './interfaces/views/App';
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <AlertProvider template={AlertTemplate}>
      <App />
    </AlertProvider>
  </React.StrictMode>
);
