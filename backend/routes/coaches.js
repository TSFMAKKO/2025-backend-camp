const express = require('express')

const router = express.Router()
const coachesController = require('../controllers/coaches')

/**
 * @swagger
 * /api/coaches:
 *   get:
 *     summary: 取得所有教練列表
 *     tags: [Coaches]
 *     security: []
 *     parameters:
 *       - in: query
 *         name: skillId
 *         schema:
 *           type: integer
 *         description: 依技能篩選教練
 *     responses:
 *       200:
 *         description: 成功取得教練列表
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     coaches:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Coach'
 */
router.get('/', coachesController.getCoaches)

/**
 * @swagger
 * /api/coaches/{coachId}:
 *   get:
 *     summary: 取得教練詳細資料
 *     tags: [Coaches]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: coachId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 教練 ID
 *     responses:
 *       200:
 *         description: 成功取得教練資料
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     coach:
 *                       $ref: '#/components/schemas/Coach'
 *       404:
 *         description: 教練不存在
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:coachId', coachesController.getCoachDetail)

/**
 * @swagger
 * /api/coaches/{coachId}/courses:
 *   get:
 *     summary: 取得教練的課程列表
 *     tags: [Coaches]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: coachId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 教練 ID
 *     responses:
 *       200:
 *         description: 成功取得課程列表
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     courses:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Course'
 *       404:
 *         description: 教練不存在
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:coachId/courses', coachesController.getCoachCourses)

module.exports = router
