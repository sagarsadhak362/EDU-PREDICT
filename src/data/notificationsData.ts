import { AppNotification } from '../types';

export const STUDENT_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'NOTIF-01',
    title: 'Predicted Score Updated: 83.7 / 100',
    message: 'Your Linear Regression model prediction has refreshed. Current performance indicator: "Good". You are within 1.3 points of Distinction bracket!',
    date: '2 hours ago',
    type: 'prediction',
    read: false,
    priority: 'high',
  },
  {
    id: 'NOTIF-02',
    title: 'Assignment 5 Graded: 84 / 100',
    message: 'Dr. Aris Banerjee evaluated your React Component Architecture submission. Detailed remarks are available in your portal.',
    date: 'Yesterday',
    type: 'academic',
    read: false,
    priority: 'medium',
  },
  {
    id: 'NOTIF-03',
    title: 'Upcoming Assessment: Mock Test 4',
    message: 'Mock Assessment 4 (Full Stack React & DRF Integration) scheduled for October 12th, 10:00 AM IST. Prepare modules 4 & 5.',
    date: '2 days ago',
    type: 'assessment',
    read: true,
    priority: 'high',
  },
  {
    id: 'NOTIF-04',
    title: 'Attendance Advisory Notice',
    message: 'Your overall attendance is currently 88%. Institute policy mandates at least 85% attendance to qualify for campus placement drives.',
    date: '4 days ago',
    type: 'attendance',
    read: true,
    priority: 'low',
  },
  {
    id: 'NOTIF-05',
    title: 'New Study Resources Added',
    message: 'Lecture slides for "Connecting ML Endpoints to React Frontends" have been uploaded to the course repository.',
    date: '1 week ago',
    type: 'system',
    read: true,
    priority: 'low',
  },
];

export const ADMIN_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'ADM-NOTIF-01',
    title: 'Early Warning Alert: Student At Risk',
    message: 'Sourav Paul (STU-003) predicted score dropped to 58.6 ("Needs Attention"). Low attendance (62%) and practice hours (4 hrs/wk).',
    date: '1 hour ago',
    type: 'prediction',
    read: false,
    priority: 'high',
  },
  {
    id: 'ADM-NOTIF-02',
    title: 'Batch Prediction Regression Cycle Complete',
    message: 'Supervised Linear Regression batch run evaluated 342 students in Python + Django Full Stack. Mean R² score: 0.912.',
    date: '3 hours ago',
    type: 'system',
    read: false,
    priority: 'medium',
  },
  {
    id: 'ADM-NOTIF-03',
    title: 'New Student Enrollment Awaiting Approval',
    message: 'Tanmoy Sengupta registered for "Python + Django Full Stack Development". Documents verified.',
    date: '5 hours ago',
    type: 'academic',
    read: true,
    priority: 'medium',
  },
  {
    id: 'ADM-NOTIF-04',
    title: 'Attendance Deficit Report Generated',
    message: 'Weekly audit completed: 18 students across all batches have attendance under the 75% threshold.',
    date: '1 day ago',
    type: 'attendance',
    read: true,
    priority: 'high',
  },
];

