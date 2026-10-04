import React, { useState } from 'react';
import { Role } from './types';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { Footer } from './components/common/Footer';
import { ToastContainer, ToastMessage } from './components/common/Toast';

// Public pages
import { HomePage } from './pages/public/HomePage';
import { AboutPage } from './pages/public/AboutPage';
import { CourseListingPage } from './pages/public/CourseListingPage';
import { CourseDetailPage } from './pages/public/CourseDetailPage';
import { CourseCategoriesPage } from './pages/public/CourseCategoriesPage';
import { FacultyPage } from './pages/public/FacultyPage';
import { LoginPage } from './pages/public/LoginPage';
import { RegisterPage } from './pages/public/RegisterPage';
import { ContactPage } from './pages/public/ContactPage';

// Student portal pages
import { StudentDashboardPage } from './pages/student/StudentDashboardPage';
import { StudentProfilePage } from './pages/student/StudentProfilePage';
import { StudentCoursesPage } from './pages/student/StudentCoursesPage';
import { StudentAttendancePage } from './pages/student/StudentAttendancePage';
import { StudentAssignmentsPage } from './pages/student/StudentAssignmentsPage';
import { StudentAssessmentsPage } from './pages/student/StudentAssessmentsPage';
import { StudentPerformancePage } from './pages/student/StudentPerformancePage';
import { StudentPredictionPage } from './pages/student/StudentPredictionPage';
import { StudentNotificationsPage } from './pages/student/StudentNotificationsPage';

// Admin portal pages
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { StudentManagementPage } from './pages/admin/StudentManagementPage';
import { FacultyManagementPage } from './pages/admin/FacultyManagementPage';
import { CourseManagementPage } from './pages/admin/CourseManagementPage';
import { CategoryManagementPage } from './pages/admin/CategoryManagementPage';
import { EnrolmentManagementPage } from './pages/admin/EnrolmentManagementPage';
import { AttendanceManagementPage } from './pages/admin/AttendanceManagementPage';
import { AssignmentManagementPage } from './pages/admin/AssignmentManagementPage';
import { AssessmentManagementPage } from './pages/admin/AssessmentManagementPage';
import { PerformanceMonitoringPage } from './pages/admin/PerformanceMonitoringPage';
import { MLPredictionDashboardPage } from './pages/admin/MLPredictionDashboardPage';
import { ReportsAnalyticsPage } from './pages/admin/ReportsAnalyticsPage';
import { AdminNotificationsPage } from './pages/admin/AdminNotificationsPage';
import { SystemSettingsPage } from './pages/admin/SystemSettingsPage';

export function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [activeRole, setActiveRole] = useState<Role>('student');
  const [selectedCourseId, setSelectedCourseId] = useState<string>('course-py-dj');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (type: 'success' | 'error' | 'info', title: string, message?: string) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleNavigate = (view: string, courseId?: string) => {
    if (courseId) setSelectedCourseId(courseId);
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = (role: Role) => {
    setActiveRole(role);
    if (role === 'student') {
      setCurrentView('student-dashboard');
    } else {
      setCurrentView('admin-dashboard');
    }
  };

  const handleRoleChange = (role: Role) => {
    setActiveRole(role);
  };

  const isPublicView = [
    'home',
    'about',
    'courses',
    'course-detail',
    'categories',
    'faculty',
    'contact',
    'login',
    'register',
  ].includes(currentView);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Universal Top Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        activeRole={activeRole}
        onRoleChange={handleRoleChange}
        unreadCount={activeRole === 'student' ? 2 : 2}
      />

      {/* Main Viewport Container */}
      <div className="flex-1 flex w-full">
        {/* Role-Specific Sidebar when within Student or Admin Portals */}
        {!isPublicView && (
          <Sidebar
            currentView={currentView}
            onNavigate={handleNavigate}
            role={activeRole}
          />
        )}

        {/* Dynamic Page Router */}
        <main className={`flex-1 ${!isPublicView ? 'p-4 sm:p-6 lg:p-8' : ''}`}>
          {/* Public Views */}
          {currentView === 'home' && (
            <HomePage
              onNavigate={handleNavigate}
              onSelectCourse={setSelectedCourseId}
            />
          )}
          {currentView === 'about' && <AboutPage onNavigate={handleNavigate} />}
          {currentView === 'courses' && (
            <CourseListingPage
              onNavigate={handleNavigate}
              onSelectCourse={setSelectedCourseId}
              onShowToast={showToast}
            />
          )}
          {currentView === 'course-detail' && (
            <CourseDetailPage
              courseId={selectedCourseId}
              onNavigate={handleNavigate}
              onShowToast={showToast}
            />
          )}
          {currentView === 'categories' && (
            <CourseCategoriesPage
              onNavigate={handleNavigate}
              onSelectCourse={setSelectedCourseId}
            />
          )}
          {currentView === 'faculty' && (
            <FacultyPage onNavigate={handleNavigate} onShowToast={showToast} />
          )}
          {currentView === 'contact' && <ContactPage onShowToast={showToast} />}
          {currentView === 'login' && (
            <LoginPage
              onLoginSuccess={handleLoginSuccess}
              onNavigate={handleNavigate}
              onShowToast={showToast}
            />
          )}
          {currentView === 'register' && (
            <RegisterPage
              onRegisterSuccess={handleLoginSuccess}
              onNavigate={handleNavigate}
              onShowToast={showToast}
            />
          )}

          {/* Student Portal Views (Rahul Sen Flow) */}
          {currentView === 'student-dashboard' && (
            <StudentDashboardPage onNavigate={handleNavigate} />
          )}
          {currentView === 'student-profile' && (
            <StudentProfilePage onShowToast={showToast} />
          )}
          {currentView === 'student-courses' && (
            <StudentCoursesPage
              onNavigate={handleNavigate}
              onShowToast={showToast}
            />
          )}
          {currentView === 'student-attendance' && (
            <StudentAttendancePage onShowToast={showToast} />
          )}
          {currentView === 'student-assignments' && (
            <StudentAssignmentsPage onShowToast={showToast} />
          )}
          {currentView === 'student-assessments' && (
            <StudentAssessmentsPage onShowToast={showToast} />
          )}
          {currentView === 'student-performance' && (
            <StudentPerformancePage onNavigate={handleNavigate} />
          )}
          {currentView === 'student-prediction' && (
            <StudentPredictionPage onShowToast={showToast} />
          )}
          {currentView === 'student-notifications' && (
            <StudentNotificationsPage onShowToast={showToast} />
          )}

          {/* Admin / Faculty Portal Views */}
          {currentView === 'admin-dashboard' && (
            <AdminDashboardPage
              onNavigate={handleNavigate}
              onShowToast={showToast}
            />
          )}
          {currentView === 'admin-students' && (
            <StudentManagementPage onShowToast={showToast} />
          )}
          {currentView === 'admin-faculty' && (
            <FacultyManagementPage onShowToast={showToast} />
          )}
          {currentView === 'admin-courses' && (
            <CourseManagementPage onShowToast={showToast} />
          )}
          {currentView === 'admin-categories' && (
            <CategoryManagementPage onShowToast={showToast} />
          )}
          {currentView === 'admin-enrolments' && (
            <EnrolmentManagementPage onShowToast={showToast} />
          )}
          {currentView === 'admin-attendance' && (
            <AttendanceManagementPage onShowToast={showToast} />
          )}
          {currentView === 'admin-assignments' && (
            <AssignmentManagementPage onShowToast={showToast} />
          )}
          {currentView === 'admin-assessments' && (
            <AssessmentManagementPage onShowToast={showToast} />
          )}
          {currentView === 'admin-performance' && (
            <PerformanceMonitoringPage onShowToast={showToast} />
          )}
          {currentView === 'admin-predictions' && (
            <MLPredictionDashboardPage onShowToast={showToast} />
          )}
          {currentView === 'admin-reports' && (
            <ReportsAnalyticsPage onShowToast={showToast} />
          )}
          {currentView === 'admin-notifications' && (
            <AdminNotificationsPage onShowToast={showToast} />
          )}
          {currentView === 'admin-settings' && (
            <SystemSettingsPage onShowToast={showToast} />
          )}
        </main>
      </div>

      {/* Public Footer on public screens, compact footer on portal screens */}
      {isPublicView ? (
        <Footer onNavigate={handleNavigate} />
      ) : (
        <footer className="bg-white border-t border-slate-200/80 px-6 py-3 text-center text-xs text-slate-400">
          EDU-PREDICT © 2026 — AI-Enabled Student Academic Management Prototype • Linear Regression Prediction Simulation (R² = 0.912)
        </footer>
      )}

      {/* Global Interactive Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

