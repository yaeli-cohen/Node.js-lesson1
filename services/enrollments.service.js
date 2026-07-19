const enrollments = require('../data/enrollments.data');
const courses = require('../data/courses.data');
const students = require('../data/students.data');

const getAll = () => enrollments;

const getById = (id) => enrollments.find(e => e.id === id);

const create = (studentId, courseId, date) => {
    // בדיקה האם הסטודנט והקורס קיימים במערכת
    const studentExists = students.some(s => s.id === studentId);
    const courseExists = courses.some(c => c.id === courseId);

    if (!studentExists || !courseExists) {
        return { error: "Referenced Student or Course does not exist" };
    }

    const newEnrollment = {
        id: enrollments.length > 0 ? enrollments[enrollments.length - 1].id + 1 : 1,
        studentId,
        courseId,
        date: date || new Date().toISOString().split('T')[0]
    };
    enrollments.push(newEnrollment);
    return newEnrollment;
};

const update = (id, studentId, courseId, date) => {
    const enrollment = enrollments.find(e => e.id === id);
    if (!enrollment) return null; // הרישום עצמו לא נמצא

    // בדיקה האם הסטודנט והקורס החדשים קיימים במערכת
    const studentExists = students.some(s => s.id === studentId);
    const courseExists = courses.some(c => c.id === courseId);

    if (!studentExists || !courseExists) {
        return { error: "Referenced Student or Course does not exist" };
    }

    enrollment.studentId = studentId;
    enrollment.courseId = courseId;
    enrollment.date = date || enrollment.date;
    return enrollment;
};

const remove = (id) => {
    const index = enrollments.findIndex(e => e.id === id);
    if (index === -1) return false;

    enrollments.splice(index, 1);
    return true;
};

module.exports = { getAll, getById, create, update, remove };