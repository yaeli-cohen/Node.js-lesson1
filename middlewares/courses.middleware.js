const validateCourseInput = (req, res, next) => {
    const { name, hours } = req.body;

    // בדיקה שהשדות קיימים ואינם ריקים
    if (!name || !hours || name.trim() === '') {
        return res.status(400).json({ error: "Name and hours are required fields" });
    }

    // בדיקה שמספר השעות הוא מספר חיובי תקין
    if (typeof hours !== 'number' || hours <= 0) {
        return res.status(400).json({ error: "Hours must be a positive number" });
    }

    // הכל תקין? עוברים לפונקציה הבאה (לקונטרולר)
    next();
};

module.exports = { validateCourseInput };