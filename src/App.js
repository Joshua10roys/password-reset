import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/login.js';
import Register from './Pages/register.js';
import Reset from './Pages/reset.js';
import ForgotPass from './Pages/forgotPass.js';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate replace to='/login' />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgotPassword' element={<ForgotPass />} />
        <Route path='/resetPassword/:string' element={<Reset />} />
        <Route path="*" element={<Navigate replace to="/login" />} />
      </Routes>
    </>
  );
}

export default App;
