const express = require('express');
const router = express.Router();

const schools = require('../controllers/schools');

// GET /feed/posts

router.put('/:id', schools.updateSchool);

router.delete('/:id', schools.deleteSchool);

router.post('/', schools.addSchool);

router.get('/:id', schools.getOneSchool);

module.exports = router;
