# Knowledge Analytics System (KAS)

A modern web-based Knowledge Analytics System for managing, analyzing, and tracking student performance using academic metrics and technical skill assessments.

## Features

### Dashboard
- Attractive sidebar navigation with Home, Profile, Add Student, Student Details, Search Student, and Logout options
- Modern and responsive design with Bootstrap framework

### Home Page
- **Summary Cards**: Display Total Students, Excellent Students, Average Students, and Needs Improvement Students count
- **Top 3 Performers**: Show top 3 students based on overall knowledge score with detailed cards
- **Responsive Grid Layout**: Adapts to all device sizes

### Add Student Section
- Well-designed HTML form with input validation
- Fields: Roll Number, Name, CGPA, Attendance %, Technical Skills (C, Java, Python ratings)
- Automatic calculation of:
  - **Academic Score**: Average of CGPA (×10) and Attendance
  - **Technical Score**: Average of C, Java, Python ratings (×20)
  - **Overall Score**: Average of Academic and Technical scores
  - **Performance Classification**: Excellent (≥80), Good (60-79), Average (40-59), Needs Improvement (<40)

### Student Details Section
- Responsive HTML table showing all student data from MySQL database
- Display Roll No, Name, CGPA, Attendance, Technical Skills, Scores, and Performance
- Real-time search filter by roll number

### Search Student Section
- Search bar to find students by roll number
- Displays:
  - Student details
  - Academic Score with CGPA and Attendance breakdown
  - Technical Score with skill ratings
  - Overall Score with progress bar
  - Performance classification with icon

### Profile Page
- User profile information
- System information and version details
- Available features list
- About KAS section

## 🛠️ Tech Stack

**Frontend:**
- React 18.2
- Bootstrap 5.3
- Axios for API calls
- React Router v6

**Backend:**
- Node.js with Express
- MySQL database
- Body Parser for JSON parsing
- CORS for cross-origin requests

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn

## ⚙️ Installation

### 1. Database Setup

```bash
# Login to MySQL
mysql -u root -p

# Run the SQL script
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
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Update database credentials in db.js if needed
# Start the server
node server.js

# Server will run on http://localhost:5000
```

### 3. Frontend Setup

```bash
cd frontend/kas-app

# Install dependencies
npm install

# Start the development server
npm start

# Application will open at http://localhost:3000
```

## 🔐 Login Credentials

- **Email**: admin@gmail.com
- **Password**: 1234

##  Project Structure

```
Knowledge Analytics System/
├── backend/
│   ├── db.js (MySQL connection)
│   ├── server.js (Express server)
│   ├── package.json
│   ├── README_DB.sql (Database schema)
│   └── routes/
│       └── student.js (Student API routes)
│
└── frontend/kas-app/
    ├── package.json
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── App.js (Main component with routing)
    │   ├── App.css (Global styles)
    │   ├── index.js
    │   ├── components/
    │   │   ├── Dashboard.js (Main layout with sidebar)
    │   │   ├── Home.js (Dashboard home page)
    │   │   ├── StudentForm.js (Add student form)
    │   │   ├── StudentDetails.js (All students table)
    │   │   ├── Search.js (Search by roll number)
    │   │   ├── Profile.js (User profile)
    │   │   └── Login.js (Login page)
    │   └── styles/
    │       ├── Dashboard.css
    │       ├── Home.css
    │       ├── StudentForm.css
    │       ├── StudentDetails.css
    │       ├── Search.css
    │       └── Profile.css
```

##  API Endpoints

### Student Routes (Base URL: http://localhost:5000/student)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/add` | Add a new student |
| GET | `/all` | Get all students |
| GET | `/top3` | Get top 3 performing students |
| GET | `/stats` | Get performance statistics |
| GET | `/:roll` | Search student by roll number |

## 📊 Performance Classification Logic

The system automatically calculates performance based on overall score:

```
Excellent: Overall Score >= 80
Good: Overall Score 60-79
Average: Overall Score 40-59
Needs Improvement: Overall Score < 40
```

## 🎨 Design Features

- **Modern Color Scheme**: Purple gradient (#667eea to #764ba2) with professional accents
- **Responsive Grid System**: Works seamlessly on desktop, tablet, and mobile
- **Card-based Layout**: Attractive card designs with shadows and hover effects
- **Bootstrap Integration**: Built-in responsive utilities and components
- **Smooth Animations**: Fade-in, slide-up effects for better UX
- **Input Validation**: Real-time form validation with error messages
- **Loading States**: Spinner indicators for async operations

## 🔄 Color Palette

- **Primary**: #667eea (Purple) and #764ba2 (Dark Purple)
- **Success**: #10b981 (Green)
- **Info**: #3b82f6 (Blue)
- **Warning**: #f59e0b (Orange)
- **Danger**: #ef4444 (Red)
- **Background**: #f8fafc (Light Gray)
- **Text**: #1e293b (Dark Gray)

## 📱 Responsive Breakpoints

- **Desktop**: 100% width with sidebar fixed
- **Tablet** (≤ 768px): Adjusted layout and font sizes
- **Mobile** (≤ 480px): Single column layout with touch-friendly buttons

## 🚀 Usage

1. **Login**: Use provided credentials to access the system
2. **View Dashboard**: See overview with summary cards and top performers
3. **Add Student**: Fill the form with student details and submit
4. **View All Students**: Check the Student Details page for all records
5. **Search**: Find specific students by roll number
6. **Check Profile**: View system information and features

## 🔧 Backend API Response Examples

### Add Student
```json
POST /student/add
{
  "roll": "CS001",
  "name": "John Doe",
  "cgpa": 8.5,
  "att": 95,
  "c": 9,
  "java": 8,
  "python": 7
}
Response: "Added"
```

### Get Statistics
```json
GET /student/stats
Response: {
  "total": 10,
  "excellent": 3,
  "average": 2,
  "needsImprovement": 1,
  "good": 4
}
```

### Search Student
```json
GET /student/CS001
Response: [{
  "roll": "CS001",
  "name": "John Doe",
  "cgpa": 8.5,
  "att": 95,
  "c": 9,
  "java": 8,
  "python": 7,
  "academic": 72.5,
  "technical": 146.67,
  "overall": 109.58,
  "performance": "Excellent"
}]
```

## 🐛 Troubleshooting

### Database Connection Error
- Verify MySQL is running
- Check credentials in `backend/db.js`
- Ensure `kas_db` database exists

### CORS Error
- Make sure backend is running on port 5000
- Check CORS configuration in `server.js`

### Component Not Displaying
- Clear browser cache
- Restart frontend development server
- Check browser console for errors

## 📝 Notes

- Default login credentials are for demo purposes only
- Scores are calculated on the backend before storing
- All data is persisted in MySQL
- The system uses local storage for user session management

## 📄 License

This project is for educational purposes.

## 🤝 Contributing

Feel free to extend this system with additional features like:
- User authentication with JWT
- Export reports to PDF
- Email notifications
- Advanced analytics and charts
- Role-based access control

## 📧 Support

For issues or questions, please check the console for error messages and ensure all dependencies are properly installed.

---

**Version**: 1.0.0  
**Last Updated**: February 2026
"# Knowledge-Analytic-System" 
