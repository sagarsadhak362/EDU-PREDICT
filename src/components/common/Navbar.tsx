import React, { useState } from 'react';
import { 
  GraduationCap, 
  Menu, 
  X, 
  User, 
  ShieldCheck, 
  Sparkles, 
  LogOut, 
  BookOpen, 
  Users, 
  Bell, 
  ChevronDown,
  Layers,
  PhoneCall,
  LayoutDashboard
} from 'lucide-react';
import { Role } from '../../types';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  activeRole: Role;
  onRoleChange: (role: Role) => void;
  unreadCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  activeRole,
  onRoleChange,
  unreadCount = 2,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const isPublic = currentView.startsWith('public-') || ['home', 'about', 'courses', 'course-detail', 'categories', 'faculty', 'contact', 'login', 'register'].includes(currentView);

  const handleNav = (view: string) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      {/* Top Demo Bar / Quick Role Switcher Banner */}
      <div className="bg-slate-900 text-white text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-slate-200">EDU-PREDICT Interactive Frontend Prototype</span>
          <span className="hidden sm:inline text-slate-400">|</span>
          <span className="hidden sm:inline text-slate-400">AI Supervised Linear Regression System</span>
        </div>

        {/* Quick 1-Click Role Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-800/80 p-0.5 rounded-lg border border-slate-700/60">
          <span className="text-[11px] font-medium text-slate-400 px-2">Role Preview:</span>
          <button
            onClick={() => {
              onRoleChange('student');
              onNavigate('student-dashboard');
            }}
            className={`px-2.5 py-0.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
              activeRole === 'student' && !isPublic
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
          >
            Student (Rahul Sen)
          </button>
          <button
            onClick={() => {
              onRoleChange('admin');
              onNavigate('admin-dashboard');
            }}
            className={`px-2.5 py-0.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
              activeRole === 'admin' && !isPublic
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
          >
            Admin / Faculty
          </button>
          <button
            onClick={() => {
              onNavigate('home');
            }}
            className={`px-2.5 py-0.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
              isPublic
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
          >
            Public Website
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div 
            onClick={() => handleNav(isPublic ? 'home' : activeRole === 'student' ? 'student-dashboard' : 'admin-dashboard')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900">EDU-PREDICT</span>
                <span className="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wide uppercase">AI</span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium -mt-1 hidden sm:block">ABC Academy Academic Platform</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          {isPublic ? (
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              <button
                onClick={() => handleNav('home')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  currentView === 'home' ? 'text-indigo-600 bg-indigo-50/70 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => handleNav('about')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  currentView === 'about' ? 'text-indigo-600 bg-indigo-50/70 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                About Institute
              </button>
              <button
                onClick={() => handleNav('courses')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  currentView === 'courses' || currentView === 'course-detail' ? 'text-indigo-600 bg-indigo-50/70 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Courses
              </button>
              <button
                onClick={() => handleNav('categories')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  currentView === 'categories' ? 'text-indigo-600 bg-indigo-50/70 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Categories
              </button>
              <button
                onClick={() => handleNav('faculty')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  currentView === 'faculty' ? 'text-indigo-600 bg-indigo-50/70 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Faculty
              </button>
              <button
                onClick={() => handleNav('contact')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  currentView === 'contact' ? 'text-indigo-600 bg-indigo-50/70 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Contact
              </button>
            </nav>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-100 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                {activeRole === 'student' ? 'Student Workspace' : 'Administration & Faculty Portal'}
              </span>
            </div>
          )}

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {isPublic ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNav('login')}
                  className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-indigo-600 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Log In
                </button>
                <button
                  onClick={() => handleNav('register')}
                  className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  Register Now
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                {/* Notification Bell */}
                <button
                  onClick={() => handleNav(activeRole === 'student' ? 'student-notifications' : 'admin-notifications')}
                  className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                  title="Notifications"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
                  )}
                </button>

                {/* Profile Avatar & Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <img
                      src={activeRole === 'student' 
                        ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150' 
                        : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'
                      }
                      alt="Avatar"
                      className="w-8 h-8 rounded-lg object-cover ring-1 ring-slate-200"
                    />
                    <div className="text-left hidden sm:block">
                      <div className="text-xs font-bold text-slate-800 leading-tight">
                        {activeRole === 'student' ? 'Rahul Sen' : 'Dr. Aris Banerjee'}
                      </div>
                      <div className="text-[10px] text-slate-400 capitalize">
                        {activeRole === 'student' ? 'Python+Django' : 'Admin & Faculty'}
                      </div>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {/* Dropdown Menu */}
                  {profileDropdownOpen && (
                    <div 
                      className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-slate-100 py-1 z-50 animate-in fade-in zoom-in-95 duration-150"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <div className="px-4 py-2 border-b border-slate-100">
                        <p className="text-xs font-semibold text-slate-800">
                          {activeRole === 'student' ? 'Rahul Sen' : 'Dr. Aris Banerjee'}
                        </p>
                        <p className="text-[11px] text-slate-400 truncate">
                          {activeRole === 'student' ? 'rahul@example.com' : 'admin@abcacademy.edu'}
                        </p>
                      </div>

                      <button
                        onClick={() => handleNav(activeRole === 'student' ? 'student-profile' : 'admin-settings')}
                        className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                      >
                        <User className="w-3.5 h-3.5 text-slate-400" /> Profile & Settings
                      </button>

                      <button
                        onClick={() => handleNav('home')}
                        className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-slate-400" /> View Public Site
                      </button>

                      <div className="border-t border-slate-100 my-1" />

                      <button
                        onClick={() => handleNav('login')}
                        className="w-full text-left px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 flex items-center gap-2 cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5 text-rose-500" /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
            Navigation Menu
          </div>
          <button
            onClick={() => handleNav('home')}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Home
          </button>
          <button
            onClick={() => handleNav('about')}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            About Institute
          </button>
          <button
            onClick={() => handleNav('courses')}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Courses
          </button>
          <button
            onClick={() => handleNav('categories')}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Categories
          </button>
          <button
            onClick={() => handleNav('faculty')}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Faculty
          </button>
          <button
            onClick={() => handleNav('contact')}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Contact
          </button>

          <div className="border-t border-slate-200 pt-3">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
              Switch Direct Portal
            </div>
            <button
              onClick={() => {
                onRoleChange('student');
                handleNav('student-dashboard');
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-indigo-600 hover:bg-indigo-50 flex items-center gap-2"
            >
              <User className="w-4 h-4" /> Student Portal (Rahul Sen)
            </button>
            <button
              onClick={() => {
                onRoleChange('admin');
                handleNav('admin-dashboard');
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-indigo-600 hover:bg-indigo-50 flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" /> Admin & Faculty Portal
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

