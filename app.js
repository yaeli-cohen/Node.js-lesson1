const express = require('express');
const chalk = require('chalk');

const coursesRoutes = require('./routes/courses.routes');
const studentsRoutes = require('./routes/students.routes');
const enrollmentsRoutes = require('./routes/enrollments.routes'); // הראוטר החדש

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

// שימוש בראוטרים
app.use('/courses', coursesRoutes);
app.use('/students', studentsRoutes);
app.use('/enrollments', enrollmentsRoutes); // עדכון הראוט בהתאם לשם הישות

app.use((req, res) => {
    res.status(404).json({
        error: "Not Found",
        message: `The requested path ${req.originalUrl} does not exist.`
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error", message: err.message });
});

// ... כל הראוטרים והגדרות השרת הקודמות ...

// טיפול גלובלי בנתיבים לא קיימים (404)
app.use((req, res) => {
    res.status(404).json({
        error: "Not Found",
        message: `The requested path ${req.originalUrl} does not exist.`
    });
});

// שכבת טיפול בשגיאות גלובליות (קריסות/באגים לא צפויים)
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
