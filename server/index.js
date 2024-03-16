import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { adminRouter } from './routes/AdminRoutes.js'

const app = express()
app.use(cors({
    origin:["http://localhost:5173"],
    methods:['GET','POST','PUT'],
    credentials:true
}))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.static('Public'))

app.use('/auth',adminRouter)

app.listen(3002,()=> {
    console.log('server is listening at port 3002')
})

export default app