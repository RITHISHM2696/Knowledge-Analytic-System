# Knowledge Analytics System - Quick Reference Guide

## 🚀 Quick Start (Copy-Paste)

### Terminal 1: Backend
```bash
cd backend
npm install
node server.js
```

### Terminal 2: Frontend
```bash
cd frontend/kas-app
npm install
npm start
```

### Terminal 3: Database (First time only)
```bash
mysql -u root -p
CREATE DATABASE kas_db;
USE kas_db;
CREATE TABLE students(
  roll VARCHAR(10),
  name VARCHAR(50),
  cgpa FLOAT,
  att INT,
  c INT,
  java INT,
  python INT,
  academic FLOAT,
  technical FLOAT,
  overall FLOAT,
  performance VARCHAR(30)
);
EXIT;
```

**Login**: `admin@gmail.com` / `1234`

---

## 📁 File Structure at a Glance

```
Backend:
├── db.js                    # MySQL connection
├── server.js               # Express app
├── package.json
└── routes/student.js       # 5 API endpoints

Frontend Components:
├── Login.js               # Login page
├── Dashboard.js           # Main layout with sidebar
├── Home.js               # Dashboard statistics
├── StudentForm.js        # Add student form
├── StudentDetails.js     # All students table
├── Search.js             # Search by roll
└── Profile.js            # User profile

Styles:
├── App.css               # Global styles
├── Dashboard.css         # Sidebar + layout
├── Home.css             # Cards + stats
├── StudentForm.css      # Form styling
├── StudentDetails.css   # Table styling
├── Search.css           # Search page
└── Profile.css          # Profile page
```

---

## 🔗 API Endpoints Quick Reference

```javascript
// Base URL: http://localhost:5000/student

// Get all students
GET /all
→ Array of all students

// Get top 3 students
GET /top3
→ Top 3 by overall score

// Get statistics
GET /stats
→ { total, excellent, average, good, needsImprovement }

// Add student
POST /add
Body: { roll, name, cgpa, att, c, java, python }
→ "Added"

// Search student
GET /:roll
→ Student object
```

---

## 📊 Calculation Formulas

```javascript
Academic Score = (CGPA × 10 + Attendance%) / 2

Technical Score = (C + Java + Python) / 3 × 20

Overall Score = (Academic Score + Technical Score) / 2

Performance:
- Excellent: Overall ≥ 80
- Good: 60 ≤ Overall < 80
- Average: 40 ≤ Overall < 60
- Needs Improvement: Overall < 40
```

---

## 🎨 Color Codes for Copy-Paste

```css
/* Primary Colors */
--primary: #667eea;       /* Purple */
--secondary: #764ba2;     /* Dark Purple */

/* Status Colors */
--success: #10b981;       /* Green - Excellent */
--info: #3b82f6;         /* Blue - Good */
--warning: #f59e0b;      /* Orange - Average */
--danger: #ef4444;       /* Red - Needs Improvement */

/* Neutral Colors */
--bg-light: #f8fafc;     /* Very light gray */
--text-dark: #1e293b;    /* Dark gray */
--text-muted: #64748b;   /* Medium gray */
--border: #e2e8f0;       /* Light gray */
```

---

## 🔐 Environment Variables (If Needed)

```bash
# backend/.env (create if needed)
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=royalenfield
DB_NAME=kas_db
PORT=5000

# frontend/.env (create if needed)
REACT_APP_API_URL=http://localhost:5000
```

---

## 📱 Responsive Breakpoints

```css
/* Desktop */
@media (min-width: 1024px) {
  /* Full layout, sidebar visible */
}

/* Tablet */
@media (max-width: 768px) {
  /* Adjusted layout, smaller fonts */
}

/* Mobile */
@media (max-width: 480px) {
  /* Single column, touch-friendly */
}
```

---

## 🧩 Component Props & State

### Dashboard Component
```javascript
const [activeTab, setActiveTab] = useState("home");
// Manages which section to display
```

### Home Component
```javascript
const [stats, setStats] = useState(null);
const [topStudents, setTopStudents] = useState([]);
// Fetches from GET /stats and GET /top3
```

### StudentForm Component
```javascript
const [formData, setFormData] = useState({...});
const [errors, setErrors] = useState({});
const [success, setSuccess] = useState("");
// Form validation and submission
```

### Search Component
```javascript
const [rollNo, setRollNo] = useState("");
const [student, setStudent] = useState(null);
const [error, setError] = useState("");
// Search functionality
```

---

## 🚨 Common Commands

```bash
# Kill port (Windows)
taskkill /PID <PID> /F

# Kill port (Mac/Linux)
kill -9 <PID>

# Find process on port
netstat -ano | findstr :3000    # Windows
lsof -i :3000                   # Mac/Linux

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json && npm install

# Restart MySQL (Windows)
net stop MySQL80
net start MySQL80

# Restart MySQL (Mac)
sudo /usr/local/mysql/support-files/mysql.server restart

# Test API
curl http://localhost:5000/student/all
```

---

## 🐛 Debug Shortcuts

```javascript
// Log to console
console.log("text", variable);

// Log with color (frontend)
console.log("%cText", "color: blue; font-size: 20px");

// Conditional breakpoint
debugger; // pauses if devtools open

// API debug (backend)
console.log("Query:", queryString);
console.log("Response:", data);
```

---

## 📝 Form Validation Rules

```javascript
// Roll Number
✓ Required
✓ String
✗ No special characters

// Name
✓ Required
✓ String
✓ Min 3 characters

// CGPA
✓ Required
✓ Number 0-10
✓ Max 2 decimals

// Attendance
✓ Required
✓ Number 0-100
✓ Integer

// C, Java, Python
✓ Required
✓ Number 0-10
✓ Integer
```

---

## 🎯 CSS Classes for Styling

```css
/* Layout */
.dashboard-container       /* Main flex container */
.sidebar                  /* Fixed sidebar nav */
.dashboard-content       /* Main content area */
.content-area           /* Page content */

/* Cards */
.stat-card              /* Dashboard cards */
.top-student-card       /* Student ranking card */
.result-card            /* Search result card */

/* Forms */
.form-card              /* Form container */
.form-section           /* Form section */
.form-label             /* Input label */

/* Tables */
.details-table          /* Student data table */
.table-responsive       /* Mobile scroll */

/* Badges */
.badge-success          /* Green badge */
.badge-warning          /* Orange badge */
.badge-danger           /* Red badge */
```

---

## 🔄 API Request Examples

```javascript
// Add Student (Frontend)
const newStudent = {
  roll: "CS001",
  name: "John",
  cgpa: 8.5,
  att: 95,
  c: 9,
  java: 8,
  python: 7
};

axios.post("http://localhost:5000/student/add", newStudent)
  .then(res => console.log(res.data))
  .catch(err => console.log(err));

// Get All (Frontend)
axios.get("http://localhost:5000/student/all")
  .then(res => setStudents(res.data))
  .catch(err => console.log(err));

// Search (Frontend)
axios.get(`http://localhost:5000/student/${rollNumber}`)
  .then(res => setStudent(res.data[0]))
  .catch(err => console.log(err));
```

---

## 🗂️ File Checklist

Essential Files:
- [ ] backend/db.js
- [ ] backend/server.js
- [ ] backend/routes/student.js
- [ ] frontend/src/App.js
- [ ] frontend/src/components/* (all 7)
- [ ] frontend/src/styles/* (all 6)
- [ ] frontend/public/index.html
- [ ] Database created with table

Configuration Files:
- [ ] backend/package.json
- [ ] frontend/package.json
- [ ] Database credentials match

---

## 📊 Database Schema Quick View

```sql
CREATE TABLE students(
  roll VARCHAR(10),        -- Student ID
  name VARCHAR(50),        -- Student name
  cgpa FLOAT,             -- GPA (0-10)
  att INT,                -- Attendance (0-100)
  c INT,                  -- C/C++ rating (0-10)
  java INT,               -- Java rating (0-10)
  python INT,             -- Python rating (0-10)
  academic FLOAT,         -- Calculated academic
  technical FLOAT,        -- Calculated technical
  overall FLOAT,          -- Calculated overall
  performance VARCHAR(30) -- Classification
);
```

---

## 🎯 Testing Checklist

Before Deployment:
- [ ] Login works
- [ ] Can add student
- [ ] Student appears in table
- [ ] Search returns correct student
- [ ] Dashboard stats match data
- [ ] Top 3 shows in order
- [ ] Form validation works
- [ ] Page responsive on mobile

---

## 💾 Database Backup Quick Commands

```bash
# Backup database
mysqldump -u root -p kas_db > backup.sql

# Restore database
mysql -u root -p kas_db < backup.sql

# Export students as CSV
mysql -u root -p kas_db -e "SELECT * FROM students" > students.csv
```

---

## 🔗 Useful Resources

- [React Hooks](https://react.dev/reference/react/hooks)
- [Bootstrap Classes](https://getbootstrap.com/docs/5.3/utilities)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [MySQL Connector](https://www.npmjs.com/package/mysql2)
- [Axios Docs](https://axios-http.com/docs/intro)

---

## 📞 Quick Help

**Backend not connecting to DB?**
→ Check: credentials in db.js, MySQL running, database exists

**Frontend not loading?**
→ Check: npm install completed, port 3000 free, backend running

**Form submission fails?**
→ Check: all required fields filled, valid ranges, backend console

**Search returns nothing?**
→ Check: student exists, exact roll number, uppercase/lowercase

**Table empty?**
→ Check: added students?, hard refresh (Ctrl+F5), backend running

---

## 🎓 Learning Tips

1. **Understand the flow**: Login → Dashboard → Add/Search/View
2. **Follow the API**: Every button calls an endpoint at /student/*
3. **Check console errors**: Browser F12 and backend terminal
4. **Test APIs first**: Use curl before debugging frontend
5. **Read error messages**: They usually tell you what's wrong

---

**Version**: 1.0.0
**Quick Reference**: February 2026
**Status**: Ready to Use
