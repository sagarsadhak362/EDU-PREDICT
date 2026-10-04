export type Role = 'student' | 'faculty' | 'admin';

export type PerformanceIndicator = 'Good' | 'Average' | 'Needs Attention' | 'Distinction';

export interface Course {
  id: string;
  title: string;
  slug: string;
  category: string;
  categoryId: string;
  description: string;
  longDescription: string;
  duration: string;
  hours: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels' | 'Beginner to Advanced' | 'Beginner to Intermediate';
  faculty: string;
  facultyTitle: string;
  facultyAvatar: string;
  rating: number;
  enrolledCount: number;
  maxSeats: number;
  status: 'Active' | 'Upcoming' | 'Completed';
  price: string;
  modulesCount: number;
  syllabus: {
    title: string;
    description: string;
    weeks: string;
  }[];
  keywords: string[];
}

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  enrolledCourseId: string;
  enrolledCourseName: string;
  enrollmentDate: string;
  courseStatus: 'Active' | 'Completed' | 'Pending';
  avatar: string;
  attendance: number; // percentage e.g. 88
  assignmentAvg: number; // e.g. 84
  mockTestAvg: number; // e.g. 78
  practiceHours: number; // e.g. 10
  previousScore: number; // e.g. 80
  modulesCompleted: number; // percentage e.g. 90
  classParticipation: 'High' | 'Medium' | 'Low';
  predictedScore: number; // e.g. 83.7
  performanceIndicator: PerformanceIndicator;
  riskStatus: 'Safe' | 'Moderate' | 'At Risk';
  notes?: string;
}

export interface Faculty {
  id: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  department: string;
  specialization: string;
  avatar: string;
  experience: string;
  rating: number;
  coursesAssigned: string[];
  studentsCount: number;
}

export interface Assignment {
  id: string;
  courseId: string;
  courseName: string;
  title: string;
  description: string;
  dueDate: string;
  maxScore: number;
  studentScore?: number;
  status: 'Graded' | 'Submitted' | 'Pending' | 'Overdue';
  submittedDate?: string;
  feedback?: string;
  submissionsCount?: number;
  gradedCount?: number;
  averageScore?: number;
}

export interface Assessment {
  id: string;
  courseId: string;
  courseName: string;
  title: string;
  type: 'Mock Test' | 'Midterm Exam' | 'Module Quiz' | 'Final Assessment';
  date: string;
  totalMarks: number;
  studentScore?: number;
  percentile?: number;
  durationMinutes: number;
  status: 'Completed' | 'Upcoming' | 'Live';
  rank?: string;
  batchAverage?: number;
  highestScore?: number;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  courseId: string;
  date: string;
  sessionTitle: string;
  facultyName: string;
  status: 'Present' | 'Absent' | 'Excused';
  remarks?: string;
}

export interface Enrolment {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  courseId: string;
  courseName: string;
  enrolmentDate: string;
  status: 'Approved' | 'Pending' | 'Rejected';
  paymentStatus: 'Paid' | 'Pending' | 'Waived';
  amount: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  date: string;
  type: 'academic' | 'assessment' | 'attendance' | 'prediction' | 'system';
  read: boolean;
  priority: 'low' | 'medium' | 'high';
}

export interface MLModelMetrics {
  algorithm: string;
  targetVariable: string;
  mae: number;
  mse: number;
  rmse: number;
  r2Score: number;
  trainedSamplesCount: number;
  features: {
    name: string;
    description: string;
    weight: number;
    impact: 'Positive' | 'High Positive' | 'Moderate Positive';
  }[];
}
