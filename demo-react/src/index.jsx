import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// Import the Oh SHT button web component
// Make sure the web component is loaded and defined before React renders
try {
  // Import the oh-sht component
  // With Vite, we can use a more direct import path
  import('oh-sht/src/index.js')
    .catch(error => {
      console.error('Failed to import oh-sht:', error);
      // Fallback to relative path if needed
      import('../node_modules/oh-sht/src/index.js')
        .catch(fallbackError => {
          console.error('Failed to import oh-sht from fallback path:', fallbackError);
        });
    });
} catch (error) {
  console.error('Error importing oh-sht:', error);
}

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
