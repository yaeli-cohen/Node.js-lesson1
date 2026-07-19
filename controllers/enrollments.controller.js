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
    const studentId = parseInt(req.body.studentId);
    const courseId = parseInt(req.body.courseId);
    const { date } = req.body;

    if (!studentId || !courseId) {
        return res.status(400).json({ error: "studentId and courseId are required" });
    }

    const result = enrollmentsService.create(studentId, courseId, date);
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

    if (!studentId || !courseId) {
        return res.status(400).json({ error: "studentId and courseId are required" });
    }

    const result = enrollmentsService.update(id, studentId, courseId, date);
    
    if (!result) {
        return res.status(404).json({ error: "Enrollment not found" });
    }

    // אם השירות החזיר אובייקט עם שגיאה לוגית
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
