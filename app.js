import express from 'express'
import mongoose from 'mongoose'
import config from 'config'
import path from 'path'
import authRouter from './routes/auth.routes.js'
import linkRouter from './routes/link.routes.js'
import redirectRouter from './routes/redirect.routes.js'

const __dirname = path.resolve('')
const PORT = config.get('port') || 5000

const app = express()

app.use(express.json({ extended: true }))

app.use('/api/auth', authRouter)
app.use('/api/link', linkRouter)
app.use('/t', redirectRouter)

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const start = async () => {
    try {
        await mongoose.connect(config.get('mongoURI'), { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
        app.listen(PORT, () => console.log(`Server has been started on ${PORT} port`))
    } catch (e) {
        console.log('Server error: ', e.message)
        process.exit(1)
    }
}

start()