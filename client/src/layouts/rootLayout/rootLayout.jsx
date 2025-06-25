import { Link, Outlet } from 'react-router-dom'
import './rootLayout.css'
import { ClerkProvider, SignedIn, UserButton } from '@clerk/clerk-react'
import {QueryClient,QueryClientProvider,} from '@tanstack/react-query'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
console.log(PUBLISHABLE_KEY)

if (!PUBLISHABLE_KEY) {
throw new Error("Missing Publishable Key")
}
const queryClient=new QueryClient()
function RootLayout () {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <QueryClientProvider client={queryClient}>
    <div className='rootLayout py-16 px-4'>
       <header>
          <Link to="/" className='logo'>
            <img src='/logo.png' alt='logo'/>
            <span>Saksham Gpt</span>
          </Link>
          <div className="user">
            <SignedIn>
               <UserButton />
           </SignedIn>
           </div>
       </header>
       <main>
        <Outlet/>
       </main>
    </div>
    </QueryClientProvider>
    </ClerkProvider>
  )
}
export default RootLayout