const express = require('express')

const router = express.Router()
const config = require('../config/index')
const { dataSource } = require('../db/data-source')
const creditPackageController = require('../controllers/creditPackage')
const logger = require('../utils/logger')('CreditPackage')
const auth = require('../middlewares/auth')({
  secret: config.get('secret').jwtSecret,
  userRepository: dataSource.getRepository('User'),
  logger
})

/**
 * @swagger
 * /api/credit-package:
 *   get:
 *     summary: 取得所有點數包
 *     tags: [Credit Package]
 *     security: []
 *     responses:
 *       200:
 *         description: 成功取得點數包列表
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
 *                     creditPackages:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/CreditPackage'
 */
router.get('/', creditPackageController.getAll)

/**
 * @swagger
 * /api/credit-package:
 *   post:
 *     summary: 建立新的點數包
 *     tags: [Credit Package]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - creditAmount
 *               - price
 *               - expiryDays
 *             properties:
 *               name:
 *                 type: string
 *                 example: 10堂課程包
 *               creditAmount:
 *                 type: integer
 *                 example: 10
 *               price:
 *                 type: integer
 *                 example: 1000
 *               expiryDays:
 *                 type: integer
 *                 example: 90
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
 *                     creditPackage:
 *                       $ref: '#/components/schemas/CreditPackage'
 *       400:
 *         description: 欄位未填寫正確
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', creditPackageController.postCreditPackage)

/**
 * @swagger
 * /api/credit-package/{creditPackageId}:
 *   post:
 *     summary: 購買點數包
 *     tags: [Credit Package]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: creditPackageId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 點數包 ID
 *     responses:
 *       201:
 *         description: 購買成功
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
 *       404:
 *         description: 點數包不存在
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/:creditPackageId', auth, creditPackageController.postUserBuy)

/**
 * @swagger
 * /api/credit-package/{creditPackageId}:
 *   delete:
 *     summary: 刪除點數包
 *     tags: [Credit Package]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: creditPackageId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 點數包 ID
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
 *         description: 點數包不存在
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:creditPackageId', creditPackageController.delete)

module.exports = router
