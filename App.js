// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import EtudiantDashboard from './pages/EtudiantDashboard';
import ProfesseurDashboard from './pages/ProfesseurDashboard'; // ✅ السطر الوحيد للأستاذ
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminCourses from './pages/AdminCourses';
import AdminCategories from './pages/AdminCategories';
import AdminStatistics from './pages/AdminStatistics';
import AdminAnnouncements from './pages/AdminAnnouncements';
import AdminProfile from './pages/AdminProfile';
import AdminSettings from './pages/AdminSettings';

// استيراد صفحات الطالب
import EtudiantCourses from './pages/EtudiantCourses';
import EtudiantFavoris from './pages/EtudiantFavoris';
import EtudiantCalendrier from './pages/EtudiantCalendrier';
import EtudiantQuiz from './pages/EtudiantQuiz';
import EtudiantQuizDetails from './pages/EtudiantQuizDetails';
import EtudiantTP from './pages/EtudiantTP';
import EtudiantTPDetails from './pages/EtudiantTPDetails';
import EtudiantReunions from './pages/EtudiantReunions';
import EtudiantMessages from './pages/EtudiantMessages';
import EtudiantNotes from './pages/EtudiantNotes';
import EtudiantCertificats from './pages/EtudiantCertificats';
import EtudiantProfile from './pages/EtudiantProfile';
import EtudiantSettings from './pages/EtudiantSettings';
import ProfCourses from './pages/ProfCourses';
import ProfCourseDetails from './pages/ProfCourseDetails';
import ProfQuiz from './pages/ProfQuiz';
import ProfQuizDetails from './pages/ProfQuizDetails';
import ProfTP from './pages/ProfTP';
import ProfTPDetails from './pages/ProfTPDetails';
import ProfReunions from './pages/ProfReunions';
import ProfReunionsDetails from './pages/ProfReunionsDetails';
import ProfMessages from './pages/ProfMessages';

import ProfCorrections from './pages/ProfCorrections';
import ProfCalendrier from './pages/ProfCalendrier';
import ProfProfile from './pages/ProfProfile';
import ProfSettings from './pages/ProfSettings';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* صفحات عامة */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* صفحات الطالب */}
          <Route path="/dashboard/etudiant" element={<EtudiantDashboard />} />
          <Route path="/dashboard/etudiant/courses" element={<EtudiantCourses />} />
          <Route path="/dashboard/etudiant/courses/:id" element={<EtudiantCourses />} />
          <Route path="/dashboard/etudiant/favoris" element={<EtudiantFavoris />} />
          <Route path="/dashboard/etudiant/calendrier" element={<EtudiantCalendrier />} />
          <Route path="/dashboard/etudiant/quiz" element={<EtudiantQuiz />} />
          <Route path="/dashboard/etudiant/quiz/:id" element={<EtudiantQuizDetails />} />
          <Route path="/dashboard/etudiant/tp" element={<EtudiantTP />} />
          <Route path="/dashboard/etudiant/tp/:id" element={<EtudiantTPDetails />} />
          <Route path="/dashboard/etudiant/reunions" element={<EtudiantReunions />} />
          <Route path="/dashboard/etudiant/messages" element={<EtudiantMessages />} />
          <Route path="/dashboard/etudiant/notes" element={<EtudiantNotes />} />
          <Route path="/dashboard/etudiant/certificats" element={<EtudiantCertificats />} />
          <Route path="/dashboard/etudiant/profile" element={<EtudiantProfile />} />
          <Route path="/dashboard/etudiant/settings" element={<EtudiantSettings />} />

          {/* صفحات الأستاذ */}
          <Route path="/dashboard/professeur" element={<ProfesseurDashboard />} />
          <Route path="/dashboard/professeur/courses/:id" element={<ProfCourseDetails />} />
          <Route path="/dashboard/professeur/quiz" element={<ProfQuiz />} />
          <Route path="/dashboard/professeur/quiz/:id" element={<ProfQuizDetails />} />
          {/* يمكنك إضافة باقي مسارات الأستاذ هنا لاحقاً */}

          {/* صفحات المدير */}
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="/dashboard/admin/users" element={<AdminUsers />} />
          <Route path="/dashboard/admin/courses" element={<AdminCourses />} />
          <Route path="/dashboard/admin/categories" element={<AdminCategories />} />
          <Route path="/dashboard/admin/statistics" element={<AdminStatistics />} />
          <Route path="/dashboard/admin/announcements" element={<AdminAnnouncements />} />
          <Route path="/dashboard/admin/profile" element={<AdminProfile />} />
          <Route path="/dashboard/admin/settings" element={<AdminSettings />} />
          <Route path="/dashboard/professeur/courses" element={<ProfCourses />} />
          <Route path="/dashboard/professeur/tp" element={<ProfTP />} />
          <Route path="/dashboard/professeur/tp/:id" element={<ProfTPDetails />} />
          <Route path="/dashboard/professeur/reunions" element={<ProfReunions />} />
          <Route path="/dashboard/professeur/reunions/:id" element={<ProfReunionsDetails />} />
          <Route path="/dashboard/professeur/messages" element={<ProfMessages />} />
          <Route path="/dashboard/professeur/corrections" element={<ProfCorrections />} />
          <Route path="/dashboard/professeur/calendrier" element={<ProfCalendrier />} />
          <Route path="/dashboard/professeur/profile" element={<ProfProfile />} />
          <Route path="/dashboard/professeur/settings" element={<ProfSettings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;