const express = require('express')

const router = express.Router()
const config = require('../config/index')
const { dataSource } = require('../db/data-source')
const logger = require('../utils/logger')('Admin')
const auth = require('../middlewares/auth')({
  secret: config.get('secret').jwtSecret,
  userRepository: dataSource.getRepository('User'),
  logger
})
const isCoach = require('../middlewares/isCoach')
const adminController = require('../controllers/admin')

/**
 * @swagger
 * /api/admin/coaches/courses:
 *   post:
 *     summary: 教練建立課程
 *     tags: [Admin - Coaches]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - startAt
 *               - endAt
 *               - creditCost
 *               - maxStudents
 *             properties:
 *               name:
 *                 type: string
 *                 example: 瑜珈課程
 *               description:
 *                 type: string
 *                 example: 初級瑜珈課程
 *               startAt:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-01-28T10:00:00Z
 *               endAt:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-01-28T11:00:00Z
 *               creditCost:
 *                 type: integer
 *                 example: 1
 *               maxStudents:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       201:
 *         description: 課程建立成功
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
 *       400:
 *         description: 欄位未填寫正確
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: 未授權
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: 權限不足（非教練）
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/coaches/courses', auth, isCoach, adminController.postCourse)

/**
 * @swagger
 * /api/admin/coaches/revenue:
 *   get:
 *     summary: 取得教練營收資料
 *     tags: [Admin - Coaches]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 成功取得營收資料
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
 *       401:
 *         description: 未授權
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: 權限不足（非教練）
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/coaches/revenue', auth, isCoach, adminController.getCoachRevenue)

/**
 * @swagger
 * /api/admin/coaches/courses:
 *   get:
 *     summary: 取得教練的所有課程
 *     tags: [Admin - Coaches]
 *     security:
 *       - bearerAuth: []
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
 *       401:
 *         description: 未授權
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: 權限不足（非教練）
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/coaches/courses', auth, isCoach, adminController.getCoachCourses)

/**
 * @swagger
 * /api/admin/coaches/courses/{courseId}:
 *   get:
 *     summary: 取得課程詳細資料
 *     tags: [Admin - Coaches]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 課程 ID
 *     responses:
 *       200:
 *         description: 成功取得課程資料
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
 *                     course:
 *                       $ref: '#/components/schemas/Course'
 *       401:
 *         description: 未授權
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: 課程不存在
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/coaches/courses/:courseId', auth, adminController.getCoachCourseDetail)

/**
 * @swagger
 * /api/admin/coaches/courses/{courseId}:
 *   put:
 *     summary: 更新課程資料
 *     tags: [Admin - Coaches]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 課程 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: 進階瑜珈課程
 *               description:
 *                 type: string
 *                 example: 進階瑜珈課程描述
 *               startAt:
 *                 type: string
 *                 format: date-time
 *               endAt:
 *                 type: string
 *                 format: date-time
 *               creditCost:
 *                 type: integer
 *               maxStudents:
 *                 type: integer
 *     responses:
 *       200:
 *         description: 更新成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *       401:
 *         description: 未授權
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: 課程不存在
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/coaches/courses/:courseId', auth, adminController.putCoachCourseDetail)

/**
 * @swagger
 * /api/admin/coaches/{userId}:
 *   post:
 *     summary: 將使用者設為教練
 *     tags: [Admin - Coaches]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 使用者 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - yearsOfExperience
 *               - description
 *               - skillIds
 *             properties:
 *               yearsOfExperience:
 *                 type: integer
 *                 example: 5
 *               description:
 *                 type: string
 *                 example: 專業健身教練
 *               skillIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 2, 3]
 *     responses:
 *       201:
 *         description: 設定成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *       400:
 *         description: 欄位未填寫正確
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: 使用者不存在
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/coaches/:userId', adminController.postCoach)

/**
 * @swagger
 * /api/admin/coaches:
 *   put:
 *     summary: 更新教練資料
 *     tags: [Admin - Coaches]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               yearsOfExperience:
 *                 type: integer
 *                 example: 6
 *               description:
 *                 type: string
 *                 example: 更新的教練描述
 *               skillIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 2]
 *     responses:
 *       200:
 *         description: 更新成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *       401:
 *         description: 未授權
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: 權限不足（非教練）
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/coaches', auth, isCoach, adminController.putCoachProfile)

/**
 * @swagger
 * /api/admin/coaches:
 *   get:
 *     summary: 取得教練資料
 *     tags: [Admin - Coaches]
 *     security:
 *       - bearerAuth: []
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
 *       401:
 *         description: 未授權
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: 權限不足（非教練）
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/coaches', auth, isCoach, adminController.getCoachProfile)

module.exports = router
