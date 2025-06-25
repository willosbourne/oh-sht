import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// Import the Oh SHT button web component directly from the project
// This static import ensures the component is loaded and registered before React renders
import '@components/index.js';

// Ensure the custom element is defined before rendering
// This is important for web components to work properly with React
if (!customElements.get('oh-sht-button')) {
  console.warn('oh-sht-button custom element not defined. Check the import.');
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
