const validateEnrollmentInput = (req, res, next) => {
    const studentId = parseInt(req.body.studentId);
    const courseId = parseInt(req.body.courseId);

    // בדיקה שהשדות קיימים והם מספרים תקינים (ולא NaN או 0)
    if (!studentId || !courseId || isNaN(studentId) || isNaN(courseId)) {
        return res.status(400).json({ error: "studentId and courseId are required and must be valid numbers" });
    }

    // אם הכל תקין, ממשיכים לקונטרולר
    next();
};

module.exports = { validateEnrollmentInput };