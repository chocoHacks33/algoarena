
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Force dark mode
document.documentElement.classList.add('dark');

// Add animation classes to body for global transition effects
document.body.classList.add('transition-colors', 'duration-300');

createRoot(document.getElementById("root")!).render(<App />);
