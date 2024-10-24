const express = require('express')
const router = require('./src/router')
const cors = require('cors')

const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors())
app.use(router)

app.listen(PORT, () => {
    
    console.log(`app listening on localhost:${PORT}`)
})