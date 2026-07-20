const enrollmentsService = require('../services/enrollments.service');

const getAllEnrollments = (req, res) => {
    res.status(200).json(enrollmentsService.getAll());
};

const getEnrollmentById = (req, res) => {
    const id = parseInt(req.params.id);
    const enrollment = enrollmentsService.getById(id);
    if (!enrollment) return res.status(404).json({ error: "Enrollment not found" });
    res.status(200).json(enrollment);
};

const createEnrollment = (req, res) => {
    // הנתונים כבר עברו סינון ראשוני במידלוור
    const studentId = parseInt(req.body.studentId);
    const courseId = parseInt(req.body.courseId);
    const { date } = req.body;

    const result = enrollmentsService.create(studentId, courseId, date);
    
    // טיפול בשגיאה הלוגית שהסרביס מחזיר (אם הקורס או הסטודנט לא קיימים)
    if (result.error) {
        return res.status(400).json({ error: result.error });
    }

    res.status(201).json(result);
};

const updateEnrollment = (req, res) => {
    const id = parseInt(req.params.id);
    const studentId = parseInt(req.body.studentId);
    const courseId = parseInt(req.body.courseId);
    const { date } = req.body;

    const result = enrollmentsService.update(id, studentId, courseId, date);
    
    // 404 - הרישום עצמו לא נמצא
    if (!result) {
        return res.status(404).json({ error: "Enrollment not found" });
    }

    // 400 - הרישום קיים, אך מנסים לעדכן אותו לסטודנט/קורס שלא קיימים
    if (result.error) {
        return res.status(400).json({ error: result.error });
    }

    res.status(200).json(result);
};

const deleteEnrollment = (req, res) => {
    const id = parseInt(req.params.id);
    const isDeleted = enrollmentsService.remove(id);
    if (!isDeleted) return res.status(404).json({ error: "Enrollment not found" });
    res.status(200).json({ message: "Enrollment deleted successfully" });
};

module.exports = { getAllEnrollments, getEnrollmentById, createEnrollment, updateEnrollment, deleteEnrollment };