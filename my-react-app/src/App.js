import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// HOME FILES
import IntroPage from './pages/IntroPage/IntroPage';
import Animhome from "./pages/Animhome/Animhome";
import Signupform from './components/signup/signupform';
import Loginform from './components/signup/loginform';
import StudyDestinations from './pages/StudyDestinations/StudyDestinations';
import VisaGuide from './pages/VisaGuide/VisaGuide';
import Scholarship from "./pages/Scholarship/Scholarship";
import ContactUs from './pages/ContactUs/ContactUs';



// USER DASHBOARD FILES
import DocumentChecklist from "./pages/DocumentChecklist/DocumentChecklist";
import Dashboard from './pages/Dashboard/Dashboard';
import EditProfile from './pages/Profile/EditProfile';
import UserStudyDest from './pages/UserStudyDest/UserStudyDest';
import UserScholarship from './pages/UserScholarship/UserScholarship';
import UserVisaGuide from './pages/UserVisaGuide/UserVisaGuide';
import Notifications from './pages/Notifications/Notifications';
import Forum from './pages/Forum/Forum';
import StudyPlan from './pages/StudyPlan/StudyPlan';
import Feedback from './pages/Feedback/Feedback';
import Chatbot from './components/Chatbot/Chatbot';

// ADMIN FILES
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import ManageStudents from './pages/ManageStudents/MnagaeStudents';
import ManageUniversities from './pages/ManageUniversities/ManageUniversities';
import ManageScholarships from './pages/ManageScholarships/ManageScholarships';
import ManageVisa from './pages/ManageVisa/ManageVisa';
import ManageNotifications from './pages/ManageNotifications/ManageNotifications';
import AdminSettings from './pages/AdminSettings/AdminSettings';
import AdminFeedback from './pages/AdminFeedback/AdminFeedback';
import AdminReports from './pages/AdminReports/AdminReports';
import AdminLogin from "./pages/AdminLogin/AdminLogin";

// PROTECTED ROUTES
import {
  ProtectedRoute,
  AdminProtectedRoute
} from './components/ProtectedRoute';

function App() {

  return (

    <Router>

      <Routes>

        {/* ================= HOME ROUTES ================= */}

        <Route path="/" element={<IntroPage />} />

        <Route path="/home" element={<Animhome />} />

        <Route path="/signup" element={<Signupform />} />

        <Route path="/login" element={<Loginform />} />

        <Route path="/VisaGuide" element={<VisaGuide />} />

        <Route
          path="/StudyDestinations"
          element={<StudyDestinations />}
        />

        <Route
          path="/Scholarship"
          element={<Scholarship />}
        />

        <Route
          path="/ContactUs"
          element={<ContactUs />}
        />



        {/* ================= USER PROTECTED ROUTES ================= */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/DocumentChecklist"
          element={
            <ProtectedRoute>
              <DocumentChecklist />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile/edit"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/find-uni"
          element={
            <ProtectedRoute>
              <UserStudyDest />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/UserScholarship"
          element={
            <ProtectedRoute>
              <UserScholarship />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/UserVisaGuide"
          element={
            <ProtectedRoute>
              <UserVisaGuide />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/forum"
          element={
            <ProtectedRoute>
              <Forum />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/studyplan"
          element={
            <ProtectedRoute>
              <StudyPlan />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/feedback"
          element={
            <ProtectedRoute>
              <Feedback />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/contact"
          element={
            <ProtectedRoute>
              <ContactUs />
            </ProtectedRoute>
          }
        />



        {/* ================= ADMIN ROUTES ================= */}

        {/* ADMIN LOGIN */}
      <Route
  path="/admin/login"
  element={<AdminLogin />}
/>

        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />

        {/* MANAGE STUDENTS */}
        <Route
          path="/admin/students"
          element={
            <AdminProtectedRoute>
              <ManageStudents />
            </AdminProtectedRoute>
          }
        />

        {/* MANAGE UNIVERSITIES */}
        <Route
          path="/admin/universities"
          element={
            <AdminProtectedRoute>
              <ManageUniversities />
            </AdminProtectedRoute>
          }
        />

        {/* MANAGE SCHOLARSHIPS */}
        <Route
          path="/admin/scholarships"
          element={
            <AdminProtectedRoute>
              <ManageScholarships />
            </AdminProtectedRoute>
          }
        />

        {/* MANAGE VISA */}
        <Route
          path="/admin/visa"
          element={
            <AdminProtectedRoute>
              <ManageVisa />
            </AdminProtectedRoute>
          }
        />

        {/* MANAGE NOTIFICATIONS */}
        <Route
          path="/admin/notifications"
          element={
            <AdminProtectedRoute>
              <ManageNotifications />
            </AdminProtectedRoute>
          }
        />

        {/* ADMIN SETTINGS */}
        <Route
          path="/admin/settings"
          element={
            <AdminProtectedRoute>
              <AdminSettings />
            </AdminProtectedRoute>
          }
        />

        {/* ADMIN FEEDBACK */}
        <Route
          path="/admin/feedback"
          element={
            <AdminProtectedRoute>
              <AdminFeedback />
            </AdminProtectedRoute>
          }
        />


          {/* ADMIN ROOT REDIRECT */}
          <Route
          path="/admin"
          element={<Navigate to="/admin-login" replace />}
          />

        {/* ADMIN REPORTS */}
        <Route
          path="/admin/reports"
          element={
            <AdminProtectedRoute>
              <AdminReports />
            </AdminProtectedRoute>
          }
        />

      </Routes>
             
      <Chatbot />

    </Router>

  );

}

export default App;