const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');

const schools = require('../controllers/schools');

// GET /feed/posts

router.post('/', schools.addSchool);

router.put('/:id', requiresAuth(), schools.updateSchool);

router.delete('/:id', requiresAuth(), schools.deleteSchool);

router.get('/:id', requiresAuth(), schools.getOneSchool);

module.exports = router;
