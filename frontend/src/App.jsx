import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminSignup from './pages/AdminSignup';
import StudentSignup from './pages/StudentSignup';
import StudentLogin from './pages/StudentLogin';
import AdminLogin from './pages/AdminLogin';
import QuestionSetting from './pages/QuestionSetting';
import TeacherDashboard from './pages/TeacherDashboard';
import QuestionsSolving from './pages/QuestionsSolving';
function App() {

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/studentsignup' element={<StudentSignup />} />
      <Route path='/adminsignup' element={<AdminSignup />} />
      <Route path='/studentlogin' element={<StudentLogin />} />
      <Route path='/adminlogin' element={<AdminLogin />} />
      <Route path='/QuestionSetting' element={<QuestionSetting />} />
      <Route path='/teacherdashboard' element={<TeacherDashboard />} />
      <Route path='/questionsolving' element={<QuestionsSolving />} />
    </Routes>
  )
}

export default App
