const express = require('express');
const chalk = require('chalk');

const coursesRoutes = require('./routes/courses.routes');
const studentsRoutes = require('./routes/students.routes');
const enrollmentsRoutes = require('./routes/enrollments.routes'); 

// 1. ייבוא מידלוור האימות הגלובלי (בהנחה ששמרת אותו בתיקיית middlewares)
const { authenticateApiKey } = require('./middlewares/auth.middleware');

const app = express();
const PORT = 5000; 

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        status: "success",
        message: "School Management API is running cleanly",
        version: "1.0.0"
    });
});

// 2. 🌟 הזרקת מידלוור האימות כאן 🌟
// מנקודה זו והלאה, כל בקשה שתגיע לנתיבים הבאים תהיה חייבת להציג את ה-auth-key
app.use(authenticateApiKey);

// שימוש בראוטרים המאובטחים
app.use('/courses', coursesRoutes);
app.use('/students', studentsRoutes);
app.use('/enrollments', enrollmentsRoutes); 

// טיפול גלובלי בנתיבים לא קיימים (404) - ניקינו את הכפילות
app.use((req, res) => {
    res.status(404).json({
        error: "Not Found",
        message: `The requested path ${req.originalUrl} does not exist.`
    });
});

// שכבת טיפול בשגיאות גלובליות (500)
app.use((err, req, res, next) => {
    console.error(err.stack); // הדפסת השגיאה המלאה בטרמינל לצרכי דיבאגינג
    res.status(500).json({ 
        error: "Internal Server Error", 
        message: "Something went wrong inside the server." 
    });
});

// הפעלת השרת
app.listen(PORT, () => {
    console.log(chalk.green(`Server is running beautifully on port ${PORT}`));
});