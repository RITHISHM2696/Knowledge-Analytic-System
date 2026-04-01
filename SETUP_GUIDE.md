# Knowledge Analytics System - Setup & Installation Guide

## 🎯 Quick Start (5 minutes)

### Prerequisites Check
- [ ] Node.js installed (`node -v` should show v14+)
- [ ] MySQL installed (`mysql --version` should work)
- [ ] MySQL running (check MySQL Services)

### Step 1: Setup Database (2 mins)

```bash
# Open MySQL Command Line or Workbench
mysql -u root -p

# Enter your MySQL password when prompted
# Then run these commands:

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

# Exit MySQL
EXIT;
```

### Step 2: Start Backend (1 min)

```bash
cd backend
npm install
node server.js
```

**Expected Output:**
```
MySQL Connected
Server running
```

Keep this terminal open!

### Step 3: Start Frontend (1 min)

Open a new terminal:

```bash
cd frontend/kas-app
npm install
npm start
```

**Browser will automatically open** at http://localhost:3000

### Step 4: Login (1 min)

```
Email: admin@gmail.com
Password: 1234
```

✅ **You're done! Enjoy the KAS!**

---

## 🔧 Detailed Setup Instructions

### Complete Backend Setup

#### 1. Navigate to Backend Directory
```bash
cd backend
```

#### 2. Install Dependencies
```bash
npm install
```

This will install:
- express (web framework)
- cors (cross-origin support)
- body-parser (JSON parsing)
- mysql2 (database driver)

#### 3. Configure Database Connection

Open `backend/db.js` and update if needed:

```javascript
const db = mysql.createConnection({
  host: "localhost",      // Change if MySQL on different host
  user: "root",          // Your MySQL username
  password: "royalenfield",  // Your MySQL password
  database: "kas_db"     // Database name
});
```

#### 4. Start the Server

```bash
node server.js
```

You should see:
```
MySQL Connected
Server running
```

The server runs on: http://localhost:5000

---

### Complete Frontend Setup

#### 1. Navigate to Frontend Directory
```bash
cd frontend/kas-app
```

#### 2. Install Dependencies
```bash
npm install
```

This will install all React dependencies including Bootstrap.

#### 3. Start Development Server
```bash
npm start
```

The app will:
- Compile automatically
- Open browser at http://localhost:3000
- Auto-reload on code changes

---

## 📋 Verifying Installation

### Check Backend APIs

Open a new terminal and test:

```bash
# Test if backend is running
curl http://localhost:5000/student/all

# Expected response: [] (empty array)
```

Or open browser to: http://localhost:5000/student/all

### Check Frontend

Navigate to http://localhost:3000

You should see the login page with:
- KAS title with graph icon
- Email input
- Password input
- Login button

---

## 🔑 First Time Usage

### 1. Login
- Email: `admin@gmail.com`
- Password: `1234`

### 2. Add Your First Student
- Click "Add Student" in sidebar
- Fill in the form:
  - Roll: CS001
  - Name: John Doe
  - CGPA: 8.5
  - Attendance: 95
  - C: 9, Java: 8, Python: 7
- Click "Add Student" button
- You should see success message

### 3. View Dashboard
- Click "Home" to see:
  - Student count
  - Top 3 performers card
  - Summary statistics

### 4. View All Students
- Click "Student Details"
- See table with all students
- Try the search filter

### 5. Search Student
- Click "Search Student"
- Enter roll number: CS001
- See detailed student information

---

## 🐛 Troubleshooting

### Issue: "MySQL Connected" doesn't appear

**Solution:**
1. Check MySQL is running:
   - Windows: Services > MySQL
   - Mac: System Preferences > MySQL
   - Linux: `sudo systemctl status mysql`

2. Verify credentials in `backend/db.js`

3. Check database exists:
   ```bash
   mysql -u root -p kas_db
   ```

### Issue: Backend running but frontend shows error

**Solution:**
1. Check if port 5000 is available:
   ```bash
   netstat -ano | findstr :5000  # Windows
   lsof -i :5000                 # Mac/Linux
   ```

2. Kill process if needed:
   ```bash
   taskkill /PID <PID> /F        # Windows
   kill -9 <PID>                 # Mac/Linux
   ```

3. Restart backend

### Issue: Frontend shows blank page

**Solution:**
1. Check browser console (F12 > Console tab)
2. Clear browser cache (Ctrl+Shift+Del)
3. Hard refresh (Ctrl+F5)
4. Restart frontend: `npm start`

### Issue: Table not showing students

**Solution:**
1. Check if you added students in the form
2. Check browser Network tab (F12 > Network)
3. Restart backend and try again

### Issue: Form submission fails

**Solution:**
1. Check all fields are filled
2. Verify values are in correct ranges:
   - CGPA: 0-10
   - Attendance: 0-100
   - Skills (C, Java, Python): 0-10
3. Check backend console for errors
4. Check browser console (F12 > Console)

---

## 🚀 Production Deployment

### Before Deploying

1. Update credentials in `backend/db.js`
2. Set `NODE_ENV=production`
3. Create optimized build:
   ```bash
   cd frontend/kas-app
   npm run build
   ```

### Deploy Backend
- Use services like Heroku, AWS, DigitalOcean
- Set environment variables for database

### Deploy Frontend
- Upload `frontend/kas-app/build` folder to:
  - Vercel
  - Netlify
  - GitHub Pages
  - Any static host

---

## 📚 Learning Path

If you want to extend this system:

1. **Add User Roles**
   - Modify login to check roles
   - Add role-based access

2. **Add Charts/Graphs**
   - Install: `npm install chart.js react-chartjs-2`
   - Create bar, pie, line charts

3. **Add PDF Export**
   - Install: `npm install jspdf`
   - Export student reports

4. **Add Email Notifications**
   - Install: `npm install nodemailer`
   - Send alerts on performance

5. **Add Authentication**
   - Use JWT tokens
   - Secure API endpoints

---

## 📞 Getting Help

### Check Logs
- **Backend**: Check terminal running `node server.js`
- **Frontend**: Check browser console (F12)
- **Database**: Check MySQL error logs

### Common Commands
```bash
# Stop servers
Ctrl + C (in terminal)

# Restart backend
npm start (in backend folder)

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check port is available
netstat -ano | findstr :3000
netstat -ano | findstr :5000
```

---

## ✅ Checklist for Success

- [ ] MySQL installed and running
- [ ] Database `kas_db` created
- [ ] `students` table created
- [ ] Backend installed and running (port 5000)
- [ ] Frontend installed and running (port 3000)
- [ ] Can login with admin@gmail.com / 1234
- [ ] Can add a student
- [ ] Can view students table
- [ ] Can search students
- [ ] Can see dashboard with stats

**All checked? 🎉 You're ready to go!**

---

## 📞 Support Resources

- [React Documentation](https://react.dev)
- [Bootstrap Documentation](https://getbootstrap.com/docs)
- [Node.js Documentation](https://nodejs.org/docs)
- [MySQL Documentation](https://dev.mysql.com/doc)
- [Express.js Guide](https://expressjs.com)

---

**Version**: 1.0.0
**Last Updated**: February 2026
