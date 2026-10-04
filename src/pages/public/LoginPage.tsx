import React, { useState } from 'react';
import { GraduationCap, Lock, Mail, ArrowRight, ShieldCheck, User, Sparkles, CheckCircle2 } from 'lucide-react';
import { Role } from '../../types';
import { Button } from '../../components/common/Button';

interface LoginPageProps {
  onLoginSuccess: (role: Role) => void;
  onNavigate: (view: string) => void;
  onShowToast: (type: 'success' | 'error' | 'info', title: string, msg?: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  onNavigate,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<Role>('student');
  const [email, setEmail] = useState('rahul@example.com');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleTab = (role: Role) => {
    setActiveTab(role);
    if (role === 'student') {
      setEmail('rahul@example.com');
      setPassword('password123');
    } else {
      setEmail('admin@abcacademy.edu');
      setPassword('adminPass123');
    }
  };

  const handleQuickDemoFill = (role: Role) => {
    handleRoleTab(role);
    onShowToast('info', 'Credentials Loaded', `Pre-populated demo credentials for ${role === 'student' ? 'Rahul Sen' : 'Admin / Faculty'}.`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onShowToast('success', 'Authentication Successful', `Welcome back, ${activeTab === 'student' ? 'Rahul Sen' : 'Dr. Aris Banerjee'}!`);
      onLoginSuccess(activeTab);
    }, 600);
  };

  return (
    <div className="min-h-[calc(100vh-14rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xl">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white mx-auto shadow-md shadow-indigo-500/20">
            <GraduationCap className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Portal Authentication</h2>
          <p className="text-xs text-slate-500">
            Sign in to access your course modules and real-time ML score prediction.
          </p>
        </div>

        {/* Role Tab Selector */}
        <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl">
          <button
            type="button"
            onClick={() => handleRoleTab('student')}
            className={`flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'student'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Student Portal</span>
          </button>
          <button
            type="button"
            onClick={() => handleRoleTab('admin')}
            className={`flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'admin'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin / Faculty</span>
          </button>
        </div>

        {/* 1-Click Quick Demo Credentials Pill */}
        <div className="p-3 bg-indigo-50/80 border border-indigo-100 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-bold text-indigo-900 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-indigo-600" /> Demo Quick Autofill:
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemoFill('student')}
              className="text-[11px] font-semibold text-left p-1.5 rounded-lg bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-100 transition-colors cursor-pointer"
            >
              Rahul Sen (Student)
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoFill('admin')}
              className="text-[11px] font-semibold text-left p-1.5 rounded-lg bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-100 transition-colors cursor-pointer"
            >
              Dr. Banerjee (Admin)
            </button>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
              <span>Remember session</span>
            </label>
            <button
              type="button"
              onClick={() => onShowToast('info', 'Password Reset Link', 'A mock reset token has been dispatched to your email.')}
              className="font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer"
            >
              Forgot password?
            </button>
          </div>

          <Button
            type="submit"
            className="w-full"
            size="lg"
            isLoading={isLoading}
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
          >
            Authenticate & Open Dashboard
          </Button>
        </form>

        {/* Footer Note */}
        <div className="text-center pt-2 border-t border-slate-100 text-xs text-slate-500">
          New student?{' '}
          <button
            onClick={() => onNavigate('register')}
            className="font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
          >
            Create an account
          </button>
        </div>
      </div>
    </div>
  );
};

