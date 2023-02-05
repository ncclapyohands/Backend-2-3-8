const express = require('express');
// const swagger = require('swagger-autogen');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const router = express.Router();

router.use('/schools', require('./schools'));
router.use('/clients', require('./clients'));
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = router;
