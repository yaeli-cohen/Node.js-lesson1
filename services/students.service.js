const students = require('../data/students.data');

const getAll = () => students;

const getById = (id) => students.find(s => s.id === id);

const create = (name, email) => {
    const newStudent = {
        id: students.length > 0 ? students[students.length - 1].id + 1 : 1,
        name,
        email
    };
    students.push(newStudent);
    return newStudent;
};

const update = (id, name, email) => {
    const student = students.find(s => s.id === id);
    if (!student) return null;

    student.name = name;
    student.email = email;
    return student;
};

const remove = (id) => {
    const index = students.findIndex(s => s.id === id);
    if (index === -1) return false;

    students.splice(index, 1);
    return true;
};

module.exports = { getAll, getById, create, update, remove };