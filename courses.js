const express = require('express');
const router = express.Router();

// מערך הקורסים (שהגדרת בשיעור הקודם)
const courses = [
    { id: 1, name: 'Node.js Basics' },
    { id: 2, name: 'Express.js Advanced' }
];

// נתיב לקבלת כל הקורסים
router.get('/', (req, res) => {
    res.json(courses);
});

// מייצאים את הראוטר כדי ש-app.js יוכל להשתמש בו
module.exports = router;