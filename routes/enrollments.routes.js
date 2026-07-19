const express = require('express');
const router = express.Router();
const enrollmentsController = require('../controllers/enrollments.controller');

router.get('/', enrollmentsController.getAllEnrollments);
router.get('/:id', enrollmentsController.getEnrollmentById);
router.post('/', enrollmentsController.createEnrollment);
router.put('/:id', enrollmentsController.updateEnrollment);
router.delete('/:id', enrollmentsController.deleteEnrollment);

module.exports = router;