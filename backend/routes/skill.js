const express = require('express')

const router = express.Router()
const skillController = require('../controllers/skill')

/**
 * @swagger
 * /api/coaches/skill:
 *   get:
 *     summary: 取得所有技能
 *     tags: [Skills]
 *     security: []
 *     responses:
 *       200:
 *         description: 成功取得技能列表
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
 *                     skills:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Skill'
 */
router.get('/', skillController.getAll)

/**
 * @swagger
 * /api/coaches/skill:
 *   post:
 *     summary: 建立新技能
 *     tags: [Skills]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: 瑜珈
 *     responses:
 *       201:
 *         description: 建立成功
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
 *                     skill:
 *                       $ref: '#/components/schemas/Skill'
 *       400:
 *         description: 欄位未填寫正確
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', skillController.postSkill)

/**
 * @swagger
 * /api/coaches/skill/{skillId}:
 *   delete:
 *     summary: 刪除技能
 *     tags: [Skills]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: skillId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 技能 ID
 *     responses:
 *       200:
 *         description: 刪除成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *       404:
 *         description: 技能不存在
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:skillId', skillController.delete)

module.exports = router
