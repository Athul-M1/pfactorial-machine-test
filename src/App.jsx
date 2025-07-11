import Calendar from "./components/Calendar"

import { Route, Router, Routes } from "react-router"
import LoginPage from "./auth/Login"
const App = () => {
  return (
    <div>
     
     <Routes>
      <Route path="/" element={<LoginPage/>}/>
      <Route path="/dashboard" element={<Calendar/>}/>
     </Routes>
    
    </div>
  )
}

export default App
