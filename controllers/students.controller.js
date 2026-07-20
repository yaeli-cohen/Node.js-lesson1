const studentsService = require('../services/students.service');

const getAllStudents = (req, res) => {
    res.status(200).json(studentsService.getAll());
};

const getStudentById = (req, res) => {
    const id = parseInt(req.params.id);
    const student = studentsService.getById(id);
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.status(200).json(student);
};

const createStudent = (req, res) => {
    // אין צורך בבדיקת if (!name || !email) - המידלוור כבר וידא שהם קיימים!
    const { name, email } = req.body;
    const newStudent = studentsService.create(name, email);
    res.status(201).json(newStudent);
};

const updateStudent = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body; // המידע כאן כבר מאומת ובטוח לשימוש
    
    const updatedStudent = studentsService.update(id, name, email);
    if (!updatedStudent) return res.status(404).json({ error: "Student not found" });
    res.status(200).json(updatedStudent);
};

const deleteStudent = (req, res) => {
    const id = parseInt(req.params.id);
    const isDeleted = studentsService.remove(id);
    if (!isDeleted) return res.status(404).json({ error: "Student not found" });
    res.status(200).json({ message: "Student deleted successfully" });
};

module.exports = { getAllStudents, getStudentById, createStudent, updateStudent, deleteStudent };