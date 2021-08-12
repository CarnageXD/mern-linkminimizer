import { Router } from 'express'
import config from 'config'
import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { check, validationResult } from 'express-validator'

const router = Router()

router.post('/register',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Min length is 6 symbols').isLength({ min: 6 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            console.log(req.body)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect registration data'
                })
            }

            const { email, password } = req.body
            const candidate = await User.findOne({ email })
            if (candidate) {
                return res.status(400).json({ message: 'User with this email already exist' })
            }
            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({ email, password: hashedPassword })
            await user.save()
            res.status(201).json({ message: 'User was created' })
        } catch (e) {
            res.status(500).json({ message: 'Something went wrong, try again' })
        }
    })

router.post('/login',
    [
        check('email', 'Enter correct email').normalizeEmail().isEmail(),
        check('password', 'Enter existing password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect login data'
                })
            }
            const { email, password } = req.body
            const user = await User.findOne({ email })

            if (!user) {
                return res.status(400).json({ message: 'User has not found' })
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({ message: 'Password is wrong, try again' })
            }

            const token = jwt.sign({ userId: user._id }, config.get('jwtSecret'), { expiresIn: '1h' })

            res.json({ token, userId: user._id })
        } catch (e) {
            res.status(500).json({ message: 'Something went wrong, try again' })
        }
    })

export default router