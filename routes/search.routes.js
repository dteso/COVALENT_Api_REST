const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate-jwt');

const { SearchController } = require('../controllers/search.controller');
const controller = new SearchController();

const router = Router();

router.get('/:searchParam', validateJWT, controller.fullSearch);
router.get('/collection/:collection/:searchParam', validateJWT, controller.searchDocumentCollection);

module.exports = router;