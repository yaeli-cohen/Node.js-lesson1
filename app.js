// const express = require('express');
// const chalk = require('chalk');

// // 1. יצירת האפליקציה תחילה
// const app = express();
// const PORT = 5000; 

// // 2. הגדרת ה-Middleware לקריאת JSON
// app.use(express.json());

// // ייבוא הקבצים של הקורסים והתלמידים
// const coursesRouter = require('./courses');
// const studentsRouter = require('./students');

// // 3. הגדרת הנתיבים
// app.get('/', (req, res) => {
//     res.json({
//         status: "success",
//         message: "The server is running beautifully",
//         description: "This is a school management API for courses and students"
//     });
// });

// app.use('/courses', coursesRouter);
// app.use('/students', studentsRouter);

// // תפיסת כל נתיב לא מוכר והחזרת שגיאה בפורמט JSON
// app.use((req, res) => {
//     res.status(404).json({
//         status: "error",
//         message: "Resource not found"
//     });
// });

// // הפעלת השרת
// app.listen(PORT, () => {
//     console.log(chalk.green(`Server is running beautifully on port ${PORT}`));
// });

// // השארת לולאת האירועים פעילה עבור המחשב שלך
// setInterval(() => {}, 600000);

const express = require('express');
const chalk = require('chalk');

const app = express();
const PORT = 5000; 

// Middleware לקריאת JSON מגוף הבקשה (חובה ב-REST)
app.use(express.json());

// --- נתוני דמה (מערכים מקומיים) לניהול המשאבים ---
let courses = [
    { id: 1, name: "Node.js Basics", hours: 40 },
    { id: 2, name: "React Advanced", hours: 60 }
];

let students = [
    { id: 1, name: "Yossi Cohen", email: "yossi@email.com" },
    { id: 2, name: "Dana Levi", email: "dana@email.com" }
];

let registrations = [
    { id: 1, studentId: 1, courseId: 1, date: "2026-01-01" }
];

// --- נתיב ראשי (מידע על ה-API) ---
app.get('/', (req, res) => {
    res.json({
        status: "success",
        message: "School Management API is running",
        version: "1.0.0"
    });
});

// ==========================================
// 1. משאב: קורסים (Courses) - שמות עצם ברבים
// ==========================================

// GET /courses - קבלת כל הקורסים (סטטוס 200)
app.get('/courses', (req, res) => {
    res.status(200).json(courses);
});

// GET /courses/:id - קבלת קורס ספציפי (סטטוס 200 או 404)
app.get('/courses/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const course = courses.find(c => c.id === id);
    if (!course) {
        return res.status(404).json({ error: "Course not found" });
    }
    res.status(200).json(course);
});

// POST /courses - יצירת קורס חדש (סטטוס 201 Created משקף REST נכון)
app.post('/courses', (req, res) => {
    // בדיקת תקינות בסיסית (Validation) - REST דורש החזרת 400 אם המידע שגוי
    if (!req.body.name || !req.body.hours) {
        return res.status(400).json({ error: "Name and hours are required fields" });
    }

    const newCourse = {
        id: courses.length > 0 ? courses[courses.length - 1].id + 1 : 1,
        name: req.body.name,
        hours: req.body.hours
    };
    courses.push(newCourse);
    res.status(201).json(newCourse); // 201 מציין שהמשאב נוצר בהצלחה
});

// PUT /courses/:id - עדכון מלא של קורס קיים (סטטוס 200)
app.put('/courses/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const course = courses.find(c => c.id === id);
    if (!course) {
        return res.status(404).json({ error: "Course not found" });
    }

    if (!req.body.name || !req.body.hours) {
        return res.status(400).json({ error: "Name and hours are required for full update" });
    }

    course.name = req.body.name;
    course.hours = req.body.hours;
    res.status(200).json(course);
});

// DELETE /courses/:id - מחיקת קורס (סטטוס 200 או 204)
app.delete('/courses/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = courses.findIndex(c => c.id === id);
    if (index === -1) {
        return res.status(404).json({ error: "Course not found" });
    }

    courses.splice(index, 1);
    res.status(200).json({ message: "Course deleted successfully" });
});


// ==========================================
// 2. משאב: תלמידים (Students)
// ==========================================

app.get('/students', (req, res) => {
    res.status(200).json(students);
});

app.get('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(s => s.id === id);
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.status(200).json(student);
});

app.post('/students', (req, res) => {
    if (!req.body.name || !req.body.email) {
        return res.status(400).json({ error: "Name and email are required" });
    }
    const newStudent = {
        id: students.length > 0 ? students[students.length - 1].id + 1 : 1,
        name: req.body.name,
        email: req.body.email
    };
    students.push(newStudent);
    res.status(201).json(newStudent);
});

app.put('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(s => s.id === id);
    if (!student) return res.status(404).json({ error: "Student not found" });

    if (!req.body.name || !req.body.email) {
        return res.status(400).json({ error: "Name and email are required" });
    }

    student.name = req.body.name;
    student.email = req.body.email;
    res.status(200).json(student);
});

app.delete('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = students.findIndex(s => s.id === id);
    if (index === -1) return res.status(404).json({ error: "Student not found" });

    students.splice(index, 1);
    res.status(200).json({ message: "Student deleted successfully" });
});


// ==========================================
// 3. משאב: רישומים (Registrations)
// ==========================================

app.get('/registrations', (req, res) => {
    res.status(200).json(registrations);
});

app.get('/registrations/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const reg = registrations.find(r => r.id === id);
    if (!reg) return res.status(404).json({ error: "Registration not found" });
    res.status(200).json(reg);
});

app.post('/registrations', (req, res) => {
    const studentId = parseInt(req.body.studentId);
    const courseId = parseInt(req.body.courseId);

    if (!studentId || !courseId) {
        return res.status(400).json({ error: "studentId and courseId are required" });
    }

    // לוגיקת REST מתקדמת: בדיקה האם הסטודנט והקורס בכלל קיימים במערכת
    const studentExists = students.some(s => s.id === studentId);
    const courseExists = courses.some(c => c.id === courseId);

    if (!studentExists || !courseExists) {
        return res.status(400).json({ error: "Referenced Student or Course does not exist" });
    }

    const newReg = {
        id: registrations.length > 0 ? registrations[registrations.length - 1].id + 1 : 1,
        studentId,
        courseId,
        date: req.body.date || new Date().toISOString().split('T')[0]
    };
    registrations.push(newReg);
    res.status(201).json(newReg);
});

app.put('/registrations/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const reg = registrations.find(r => r.id === id);
    if (!reg) return res.status(404).json({ error: "Registration not found" });

    const studentId = parseInt(req.body.studentId);
    const courseId = parseInt(req.body.courseId);

    if (!studentId || !courseId) {
        return res.status(400).json({ error: "studentId and courseId are required" });
    }

    reg.studentId = studentId;
    reg.courseId = courseId;
    reg.date = req.body.date || reg.date;
    res.status(200).json(reg);
});

app.delete('/registrations/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = registrations.findIndex(r => r.id === id);
    if (index === -1) return res.status(404).json({ error: "Registration not found" });

    registrations.splice(index, 1);
    res.status(200).json({ message: "Registration deleted successfully" });
});


// --- טיפול גלובלי בנתיבים לא קיימים (404 בפורמט REST קלאסי) ---
app.use((req, res) => {
    res.status(404).json({
        error: "Not Found",
        message: `The requested path ${req.originalUrl} does not exist.`
    });
});

// הפעלת השרת
app.listen(PORT, () => {
    console.log(chalk.green(`Server is running beautifully on port ${PORT}`));
});


