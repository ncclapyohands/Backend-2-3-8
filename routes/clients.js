const express = require('express');
const router = express.Router();

const client = require('../controllers/clients');

// GET /feed/posts
// router.get('/', clients.get);
router.post('/', client.addClient);

router.get('/:id', client.getOneClient);

router.put('/:id', client.updateClient);

router.delete('/:id', client.deleteClient);

module.exports = router;
