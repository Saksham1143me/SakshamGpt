import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/homePage/homePage"
import DashboardPage from "./pages/dashboardPage/dashboardPage"
import ChatPagee from "./pages/chatPage/chatPagee"
import RootLayout from "./layouts/rootLayout/rootLayout"
import DashboardLayout from "./layouts/dashboardLayout/dashboardLayout"
import SigninPage from "./pages/signInPage/signinPage"
import SignupPage from "./pages/signUpPage/signupPage"

const App = () => {
  return (
    <Routes>
      <Route element={<RootLayout/>}>
         <Route path="/" element={<HomePage/>}/>
         <Route path="/sign-in" element={<SigninPage/>}/>
         <Route path="/sign-up" element={<SignupPage/>}/>
         <Route element={<DashboardLayout/>}>
            <Route path="/dashboard" element={<DashboardPage/>}/>
            <Route path="/dashboard/chats/:id" element={<ChatPagee/>}/>
         </Route>
      </Route>
    </Routes>
  )
}

export default App