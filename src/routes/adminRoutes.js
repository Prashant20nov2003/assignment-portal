const express = require('express');
const { auth, isAdmin } = require('../middleware/auth');
const adminController = require('../controllers/adminController');

const router = express.Router();

/**
 * @swagger
 * /api/admin/register:
 *   post:
 *     tags: [Admins]
 *     summary: Register a new admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Admin registered successfully
 */
router.post('/admin/register', adminController.register);

/**
 * @swagger
 * /api/admin/login:
 *   post:
 *     tags: [Admins]
 *     summary: Admin login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post('/admin/login', adminController.login);

/**
 * @swagger
 * /api/admin/assignments:
 *   get:
 *     tags: [Assignments]
 *     summary: Get assignments for admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of assignments
 */
router.get('/admin/assignments', auth, isAdmin, adminController.getAssignments);

/**
 * @swagger
 * /api/admin/assignments/{id}/accept:
 *   post:
 *     tags: [Assignments]
 *     summary: Accept an assignment
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Assignment accepted
 */
router.post('/admin/assignments/:id/accept', auth, isAdmin, (req, res) => {
  req.body.status = 'accepted';
  adminController.updateAssignmentStatus(req, res);
});

/**
 * @swagger
 * /api/admin/assignments/{id}/reject:
 *   post:
 *     tags: [Assignments]
 *     summary: Reject an assignment
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Assignment rejected
 */
router.post('/admin/assignments/:id/reject', auth, isAdmin, (req, res) => {
  req.body.status = 'rejected';
  adminController.updateAssignmentStatus(req, res);
});

module.exports = router;