// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // This imports Tailwind styles
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <App />
);
