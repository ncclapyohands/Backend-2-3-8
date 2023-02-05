const express = require('express');
const router = express.Router();

const schools = require('../controllers/schools');

// GET /feed/posts
// router.get('/', schools.getAll);

// // router.get('/:id', schools.getOne);

// router.post('/', schools.addContact);

// router.put('/:id', schools.updateContact);

// router.delete('/:id', schools.deleteContact);

router.post('/', schools.addSchool);

router.get('/:id', schools.getOneSchool);

module.exports = router;
