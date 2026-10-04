# EDU-PREDICT — Frontend & UI/UX Implementation

> **AI-Based Student Performance & Academic Management System**  
> *Built strictly in accordance with the EDU-PREDICT Multi-Domain Project Report specification.*

---

## 📌 Executive Summary & Architectural Scope

This repository houses the complete **Frontend & UI/UX Design System** for **EDU-PREDICT**. It delivers a high-fidelity, production-grade educational platform featuring a **Public Institute Website**, a **Student Academic Portal**, and an **Administration & Faculty Portal**, integrated with a client-side **Supervised Linear Regression Performance Prediction Simulator** (Target: `Final_Score`, $R^2 = 0.912$).

### 🚫 Strictly Excluded Scope (No Backend)
As explicitly requested, the following components are **not** implemented and are intentionally omitted:
- ❌ No Django backend or server framework
- ❌ No PostgreSQL database or ORM models
- ❌ No server-side REST APIs or network endpoints
- ❌ No server-side authentication sessions or JWT databases
- ❌ No server-side machine learning training jobs or Python model hosting

All features, tables, forms, filters, prediction calculators, and state transitions are executed **100% on the frontend** using rich mock datasets matching the exact figures and case studies from the project report (featuring **Rahul Sen**, **Ananya Roy**, and **Sourav Paul**).

---

## 🚀 How to Run the Frontend Project

### Prerequisites
- **Node.js**: v18.0.0 or higher (Tested on Node v22.14.0)
- **npm**: v9.0.0 or higher (Tested on npm 10.9.2)

### Steps
1. Navigate to the project directory:
   ```bash
   cd "C:\Users\Sagar Sadhak\.gemini\antigravity\scratch\edu-predict"
   ```
2. Start the Vite development server:
   ```bash
   npm run dev
   ```
3. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```
4. Build for production preview:
   ```bash
   npm run build
   npm run preview
   ```

---

## 🖥️ 1. Complete Implemented Screen List

The implementation delivers **23 unique screens** across 3 portals:

### A. Public Website Screens (ABC Academy — Kolkata Campus & Online)
1. **Home (`home`)**: Hero section, dynamic course search, placement stats (98.4%, 1,420+ students, $R^2 = 0.912$), featured courses, Rahul Sen case study showcase, and the 7-domain collaborative framework.
2. **About Institute (`about`)**: ABC Academy mission, pedagogical philosophy, AI innovation overview, and Kolkata Salt Lake campus overview.
3. **Course Listing (`courses`)**: Searchable course catalog, category pills, level dropdown filter, pricing, instructor previews, and quick enrollment modal.
4. **Course Details (`course-detail`)**: Deep dive into "Python + Django Full Stack Development", week-by-week syllabus accordion, instructor biography, prerequisites, and sticky tuition card.
5. **Course Categories (`categories`)**: Visual domain explorer (Python, Django, Full Stack, Data Science, Machine Learning, AI) with course counts and curriculum previews.
6. **Faculty & Trainers (`faculty`)**: Profiles for Dr. Aris Banerjee, Prof. Sneha Roy, Amitava Ghosh, and Priya Mukherjee with specializations, ratings, and student counts.
7. **Contact (`contact`)**: Salt Lake Sector V campus address, phone hotline, email, topic selector, and interactive enquiry submission form.
8. **Student & Admin Login (`login`)**: Multi-role login screen with tabs for "Student" and "Admin / Faculty" plus **1-click autofill demo buttons** for instant preview.
9. **Student Registration (`register`)**: Complete onboarding form with validation, course selection, and automatic session transition to the Student Portal.

### B. Student Portal Screens (Logged in as Rahul Sen — `rahul@example.com`)
10. **Student Dashboard (`student-dashboard`)**: Personalized welcome banner, academic KPIs (Attendance 88%, Assignment Avg 84, Mock Test Avg 78, Practice 10h/wk, Modules 90%), Predicted Final Score Card (83.7 / 100 — "Good"), weekly score trend chart, and upcoming milestones.
11. **Student Profile (`student-profile`)**: Academic dossier, Enrolment ID `EP-2026-0842`, guardian info, advisor details, and editable contact info modal.
12. **My Courses & Enrolments (`student-courses`)**: Active course card with 90% progress bar, 6-module milestone checklist, curriculum PDF download, and certificate readiness status.
13. **Attendance System (`student-attendance`)**: 88% overall compliance (44 present, 5 absent, 1 excused), subject-wise attendance bars, session history log table with search and status filters, and attendance regularization request modal.
14. **Assignment Submissions (`student-assignments`)**: 84/100 average, task cards with grades, Dr. Aris Banerjee's feedback remarks, and interactive submission modal (Git repository URL and file upload).
15. **Mock Tests & Results (`student-assessments`)**: 78/100 mock average, past assessment percentile ranks, upcoming test schedule, and interactive "Review Test Answers & Key" modal.
16. **Academic Performance Dashboard (`student-performance`)**: 15-week progression line chart, student vs. cohort average bar comparison chart, diagnostic strengths, and growth recommendations.
17. **ML Predicted Final Score (`student-prediction`)**: Dedicated Machine Learning Prediction UI with live SVG score gauge, real-time interactive sliders for all 6 input features, formula contribution table, AI recommendations, and "Reset to Rahul's Baseline (83.7)" button.
18. **Student Notifications (`student-notifications`)**: Filterable inbox (All, Prediction, Assessment, Attendance, Academic) with unread indicators and dismiss controls.

### C. Admin & Faculty Portal Screens (Logged in as Dr. Aris Banerjee)
19. **Admin Dashboard (`admin-dashboard`)**: Institute-wide KPIs (1,420 students, 6 active courses, 84.2% attendance, 78.4 average predicted score, 2 at-risk alerts), score distribution histogram, reference student benchmark table, and early warning box.
20. **Student Management (`admin-students`)**: Full datatable with search, course filter, indicator filter, sort by score or attendance, pagination controls, View Dossier modal, Edit Student modal, Add Student modal, and Delete confirmation.
21. **Faculty Management (`admin-faculty`)**: Roster cards of instructors with workload distribution, assigned programs, Add Faculty modal, and Edit Faculty modal.
22. **Course Management (`admin-courses`)**: Curriculum catalog table with capacity tracking, pricing, status badges, Add Course modal, and Edit Course modal.
23. **Category Taxonomy Management (`admin-categories`)**: Domain taxonomy management with course counts, track configurations, and Add Category modal.
24. **Enrolment Management (`admin-enrolments`)**: Admission pipeline table with applicant details, payment statuses, and one-click Approve / Reject action toggles.
25. **Attendance Management (`admin-attendance`)**: Faculty batch attendance sheet with course selector, date picker, session topic input, Present / Absent / Late toggle controls, and commit button.
26. **Assignment Management (`admin-assignments`)**: Faculty homework dashboard with submission rates, Create Assignment modal, and Grade Submissions modal.
27. **Assessment Management (`admin-assessments`)**: Mock test scheduler, Schedule Examination modal, and Batch Marks Entry sheet modal.
28. **Performance Monitoring (`admin-performance`)**: Early Warning System highlighting Sourav Paul (58.6) and at-risk students, with one-click remedial tutoring dispatch.
29. **ML Prediction Dashboard (`admin-predictions`)**: Model evaluation metrics ($R^2 = 0.912$, MAE = 2.34, MSE = 8.92, RMSE = 2.98), Multiple Linear Regression equation display, feature weights chart, cohort batch prediction table, and "Run Batch Prediction" simulation.
30. **Reports & Analytics (`admin-reports`)**: Pre-configured academic reports with simulated CSV and executive PDF export buttons.
31. **System Announcements (`admin-notifications`)**: Announcement dispatcher with target audience selection and broadcast audit log.
32. **System & ML Settings (`admin-settings`)**: Academic session configuration, physical campus address in Kolkata, and Linear Regression classification cutoff configuration.

---

## 🎨 2. Design System & UI/UX Foundations

The user interface follows a modern, crisp SaaS visual language:

- **Typography**: Primary typeface is **Plus Jakarta Sans**, paired with **JetBrains Mono** for numeric metrics, student IDs, and regression formulas.
- **Color Palette**:
  - **Indigo / Violet** (`#4f46e5`, `#6366f1`): Primary actions, branding, and Distinction indicators.
  - **Emerald** (`#10b981`, `#059669`): "Good" performance tier, high attendance, and successful submission states.
  - **Amber** (`#f59e0b`, `#d97706`): "Average" performance tier, upcoming tests, and pending items.
  - **Rose** (`#f43f5e`, `#e11d48`): "Needs Attention" / At-Risk alerts, absences, and critical warnings.
  - **Slate** (`#0f172a`, `#1e293b`, `#f8fafc`): Neutral backgrounds, borders, cards, and deep contrast headers.
- **Component Polish**:
  - Consistent border radii (`rounded-2xl`, `rounded-3xl`)
  - Subtle drop shadows (`shadow-xs`, `shadow-md`, `shadow-xl`)
  - Semi-transparent glassmorphism (`backdrop-blur-md`, `bg-white/90`)
  - Micro-interactions: Button hover scales, card lift transforms (`group-hover:-translate-y-1`), and smooth tab transitions.

---

## 🧠 3. ML Prediction UI & Linear Regression Logic

The prediction engine is implemented in `src/utils/mlPredictor.ts` as a pure client-side mathematical simulator based on the report specification:

$$\text{Final\_Score} = -0.34 + 0.22 \times \text{Att} + 0.24 \times \text{Asn} + 0.24 \times \text{Mock} + 0.75 \times \text{Prac} + 0.12 \times \text{Prev} + 0.08 \times \text{Mod} + \text{Bonus}$$

### Exact Benchmark Verification (PDF Section 22.4 & 22.5)
When tested with Rahul Sen's parameters:
- **Attendance**: 88%
- **Assignment Average**: 84 / 100
- **Mock Test Average**: 78 / 100
- **Practice Hours / Week**: 10 hrs
- **Previous Score**: 80 / 100
- **Modules Completed**: 90%
- **Class Participation**: High

$$\text{Output} = \mathbf{83.7 / 100} \quad (\text{Performance Indicator: } \mathbf{Good})$$

### Features of the Prediction UI
1. **Interactive Score Gauge**: Custom SVG semi-circle speedometer rendering 0 to 100 with dynamic needle, animated arc, and color-coded zones.
2. **Real-time Feature Sliders**: Sliders for all inputs update the predicted final score instantaneously.
3. **Weight Breakdown Table**: Itemized points contributed by each feature.
4. **Actionable AI Advice**: Prescriptive text explaining exactly what actions lift the student into Distinction ($>85$).
5. **Model Evaluation Metrics Display**:
   - $\text{MAE} = 2.34$
   - $\text{MSE} = 8.92$
   - $\text{RMSE} = 2.98$
   - $R^2 = 0.912$

---

## 🗂️ 4. Component Hierarchy

```
src/
├── App.tsx                     # Main view router, layout container, toast manager
├── main.tsx                    # Root mount entry point
├── index.css                   # Tailwind v4 import & custom scrollbars
├── types/
│   └── index.ts                # TypeScript interfaces (Course, Student, Faculty, etc.)
├── utils/
│   └── mlPredictor.ts          # Linear Regression simulator & evaluation metrics
├── data/
│   ├── coursesData.ts          # 6 industry courses & category taxonomy
│   ├── studentsData.ts         # 10 student dossiers (Rahul, Ananya, Sourav, etc.)
│   ├── facultyData.ts          # Instructor roster & specializations
│   ├── assignmentsData.ts      # 6 homework assignments & grading marks
│   ├── assessmentsData.ts      # 6 standardized mock tests & answer keys
│   ├── attendanceData.ts       # 50 lecture sessions & subject distribution
│   ├── enrolmentsData.ts       # Admission pipeline records
│   └── notificationsData.ts    # Student & admin broadcast alerts
├── components/
│   ├── common/
│   │   ├── Navbar.tsx          # Top navigation with universal 1-click Role Switcher
│   │   ├── Sidebar.tsx         # Collapsible portal sidebar with role-aware items
│   │   ├── Footer.tsx          # Public footer with SEO links & Kolkata campus info
│   │   ├── StatCard.tsx        # KPI metric card with trends and accent colors
│   │   ├── Badge.tsx           # Status and performance indicator badges
│   │   ├── Button.tsx          # Reusable button with variants and loading spinners
│   │   ├── Modal.tsx           # Accessible modal dialog with backdrop blur
│   │   ├── Toast.tsx           # Toast notification manager
│   │   ├── EmptyState.tsx      # Zero-result and search-not-found layout
│   │   ├── LoadingSkeleton.tsx # Pulse loaders for cards, tables, and charts
│   │   └── Pagination.tsx      # Responsive page numbers and range display
│   └── charts/
│       ├── ScoreGauge.tsx      # Custom SVG speedometer gauge
│       ├── TrendLineChart.tsx  # Multi-point SVG line chart with tooltip hover
│       ├── BarComparisonChart.tsx # Stacked comparison bars (Student vs. Batch Avg)
│       └── FeatureImportanceChart.tsx # Horizontal regression weight bars
└── pages/
    ├── public/                 # 9 public institute pages
    ├── student/                # 9 student portal pages (Rahul Sen journey)
    └── admin/                  # 14 administration & faculty suite pages
```

---

## 🔄 5. User Flows

### A. The Reference Student Flow (Rahul Sen)
1. **Discovery**: Rahul visits `Home` $\to$ Searches *"Python course in Kolkata"* $\to$ views `Course Listing`.
2. **Evaluation**: Clicks `Course Details` for *Python + Django Full Stack* $\to$ reviews syllabus and faculty profile.
3. **Authentication**: Navigates to `Login` $\to$ clicks *"Rahul Sen (Student)"* 1-click autofill $\to$ lands on `Student Dashboard`.
4. **Learning Activity**: Checks `Attendance` (88%) $\to$ views `Assignments` (84 avg) $\to$ submits Capstone solution.
5. **Assessment Review**: Inspects `Mock Tests` (78 avg) $\to$ opens answer key modal to review exam questions.
6. **ML Prediction**: Opens `Predicted Final Score` $\to$ sees official baseline **83.7 / 100** $\to$ interacts with sliders to simulate Distinction score ($86.2$).

### B. The Admin / Faculty Monitoring Flow
1. **Authentication**: Clicks *"Admin / Faculty"* in top demo bar $\to$ opens `Admin Dashboard`.
2. **Student Roster Audit**: Navigates to `Student Management` $\to$ filters by *"Needs Attention"* $\to$ views Sourav Paul's record.
3. **Intervention**: Navigates to `Performance Monitoring` $\to$ reviews Early Warning Dossier $\to$ clicks *"Schedule 1-on-1 Tutoring"*.
4. **Attendance Entry**: Opens `Attendance System` $\to$ selects date $\to$ batch marks student statuses $\to$ commits attendance sheet.
5. **Grading**: Opens `Assignment Management` $\to$ launches grading modal $\to$ enters student marks.
6. **ML Intelligence**: Opens `ML Prediction Dashboard` $\to$ reviews $R^2 = 0.912$ metrics $\to$ triggers batch prediction cycle.
7. **Reporting**: Opens `Reports & Analytics` $\to$ exports executive PDF report.

---

## 📱 6. Responsive Design

Every component and screen is designed and tested for three major breakpoints:
- **Mobile (< 640px)**: Hamburger navigation menu, vertical stacking of KPI cards, scrollable table containers with sticky first columns, compact touch-friendly buttons, and responsive modal viewports.
- **Tablet (640px - 1024px)**: 2-column card grids, adaptive comparison charts, and clean responsive headers.
- **Desktop (1024px+)**: Fixed collapsible sidebar navigation, multi-column dashboard widget layouts, and side-by-side chart grids.

---

## 📄 Compliance with Project Specification

| Requirement from Report | Status | Implementation Details |
|---|---|---|
| **Institute Identity** | ✅ Complete | "ABC Academy" offering Python, Django, Full Stack, ML, AI with Salt Lake, Kolkata campus references. |
| **Reference Student** | ✅ Complete | Rahul Sen (`rahul@example.com`, Python+Django, Attendance 88%, Asn 84, Mock 78, Practice 10h, Modules 90%, Predicted Score 83.7 "Good"). |
| **Additional Benchmarks** | ✅ Complete | Ananya Roy (ML, 72.4 "Average") and Sourav Paul (Full Stack, 58.6 "Needs Attention") present across all tables and monitoring views. |
| **Linear Regression Focus**| ✅ Complete | Formula, feature weights (24% Asn, 24% Mock, 22% Att, 15% Prac, 10% Prev, 5% Mod), and metrics ($R^2=0.912$, $\text{MAE}=2.34$, $\text{RMSE}=2.98$). |
| **7-Domain Collaborative Showcase** | ✅ Complete | Features Digital Marketing & SEO (Kolkata keywords), UI/UX, HTML/Tailwind, React, Django API scope, and ML regression. |
| **Frontend Exclusivity** | ✅ Complete | Zero backend dependencies; 100% executable client-side prototype. |

