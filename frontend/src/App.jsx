import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useCheckAuth from './Hook/useCheckAuth';

function App() {
  useCheckAuth();
  return (
   <div>
     <ToastContainer autoClose={3000}/>
      <Outlet />
   </div>
  )
}

export default App
