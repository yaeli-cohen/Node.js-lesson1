const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/courses.controller');

const { validateCourseInput } = require('../middlewares/courses.middleware');

router.get('/', coursesController.getAllCourses);
router.post('/', validateCourseInput, coursesController.createCourse);
router.get('/:id', coursesController.getCourseById);
router.put('/:id', validateCourseInput, coursesController.updateCourse);
router.delete('/:id', coursesController.deleteCourse);

module.exports = router;