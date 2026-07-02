const express = require('express');
const chalk = require('chalk');

// 1. יצירת האפליקציה תחילה
const app = express();
const PORT = 5000; 

// 2. הגדרת ה-Middleware לקריאת JSON
app.use(express.json());

// ייבוא הקבצים של הקורסים והתלמידים
const coursesRouter = require('./courses');
const studentsRouter = require('./students');

// 3. הגדרת הנתיבים
app.get('/', (req, res) => {
    res.json({
        status: "success",
        message: "The server is running beautifully",
        description: "This is a school management API for courses and students"
    });
});

app.use('/courses', coursesRouter);
app.use('/students', studentsRouter);

// תפיסת כל נתיב לא מוכר והחזרת שגיאה בפורמט JSON
app.use((req, res) => {
    res.status(404).json({
        status: "error",
        message: "Resource not found"
    });
});

// הפעלת השרת
app.listen(PORT, () => {
    console.log(chalk.green(`Server is running beautifully on port ${PORT}`));
});

// השארת לולאת האירועים פעילה עבור המחשב שלך
setInterval(() => {}, 600000);