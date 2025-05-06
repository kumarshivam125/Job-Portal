
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'

import Signup from './components/Signup'
import Login from './components/Login'
import Companies from './components/admin/Companies'
import { Error } from './components/Error'
import Home from './components/Home'
import CreateCompany from './components/admin/CreateCompany'
import UpdateCompany from './components/admin/UpdateCompany'
import AdminJob from './components/admin/AdminJob'
import CreateAdminJobs from './components/admin/CreateAdminJobs'
import { ViewApplicants } from './components/admin/ViewApplicants'
import { Jobs } from './components/Jobs'
import { JobDescription } from './components/JobDescription'
import Profile from './components/Profile'
import Browse from './components/Browse'
import StudentPrivateRoute from './components/StudentPrivateRoute'
import OpenRoute from './components/OpenRoute'
import RecuritorPrivateRoute from './components/RecuritorPrivateRoute'

function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<StudentPrivateRoute><Home/></StudentPrivateRoute> }/>
        <Route path='/signup' element={<OpenRoute><Signup/></OpenRoute> }/>
        <Route path='/login' element={<OpenRoute><Login/></OpenRoute> }/>
        <Route path='/profile' element={<StudentPrivateRoute><Profile/></StudentPrivateRoute> }/>
        <Route path='/jobs' element={<StudentPrivateRoute><Jobs/></StudentPrivateRoute>}/>
        <Route path='/browse' element={<StudentPrivateRoute><Browse/></StudentPrivateRoute> }/>
        <Route path='/description/:id' element={<StudentPrivateRoute><JobDescription/></StudentPrivateRoute> }/>
        
        <Route path='/admin/companies' element={<RecuritorPrivateRoute><Companies/></RecuritorPrivateRoute> }/>
        <Route path='/admin/companies/create' element={<RecuritorPrivateRoute><CreateCompany/></RecuritorPrivateRoute> }/>
        <Route path='/admin/companies/:id' element={<RecuritorPrivateRoute><UpdateCompany/></RecuritorPrivateRoute> }/>
        

        <Route path='/admin/jobs' element={<RecuritorPrivateRoute><AdminJob/></RecuritorPrivateRoute> }/>
        <Route path='/admin/jobs/create' element={<RecuritorPrivateRoute><CreateAdminJobs/></RecuritorPrivateRoute> }/>
        <Route path='/admin/jobs/:id/applicants' element={<RecuritorPrivateRoute><ViewApplicants/></RecuritorPrivateRoute> }/>
        <Route path='*' element={<Error/>}/>

      </Routes>
    </div>
  )
}

export default App
