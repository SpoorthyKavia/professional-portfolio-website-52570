const express = require('express');
const contactController = require('../controllers/contact');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     ContactSubmissionRequest:
 *       type: object
 *       required: [name, email, message]
 *       properties:
 *         name:
 *           type: string
 *           example: Jane Doe
 *         email:
 *           type: string
 *           example: jane@example.com
 *         message:
 *           type: string
 *           example: Hello! I’d like to collaborate.
 *     ContactSubmissionResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: ok
 *         message:
 *           type: string
 *           example: Thanks! Your message has been sent.
 *         submissionId:
 *           type: string
 *           example: 1a2b3c4d
 *     ValidationErrorResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: error
 *         message:
 *           type: string
 *           example: Validation failed
 *         details:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               field:
 *                 type: string
 *                 example: email
 *               message:
 *                 type: string
 *                 example: Valid email is required (max 160 chars).
 */

/**
 * @swagger
 * /api/contact:
 *   post:
 *     summary: Submit contact form
 *     description: Validates and stores a contact submission to a JSON file.
 *     tags:
 *       - Contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactSubmissionRequest'
 *     responses:
 *       201:
 *         description: Submission accepted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ContactSubmissionResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 */
router.post('/api/contact', contactController.submit.bind(contactController));

module.exports = router;
