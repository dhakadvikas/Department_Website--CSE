import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import { ClerkProvider } from '@clerk/clerk-react'

// import dotenv from "dotenv";


// Load environment variables from a .env file into `process.env`

// dotenv.config();



// Import your Publishable Key
// const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
// const PUBLISHABLE_KEY = process.env.VITE_CLERK_PUBLISHABLE_KEY


// if (!PUBLISHABLE_KEY) {
//   throw new Error('Add your Clerk Publishable Key to the .env file')
// }

createRoot(document.getElementById('root')).render(
  <StrictMode>
      {/* <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/" */}
      {/* restrictedUrl="/student"> */}
      <App />
    {/* </ClerkProvider> */}
  </StrictMode>,
)
