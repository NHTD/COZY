import './App.css';
import {Route, Routes} from 'react-router-dom';
import path from './utils/path';
import { Public, Login, Home, DetailCourse, ResetPassword } from './pages/public';
import {AdminLayout, Dashboard, ManageCourses, ManageRooms, ManageSchedules, ManageUsers, CreateCourses, CreateRooms, CreateSchedules, CoursesInformation, CreateAssignment, AssignmentInformation} from './pages/admin'
import {MemberLayout, Personal, MyAssignment, MyCourse, MySchedule, MyRooms} from './pages/member'
import {TeacherLayout} from './pages/teacher'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import MySubmit from './pages/member/MySubmit';

function App() {
  return (
      <>
        <Routes className="text-sm font-main min-h-screen w-screen">
            <Route path={path.PUBLIC} element={<Public />}>
              <Route path={path.HOME} element={<Home />} />
              <Route path={path.DETAIL_COURSE_CID} element={<DetailCourse />} />
              <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
            </Route>
            <Route path={path.ADMIN} element={<AdminLayout/>}>
                  <Route path={path.DASHBOARD} element={<Dashboard/>}/>
                  <Route path={path.MANAGE_COURSES} element={<ManageCourses/>}/>
                  <Route path={path.MANAGE_ROOMS} element={<ManageRooms/>}/>
                  <Route path={path.MANAGE_SCHEDULES} element={<ManageSchedules/>}/>
                  <Route path={path.MANAGE_USERS} element={<ManageUsers/>}/>
                  <Route path={path.CREATE_COURSES} element={<CreateCourses/>}/>
                  <Route path={path.ROOMS_INFORMATION} element={<CoursesInformation/>}/>
                  <Route path={path.CREATE_ROOMS} element={<CreateRooms/>}/>  
                  <Route path={path.CREATE_SCHEDULES} element={<CreateSchedules/>}/>
                  <Route path={path.CREATE_ASSIGNMENT} element={<CreateAssignment/>}/>
                  <Route path={path.ASSIGNMENT_INFORMATION} element={<AssignmentInformation/>}/>
            </Route>
            <Route path={path.TEACHER} element={<TeacherLayout/>}>
               {/*Teacher pages*/}
               <Route path={path.PERSONAL} element={<Personal/>}/>
               <Route path={path.CREATE_ASSIGNMENT} element={<CreateAssignment/>}/>
            </Route>
            <Route path={path.MEMBER} element={<MemberLayout/>}>
              <Route path={path.PERSONAL} element={<Personal/>}/>
              <Route path={path.MY_ASSIGNMENT} element={<MyAssignment/>}/>
              <Route path={path.MY_COURSE} element={<MyCourse/>}/>
              <Route path={path.MY_SCHEDULE} element={<MySchedule/>}/>
              <Route path={path.MY_ROOMS} element={<MyRooms/>}/>
              <Route path={path.MY_SUBMIT} element={<MySubmit/>}/>
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
