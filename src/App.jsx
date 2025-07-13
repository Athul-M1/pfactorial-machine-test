import CalendarView from "./components/Calendar"
import { Route, Routes } from "react-router"
import LoginPage from "./auth/Login"
const App = () => {
  return (
    <div>
     
     <Routes>
      <Route path="/" element={<LoginPage/>}/>
      <Route path="/calendar" element={<CalendarView/>}/>
     </Routes>
    
    </div>
  )
}

export default App
