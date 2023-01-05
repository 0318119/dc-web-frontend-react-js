
import React from 'react'
import { HashRouter, Routes, Route} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import './assets/css/style.css'
import Register from './components/user-register';
import Login from './components/Login';
import ResetPassword from './components/reset-password';
import ForgotPassword from './components/ForgotPassword';
import VerifyUser from './components/VerifyUser';
import Dashboard from './pages/Dashboard';
import PageNotFound from './pages/PageNotFound';
import AddCheck from './components/AddCheck';
import Listing from './components/Listing';
import SubjectDetails from './components/SubjectDetails';

function App() {
  return (
    <>
    <HashRouter>
        <Routes>
          <Route  path="*"  element={<PageNotFound />} />
          <Route  path="/"  element={<Login />} />
          <Route  path="Register" element={<Register />}/>
          <Route  path="ForgotPassword"  element={<ForgotPassword />}/>
          <Route  path='VerifyUser'   element={<VerifyUser />}/>
          <Route  path="Dashboard"   element={<Dashboard />}/>
          <Route  path="/reset-password/:resetPasswordId"  element={<ResetPassword />} />
          <Route  path='/AddCheck/:checksid'   element={<AddCheck />}></Route>
          <Route  path='Listing/:checks' element={<Listing/>}></Route>
          <Route  path='SujectDetails/:params' element={<SubjectDetails/>}></Route>
      </Routes>
    </HashRouter>
    </>
  );
}

export default App;
