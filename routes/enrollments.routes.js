const express = require('express');
const router = express.Router();
const enrollmentsController = require('../controllers/enrollments.controller');

const { validateEnrollmentInput } = require('../middlewares/enrollments.middleware');

router.get('/', enrollmentsController.getAllEnrollments);
router.post('/', validateEnrollmentInput, enrollmentsController.createEnrollment);
router.get('/:id', enrollmentsController.getEnrollmentById);// 
router.put('/:id', validateEnrollmentInput, enrollmentsController.updateEnrollment);
router.delete('/:id', enrollmentsController.deleteEnrollment);

module.exports = router;