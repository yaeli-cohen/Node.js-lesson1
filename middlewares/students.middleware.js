const validateStudentInput = (req, res, next) => {
    const { name, email } = req.body;

    // בדיקה ששני השדות קיימים ואינם ריקים
    if (!name || !email || name.trim() === '' || email.trim() === '') {
        return res.status(400).json({ error: "Name and email are required fields" });
    }

    // אופציונלי: בדיקה בסיסית שהאימייל מכיל שטרודל
    if (!email.includes('@')) {
        return res.status(400).json({ error: "Invalid email format" });
    }

    // אם הכל תקין, ממשיכים לפונקציה הבאה בשרשרת (הקונטרולר)
    next();
};

module.exports = { validateStudentInput };