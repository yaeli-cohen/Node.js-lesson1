const courses = require('../data/courses.data');

const getAll = () => courses;

const getById = (id) => courses.find(c => c.id === id);

const create = (name, hours) => {
    const newCourse = {
        id: courses.length > 0 ? courses[courses.length - 1].id + 1 : 1,
        name,
        hours
    };
    courses.push(newCourse);
    return newCourse;
};

const update = (id, name, hours) => {
    const course = courses.find(c => c.id === id);
    if (!course) return null;

    course.name = name;
    course.hours = hours;
    return course;
};

const remove = (id) => {
    const index = courses.findIndex(c => c.id === id);
    if (index === -1) return false;

    courses.splice(index, 1);
    return true;
};

module.exports = { getAll, getById, create, update, remove };