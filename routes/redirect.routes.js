import { Router } from 'express'
import Link from '../models/Link.js'

const router = Router()

router.get('/:code', async (req, res) => {
    try {
        const link = await Link.findOne({ code: req.params.code })

        if (link) {
            link.clicks++
            link.save()
            return res.redirect(link.from)
        }

        res.status(404).json('Link is not found')
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try again' })
    }
})

export default router

