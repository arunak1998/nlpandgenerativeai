import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles.css'

const root = document.getElementById('root')

// The built page ships pre-rendered HTML, so hydrate it. In dev the root is empty.
if (root.hasChildNodes()) hydrateRoot(root, <App />)
else createRoot(root).render(<App />)
