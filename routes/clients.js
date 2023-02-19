const express = require('express');
const { requiresAuth } = require('express-openid-connect');
const router = express.Router();

const client = require('../controllers/clients');

// GET /feed/posts
// router.get('/', clients.get);
router.post('/', client.addClient);

router.get('/:id', requiresAuth(), client.getOneClient);

router.put('/:id', requiresAuth(), client.updateClient);

router.delete('/:id', requiresAuth(), client.deleteClient);

module.exports = router;
