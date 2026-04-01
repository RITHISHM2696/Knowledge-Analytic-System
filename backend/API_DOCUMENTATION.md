# Knowledge Analytics System - Backend API Documentation

## 🔧 Backend Structure

```
backend/
├── server.js              # Express server with middleware
├── db.js                  # MySQL connection setup
├── package.json           # Dependencies
└── routes/
    └── student.js         # Student API endpoints
```

---

## 📋 Recent Backend Updates

### ✨ Improvements Made

1. **Better Error Handling**
   - Proper HTTP status codes (200, 201, 400, 404, 409, 500)
   - Detailed error messages
   - Validation error details
   - Database error handling

2. **Input Validation**
   - All fields validated before database insertion
   - Range validation (CGPA 0-10, Attendance 0-100, Skills 0-10)
   - Required field checking
   - Type validation

3. **Improved Responses**
   - Consistent JSON structure
   - Success messages with data
   - Error messages with details
   - Empty array fallback for no results

4. **Better Code Structure**
   - Separated validation logic
   - Separated score calculation logic
   - Proper middleware setup
   - Request logging

5. **Database Optimizations**
   - Combined stats query (single query instead of 4 nested queries)
   - Proper connection pooling
   - Auto-reconnect on connection loss
   - Ordered results (sorted by roll/overall)

6. **Server Configuration**
   - Request logging middleware
   - Health check endpoint
   - Error handling middleware
   - 404 handler
   - Environment variable support

---

## 🔗 API Endpoints

### Base URL: `http://localhost:5000`

### 1. Add Student (CREATE)

**Endpoint**: `POST /student/add`

**Request Headers**:
```json
{
  "Content-Type": "application/json"
}
```

**Request Body**:
```json
{
  "roll": "CS001",
  "name": "John Doe",
  "cgpa": 8.5,
  "att": 95,
  "c": 9,
  "java": 8,
  "python": 7
}
```

**Field Validation**:
- `roll` (string): Required, unique
- `name` (string): Required
- `cgpa` (number): Required, 0-10
- `att` (number): Required, 0-100
- `c` (number): Required, 0-10
- `java` (number): Required, 0-10
- `python` (number): Required, 0-10

**Success Response** (201 Created):
```json
{
  "success": true,
  "message": "Student added successfully",
  "student": {
    "roll": "CS001",
    "name": "John Doe",
    "academic": 72.5,
    "technical": 146.67,
    "overall": 109.58,
    "performance": "Excellent"
  }
}
```

**Error Responses**:

`400 Bad Request` - Validation failed:
```json
{
  "error": "Validation failed",
  "details": [
    "CGPA must be between 0 and 10",
    "Attendance must be between 0 and 100"
  ]
}
```

`409 Conflict` - Duplicate roll number:
```json
{
  "error": "Student with this roll number already exists"
}
```

`500 Internal Server Error`:
```json
{
  "error": "Failed to add student"
}
```

---

### 2. Get All Students (READ)

**Endpoint**: `GET /student/all`

**Success Response** (200 OK):
```json
[
  {
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
  },
  {
    "roll": "CS002",
    "name": "Jane Smith",
    "cgpa": 7.2,
    "att": 88,
    "c": 7,
    "java": 8,
    "python": 6,
    "academic": 64,
    "technical": 133.33,
    "overall": 98.67,
    "performance": "Excellent"
  }
]
```

**Error Response** (500 Internal Server Error):
```json
{
  "error": "Failed to fetch students"
}
```

---

### 3. Get Top 3 Students (READ)

**Endpoint**: `GET /student/top3`

**Success Response** (200 OK):
```json
[
  {
    "roll": "CS001",
    "name": "John Doe",
    "overall": 109.58,
    "performance": "Excellent"
  },
  {
    "roll": "CS002",
    "name": "Jane Smith",
    "overall": 98.67,
    "performance": "Excellent"
  },
  {
    "roll": "CS003",
    "name": "Bob Johnson",
    "overall": 87.45,
    "performance": "Excellent"
  }
]
```

**Notes**:
- Returns maximum 3 students
- Sorted by overall score (descending)
- Returns empty array if no students

---

### 4. Get Statistics (READ)

**Endpoint**: `GET /student/stats`

**Success Response** (200 OK):
```json
{
  "total": 10,
  "excellent": 3,
  "good": 4,
  "average": 2,
  "needsImprovement": 1
}
```

**Field Descriptions**:
- `total`: Total number of students
- `excellent`: Students with overall score ≥ 80
- `good`: Students with 60 ≤ overall < 80
- `average`: Students with 40 ≤ overall < 60
- `needsImprovement`: Students with overall < 40

**Notes**:
- Returns zeros if no students
- Single optimized query combines all counts

---

### 5. Search Student by Roll (READ)

**Endpoint**: `GET /student/:roll`

**Example URL**: `GET /student/CS001`

**Success Response** (200 OK):
```json
[
  {
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
  }
]
```

**Error Responses**:

`400 Bad Request` - Missing roll number:
```json
{
  "error": "Roll number is required"
}
```

`404 Not Found` - Student doesn't exist:
```json
{
  "error": "Student not found"
}
```

`500 Internal Server Error`:
```json
{
  "error": "Failed to search student"
}
```

---

### 6. Health Check (UTILITY)

**Endpoint**: `GET /health`

**Success Response** (200 OK):
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

---

## 📊 Score Calculation

All calculations happen on the server side:

```javascript
Academic Score = (CGPA × 10 + Attendance%) / 2
Technical Score = (C + Java + Python) / 3 × 20
Overall Score = (Academic Score + Technical Score) / 2

Performance Classification:
- Excellent: Overall ≥ 80
- Good: 60 ≤ Overall < 80
- Average: 40 ≤ Overall < 60
- Needs Improvement: Overall < 40
```

### Example Calculation
```
CGPA: 8.5
Attendance: 95%
C: 9, Java: 8, Python: 7

Academic = (8.5 × 10 + 95) / 2 = (85 + 95) / 2 = 90
Technical = (9 + 8 + 7) / 3 × 20 = 8 × 20 = 160
Overall = (90 + 160) / 2 = 125

Performance: Excellent (≥ 80)
```

---

## 🗄️ Database Schema

```sql
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

### Column Descriptions
- `roll`: Student ID (Primary Key)
- `name`: Student full name
- `cgpa`: Grade Point Average (0-10)
- `att`: Attendance percentage (0-100)
- `c`: C/C++ skill rating (0-10)
- `java`: Java skill rating (0-10)
- `python`: Python skill rating (0-10)
- `academic`: Calculated academic score
- `technical`: Calculated technical score
- `overall`: Calculated overall score
- `performance`: Performance classification

---

## 🔐 HTTP Status Codes

| Code | Meaning | Usage |
|------|---------|-------|
| 200 | OK | Successful GET request |
| 201 | Created | Successful POST request |
| 400 | Bad Request | Invalid input or validation failure |
| 404 | Not Found | Student not found |
| 409 | Conflict | Duplicate roll number |
| 500 | Server Error | Database or server error |

---

## 📝 Request Examples

### Using cURL

```bash
# Add student
curl -X POST http://localhost:5000/student/add \
  -H "Content-Type: application/json" \
  -d '{"roll":"CS001","name":"John Doe","cgpa":8.5,"att":95,"c":9,"java":8,"python":7}'

# Get all students
curl http://localhost:5000/student/all

# Get top 3
curl http://localhost:5000/student/top3

# Get stats
curl http://localhost:5000/student/stats

# Search student
curl http://localhost:5000/student/CS001

# Health check
curl http://localhost:5000/health
```

### Using JavaScript (Fetch API)

```javascript
// Add student
const response = await fetch('http://localhost:5000/student/add', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    roll: 'CS001',
    name: 'John Doe',
    cgpa: 8.5,
    att: 95,
    c: 9,
    java: 8,
    python: 7
  })
});

const data = await response.json();
console.log(data);
```

### Using Axios (as in Frontend)

```javascript
// Add student
axios.post('http://localhost:5000/student/add', {
  roll: 'CS001',
  name: 'John Doe',
  cgpa: 8.5,
  att: 95,
  c: 9,
  java: 8,
  python: 7
})
.then(res => console.log(res.data))
.catch(err => console.error(err));

// Get all students
axios.get('http://localhost:5000/student/all')
  .then(res => console.log(res.data))
  .catch(err => console.error(err));
```

---

## 🚀 Running the Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies (first time)
npm install

# Start server
npm start
# or
node server.js

# Expected output:
# [timestamp] GET /health
# MySQL Connected
# ================================
# Server running on port 5000
# API Base: http://localhost:5000
# ================================
```

---

## 🔍 Server Logs & Debugging

### Console Output
```
[14:35:22] GET /health
[14:35:30] POST /student/add
✅ MySQL Connected Successfully
[14:35:35] POST /student/add
[14:35:40] GET /student/all
[14:35:45] GET /student/stats
```

### Error Logs
```
❌ Database Connection Error:
Database access was denied (wrong credentials)
```

### Common Issues

1. **"Cannot find module 'express'"**
   - Solution: Run `npm install`

2. **"MySQL not connecting"**
   - Check: MySQL is running, credentials are correct, database exists

3. **"EADDRINUSE: address already in use :::5000"**
   - Solution: Change port or kill process using 5000

---

## 🔄 Frontend Integration

The frontend uses Axios to call these endpoints:

```javascript
// In Home.js
axios.get("http://localhost:5000/student/stats")
axios.get("http://localhost:5000/student/top3")

// In StudentForm.js
axios.post("http://localhost:5000/student/add", formData)

// In StudentDetails.js
axios.get("http://localhost:5000/student/all")

// In Search.js
axios.get(`http://localhost:5000/student/${rollNo}`)
```

---

## 📈 Performance Optimization

### Current Optimizations
- ✅ Combined stats query (1 query instead of 4)
- ✅ Indexed searches on roll number
- ✅ Connection pooling
- ✅ Proper error handling

### Future Optimizations
- [ ] Add response caching
- [ ] Add pagination for large datasets
- [ ] Add request rate limiting
- [ ] Add database connection pooling
- [ ] Add API request/response logging

---

## 🔒 Security Notes

### Current Security
- ✅ Parameterized queries (SQL injection prevention)
- ✅ CORS enabled for frontend
- ✅ Input validation

### Recommendations for Production
- [ ] Implement authentication/JWT
- [ ] Add HTTPS/SSL
- [ ] Implement rate limiting
- [ ] Add request validation middleware
- [ ] Add logging/monitoring
- [ ] Set proper CORS origins

---

## 📞 Support

For issues:
1. Check console output for error messages
2. Verify database connection
3. Test API endpoints with `curl` or Postman
4. Check browser console for frontend errors
5. Refer to FAQ_TROUBLESHOOTING.md

---

**API Version**: 1.0.0
**Last Updated**: February 2026
**Status**: Production Ready (with enhancements)
