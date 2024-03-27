import './App.css';
import {Route, Routes} from 'react-router-dom';
import path from './utils/path';
import { Public, Login, Home, DetailCourse, ResetPassword } from './pages/public';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
      <>
        <Routes className="text-sm font-main min-h-screen">
            <Route path={path.PUBLIC} element={<Public />}>
              <Route path={path.HOME} element={<Home />} />
              <Route path={path.DETAIL_COURSE_CID} element={<DetailCourse />} />
              <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
            </Route>
            <Route path={path.LOGIN} element={<Login />} />
        </Routes>
        <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
        {/* Same as */}
        <ToastContainer />
      </>
  );
}

export default App;
