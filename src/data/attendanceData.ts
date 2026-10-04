import { AttendanceRecord } from '../types';

export const ATTENDANCE_SUMMARY = {
  overallPercentage: 88,
  totalSessions: 50,
  presentSessions: 44,
  absentSessions: 5,
  excusedSessions: 1,
  subjectBreakdown: [
    { subject: 'Python Core & Advanced OOP', attended: 14, total: 15, percentage: 93.3 },
    { subject: 'Database Design & PostgreSQL', attended: 11, total: 12, percentage: 91.6 },
    { subject: 'Django Framework & ORM', attended: 11, total: 13, percentage: 84.6 },
    { subject: 'REST APIs & React Integration', attended: 8, total: 10, percentage: 80.0 },
  ],
  monthlyTrend: [
    { month: 'June', attendance: 95 },
    { month: 'July', attendance: 90 },
    { month: 'August', attendance: 86 },
    { month: 'September', attendance: 85 },
    { month: 'October', attendance: 88 },
  ]
};

export const RECENT_ATTENDANCE_LOGS: AttendanceRecord[] = [
  { id: 'ATT-050', studentId: 'STU-001', courseId: 'course-py-dj', date: '2026-10-02', sessionTitle: 'Lecture 50: React State & Linear Regression Endpoint Consumption', facultyName: 'Dr. Aris Banerjee', status: 'Present' },
  { id: 'ATT-049', studentId: 'STU-001', courseId: 'course-py-dj', date: '2026-09-30', sessionTitle: 'Lecture 49: Machine Learning Model Serializer with Joblib in Django', facultyName: 'Amitava Ghosh', status: 'Present' },
  { id: 'ATT-048', studentId: 'STU-001', courseId: 'course-py-dj', date: '2026-09-28', sessionTitle: 'Lecture 48: Supervised Linear Regression Math & Feature Weighting', facultyName: 'Amitava Ghosh', status: 'Present' },
  { id: 'ATT-047', studentId: 'STU-001', courseId: 'course-py-dj', date: '2026-09-25', sessionTitle: 'Lecture 47: Frontend Dashboard Charting with SVG & Tailwind', facultyName: 'Dr. Aris Banerjee', status: 'Present' },
  { id: 'ATT-046', studentId: 'STU-001', courseId: 'course-py-dj', date: '2026-09-23', sessionTitle: 'Lecture 46: React Router v7 & Role-Based Navigation Guards', facultyName: 'Dr. Aris Banerjee', status: 'Present' },
  { id: 'ATT-045', studentId: 'STU-001', courseId: 'course-py-dj', date: '2026-09-21', sessionTitle: 'Lecture 45: Token Refresh Handlers & Axios Interceptors', facultyName: 'Dr. Aris Banerjee', status: 'Absent', remarks: 'Medical leave submitted' },
  { id: 'ATT-044', studentId: 'STU-001', courseId: 'course-py-dj', date: '2026-09-18', sessionTitle: 'Lecture 44: DRF Custom Throttles & Rate Limiting Rules', facultyName: 'Dr. Aris Banerjee', status: 'Present' },
  { id: 'ATT-043', studentId: 'STU-001', courseId: 'course-py-dj', date: '2026-09-16', sessionTitle: 'Lecture 43: JWT Authentication & User Profiles in Django', facultyName: 'Dr. Aris Banerjee', status: 'Present' },
  { id: 'ATT-042', studentId: 'STU-001', courseId: 'course-py-dj', date: '2026-09-14', sessionTitle: 'Lecture 42: Generic API Views & Mixins in DRF', facultyName: 'Dr. Aris Banerjee', status: 'Present' },
  { id: 'ATT-041', studentId: 'STU-001', courseId: 'course-py-dj', date: '2026-09-11', sessionTitle: 'Lecture 41: Serializer Relations & Hyperlinked Identity', facultyName: 'Dr. Aris Banerjee', status: 'Present' },
  { id: 'ATT-040', studentId: 'STU-001', courseId: 'course-py-dj', date: '2026-09-09', sessionTitle: 'Lecture 40: Midterm Assessment Review & Debrief', facultyName: 'Dr. Aris Banerjee', status: 'Present' },
  { id: 'ATT-039', studentId: 'STU-001', courseId: 'course-py-dj', date: '2026-09-06', sessionTitle: 'Lecture 39: Django Transactions & Atomic Blocks', facultyName: 'Dr. Aris Banerjee', status: 'Excused', remarks: 'College practical conflict' },
  { id: 'ATT-038', studentId: 'STU-001', courseId: 'course-py-dj', date: '2026-09-04', sessionTitle: 'Lecture 38: Celery Task Queues & Redis Broker', facultyName: 'Dr. Aris Banerjee', status: 'Present' },
  { id: 'ATT-037', studentId: 'STU-001', courseId: 'course-py-dj', date: '2026-09-02', sessionTitle: 'Lecture 37: Django Caching Framework & Memcached', facultyName: 'Dr. Aris Banerjee', status: 'Present' },
  { id: 'ATT-036', studentId: 'STU-001', courseId: 'course-py-dj', date: '2026-08-30', sessionTitle: 'Lecture 36: Query Profiling with Django Debug Toolbar', facultyName: 'Dr. Aris Banerjee', status: 'Present' },
];

