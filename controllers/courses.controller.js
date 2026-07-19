const coursesService = require('../services/courses.service');

const getAllCourses = (req, res) => {
    res.status(200).json(coursesService.getAll());
};

const getCourseById = (req, res) => {
    const id = parseInt(req.params.id);
    const course = coursesService.getById(id);
    if (!course) {
        return res.status(404).json({ error: "Course not found" });
    }
    res.status(200).json(course);
};

const createCourse = (req, res) => {
    const { name, hours } = req.body;
    if (!name || !hours) {
        return res.status(400).json({ error: "Name and hours are required fields" });
    }
    const newCourse = coursesService.create(name, hours);
    res.status(201).json(newCourse);
};

const updateCourse = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, hours } = req.body;
    if (!name || !hours) {
        return res.status(400).json({ error: "Name and hours are required for full update" });
    }
    const updatedCourse = coursesService.update(id, name, hours);
    if (!updatedCourse) {
        return res.status(404).json({ error: "Course not found" });
    }
    res.status(200).json(updatedCourse);
};

const deleteCourse = (req, res) => {
    const id = parseInt(req.params.id);
    const isDeleted = coursesService.remove(id);
    if (!isDeleted) {
        return res.status(404).json({ error: "Course not found" });
    }
    res.status(200).json({ message: "Course deleted successfully" });
};

module.exports = { getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse };