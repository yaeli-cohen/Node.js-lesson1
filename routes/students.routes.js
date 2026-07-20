const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/students.controller');

const { validateStudentInput } = require('../middlewares/students.middleware');

router.get('/', studentsController.getAllStudents);
router.post('/', validateStudentInput, studentsController.createStudent);
router.get('/:id', studentsController.getStudentById);
router.put('/:id', validateStudentInput, studentsController.updateStudent);
router.delete('/:id', studentsController.deleteStudent);

module.exports = router;