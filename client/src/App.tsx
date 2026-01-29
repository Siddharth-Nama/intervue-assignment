import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { Layout } from './components/Layout';
import { Landing } from './pages/Landing';
import { Toaster } from 'react-hot-toast';

// Placeholders for routes
const TeacherDashboard = () => <div>Teacher Dashboard</div>;
const StudentOnboarding = () => <div>Student Onboarding</div>;
const StudentDashboard = () => <div>Student Poll View</div>;

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Layout>
           <Routes>
             <Route path="/" element={<Landing />} />
             <Route path="/teacher" element={<TeacherDashboard />} />
             <Route path="/student/onboarding" element={<StudentOnboarding />} />
             <Route path="/student/poll" element={<StudentDashboard />} />
             <Route path="*" element={<Navigate to="/" replace />} />
           </Routes>
        </Layout>
        <Toaster position="top-right" />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
