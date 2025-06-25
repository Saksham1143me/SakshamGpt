import { SignUp } from '@clerk/clerk-react'
import './signupPage.css'
function SignupPage () {
  return (
    <div className='signupPage'>
      <SignUp path='/sign-up' signInUrl='/sign-in'/>
    </div>
  )
}
export default SignupPage