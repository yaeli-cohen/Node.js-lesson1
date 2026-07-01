const express = require('express');
const chalk = require('chalk'); 
const app = express();

// שימוש בפורט דינמי או 3000 כברירת מחדל
const PORT = process.env.PORT || 3000;

const courses = [
    { id: 101, name: "מבוא ל-Node.js", description: "קורס בסיסי ללימוד פיתוח צד שרת וסביבת Node.js" },
    { id: 102, name: "פיתוח עם Express", description: "למידת יצירת שרתים, ניתובים ונקודות קצה (API)" },
    { id: 103, name: "בסיסי נתונים ו-SQL", description: "אינטגרציה של מסדי נתונים עם אפליקציות Backend" }
];

// שינוי הכתובת לפורמט של API
app.get('/api/courses', (req, res) => {
    try {
        console.log(chalk.bold.yellow('\n--- התקבלה בקשה חדשה! מציג את רשימת הקורסים: ---'));

        courses.forEach(course => {
            console.log(
                chalk.cyan(`[ID: ${course.id}] `) + 
                chalk.green.bold(`שם: ${course.name}`) + 
                chalk.white(` - תיאור: ${course.description}`)
            );
        });

        res.json(courses);
    } catch (error) {
        // טיפול בסיסי בשגיאות במקרה ומשהו ייכשל
        console.error(chalk.red('שגיאה בעיבוד הבקשה:', error));
        res.status(500).json({ error: 'שגיאת שרת פנימית' });
    }
});

app.listen(PORT, () => {
    console.log(chalk.magenta.bold(`\n השרת רץ ומקשיב בהצלחה בכתובת: http://localhost:${PORT}/api/courses`));
});