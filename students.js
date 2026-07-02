const express = require('express');
const router = express.Router();

// מערך התלמידים החדש
const students = [
    { id: 1, name: 'Yael Cohen', grade: 'A' },
    { id: 2, name: 'Israel Israeli', grade: 'B' }
];

// נתיב לקבלת כל התלמידים
router.get('/', (req, res) => {
    res.json(students);
});

// מייצאים את הראוטר
module.exports = router;