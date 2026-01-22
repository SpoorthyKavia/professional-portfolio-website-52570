const express = require('express');
const portfolioController = require('../controllers/portfolio');

const router = express.Router();

/**
 * @swagger
 * /api/portfolio:
 *   get:
 *     summary: Get portfolio data
 *     description: Returns portfolio data (profile, about, skills, projects, and social links) from a JSON data source.
 *     tags:
 *       - Portfolio
 *     responses:
 *       200:
 *         description: Portfolio payload
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 profile:
 *                   type: object
 *                 about:
 *                   type: object
 *                 skills:
 *                   type: array
 *                   items:
 *                     type: object
 *                 projects:
 *                   type: array
 *                   items:
 *                     type: object
 *                 social:
 *                   type: array
 *                   items:
 *                     type: object
 */
router.get('/api/portfolio', portfolioController.getPortfolio.bind(portfolioController));

module.exports = router;
