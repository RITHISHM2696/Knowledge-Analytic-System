# Knowledge Analytics System - FAQ & Troubleshooting

## ❓ Frequently Asked Questions

### General Questions

**Q: What is KAS?**
A: Knowledge Analytics System is a web-based platform for tracking and analyzing student performance using academic metrics and technical skill assessments.

**Q: Do I need to modify the code to use it?**
A: No! The system is ready to use out of the box. Just follow the setup guide and you're good to go.

**Q: Can I add more users?**
A: Currently, it's an admin-only system. You can extend it with user authentication by implementing JWT tokens and a users table.

**Q: How is the overall score calculated?**
A: 
- Academic Score = (CGPA × 10 + Attendance) / 2
- Technical Score = (C + Java + Python) / 3 × 20
- Overall Score = (Academic + Technical) / 2

**Q: Can I change the grading thresholds?**
A: Yes! In `backend/routes/student.js`, find the performance classification code and adjust the thresholds (currently 80, 60, 40).

**Q: Is my data automatically saved?**
A: Yes! All data is stored in MySQL database and persists even after closing the application.

---

## 🐛 Common Issues & Solutions

### Login Issues

**Q: I can't log in even with correct credentials**

A: Try these solutions:
1. Clear browser cache (Ctrl+Shift+Del)
2. Hard refresh the page (Ctrl+F5)
3. Check if frontend is running (`npm start` output shows localhost:3000)
4. Check browser console (F12) for errors
5. Verify credentials: `admin@gmail.com` / `1234`

**Q: "Network error" when clicking Login**

A: The backend may not be running:
1. Check if backend terminal shows "Server running"
2. Test backend: Open `http://localhost:5000/student/all` in browser
3. If not accessible, restart backend: Stop (Ctrl+C) and run `node server.js` again

---

### Database Issues

**Q: "MySQL Connected" doesn't appear in backend terminal**

A: Database connection failed:
1. Verify MySQL is running:
   - Windows: Services > MySQL → Automatic
   - Mac: System Preferences > MySQL → Start
   - Linux: `sudo systemctl start mysql`

2. Check credentials in `backend/db.js`:
   ```javascript
   host: "localhost",
   user: "root",        // Your username
   password: "xyz",     // Your password
   database: "kas_db"
   ```

3. Verify database exists:
   ```bash
   mysql -u root -p
   SHOW DATABASES;  // Should show kas_db
   EXIT;
   ```

**Q: "Table doesn't exist" error**

A: The students table wasn't created:
1. Connect to MySQL: `mysql -u root -p kas_db`
2. Create table:
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
3. Verify: `DESCRIBE students;`

**Q: "Access denied for user 'root'@'localhost'"**

A: Wrong password in database config:
1. Find your actual MySQL root password
2. Update `backend/db.js` with correct password
3. Or reset MySQL root password (varies by OS)

---

### Frontend Issues

**Q: Page shows blank white screen**

A: React didn't load:
1. Check browser console (F12 > Console tab)
2. Look for red error messages
3. Try hard refresh (Ctrl+F5)
4. Clear cache and restart: Stop `npm start` and run again
5. Delete `node_modules` and reinstall:
   ```bash
   cd frontend/kas-app
   rm -rf node_modules package-lock.json
   npm install
   npm start
   ```

**Q: "Cannot GET /" error**

A: Frontend server didn't start:
1. Verify you're in correct directory: `cd frontend/kas-app`
2. Check if dependencies are installed: `npm list react`
3. Delete `node_modules` and reinstall
4. Check port 3000 is available: `netstat -ano | findstr :3000`

**Q: Components not loading / Page shows errors**

A: Component import issues:
1. Check file paths in imports
2. Verify all files exist in `src/components`
3. Check file names match imports (case-sensitive!)
4. Look at browser console for specific errors
5. Restart development server

---

### Form & Data Issues

**Q: Form submission fails silently**

A: Backend may have issues:
1. Check all fields are filled (required fields marked with *)
2. Check value ranges:
   - CGPA: 0-10
   - Attendance: 0-100
   - Technical skills: 0-10
3. Open browser Network tab (F12) and check API response
4. Check backend console for error messages

**Q: Added students don't appear in table**

A: Data might not be fetched:
1. Hard refresh page (Ctrl+F5)
2. Check if student was actually added (check backend console)
3. Clear browser cache
4. Restart frontend `npm start`
5. In database, verify: `SELECT * FROM students;`

**Q: Search returns no results**

A: Roll number doesn't exist:
1. Add students first via "Add Student" form
2. Use exact roll number (case-sensitive)
3. Check Student Details to see available roll numbers
4. Ensure no typos in search input

---

### Performance Issues

**Q: System is running slowly**

A: Try these optimizations:
1. Close unnecessary browser tabs
2. Check if backend/frontend consuming high CPU:
   - Windows: Task Manager
   - Mac: Activity Monitor
   - Linux: `top`
3. Restart both servers:
   ```bash
   # Terminal 1: Stop backend (Ctrl+C)
   node server.js   # Restart
   
   # Terminal 2: Stop frontend (Ctrl+C)
   npm start        # Restart
   ```
4. Restart MySQL service

**Q: Large dataset (many students) is slow**

A: Optimize database and frontend:
1. In backend, add pagination:
   ```javascript
   // Limit results
   db.query("SELECT * FROM students LIMIT 100", ...)
   ```
2. Implement lazy loading in frontend
3. Add database indexes on frequently searched columns

---

### Port Issues

**Q: "Port 3000 is already in use"**

A: Another application is using port 3000:
```bash
# Find process using port 3000
netstat -ano | findstr :3000  # Windows
lsof -i :3000                 # Mac/Linux

# Kill the process
taskkill /PID <PID> /F        # Windows
kill -9 <PID>                 # Mac/Linux

# Or use different port
PORT=3001 npm start
```

**Q: "Port 5000 is already in use"**

A: Another application is using port 5000:
```bash
# Find process
netstat -ano | findstr :5000
lsof -i :5000

# Kill it
taskkill /PID <PID> /F
kill -9 <PID>

# Or change port in backend/server.js
app.listen(5001, ...)  // Use different port
# Then update frontend API URL
```

---

## ⚠️ Warnings to Avoid

### Common Mistakes

1. **Forgetting to create database table**
   - Solution: Run CREATE TABLE statement before starting backend

2. **Updating API URL wrong in frontend**
   - Always use: `http://localhost:5000`
   - Currently hardcoded in API calls

3. **Changing database credentials but not updating code**
   - Remember to update `backend/db.js` with new credentials

4. **Running both servers in same terminal**
   - Use 2+ terminals: One for backend, one for frontend

5. **Ignoring error messages**
   - Always check browser console and backend terminal for errors

---

## 🔧 Advanced Troubleshooting

### Enable Debug Mode

**Frontend**
```bash
# Add this to see detailed logs
REACT_APP_DEBUG=true npm start
```

**Backend**
```bash
# Add logging to db.js
console.log("Executing query:", query);
```

### Check API Directly

Test API endpoints without frontend:
```bash
# Get all students
curl http://localhost:5000/student/all

# Get statistics
curl http://localhost:5000/student/stats

# Search student
curl http://localhost:5000/student/CS001
```

### Database Debugging

```bash
# Connect to database
mysql -u root -p kas_db

# View all data
SELECT * FROM students;

# Check table structure
DESCRIBE students;

# Count records
SELECT COUNT(*) as total FROM students;

# Find by performance
SELECT * FROM students WHERE performance='Excellent';
```

### Clear Everything & Start Fresh

If nothing works:
```bash
# Backend
cd backend
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
node server.js

# Frontend (new terminal)
cd frontend/kas-app
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
npm start

# Database (new terminal)
mysql -u root -p
DROP DATABASE kas_db;
CREATE DATABASE kas_db;
USE kas_db;
CREATE TABLE students(...);
```

---

## 📞 Getting Help

### Check These First
1. Browser console (F12 > Console)
2. Backend terminal output
3. Full error messages (don't ignore them!)
4. Make sure both servers are running

### When Reporting Issues
Include:
- Error message (complete, not partial)
- What you were doing when it happened
- Terminal output
- Browser console errors (screenshot)
- Steps to reproduce

### Resources
- [React Error Boundaries](https://reactjs.org/docs/error-boundaries.html)
- [Express.js Debugging](https://expressjs.com/en/guide/debugging.html)
- [MySQL Error Reference](https://dev.mysql.com/doc/mysql-errors/8.0/en/)

---

## ✅ Quick Health Check

Run this checklist if unsure:

```bash
# Is MySQL running?
mysql -u root -p -e "SELECT 1"

# Does database exist?
mysql -u root -p -e "SHOW DATABASES" | grep kas_db

# Is table created?
mysql -u root -p kas_db -e "DESCRIBE students"

# Is backend running?
curl http://localhost:5000/student/all

# Is frontend accessible?
# Open http://localhost:3000 in browser

# Can you login?
# Use admin@gmail.com / 1234
```

If all these work, system is healthy! ✨

---

**Last Updated**: February 2026
**Version**: 1.0.0
