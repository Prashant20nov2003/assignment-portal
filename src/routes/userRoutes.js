const express = require('express');
const multer = require('multer');
const { auth } = require('../middleware/auth');
const userController = require('../controllers/userController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     tags: [Users]
 *     summary: Register a new user
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
 *         description: User registered successfully
 */
router.post('/user/register', userController.register);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     tags: [Users]
 *     summary: User login
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
router.post('/user/login', userController.login);

/**
 * @swagger
 * /api/assignment/upload:
 *   post:
 *     tags: [Assignments]
 *     summary: Upload an assignment
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - adminId
 *               - task
 *             properties:
 *               adminId:
 *                 type: string
 *               task:
 *                 type: string
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Assignment uploaded successfully
 */
router.post('/assignment/upload', auth, upload.single('file'), userController.uploadAssignment);

/**
 * @swagger
 * /api/admins:
 *   get:
 *     tags: [Users]
 *     summary: Get all admins
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of admins
 */
router.get('/admins', auth, userController.getAdmins);

module.exports = router;
