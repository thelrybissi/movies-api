const express = require('express')
const app = express()
const morgan = require('morgan')
const router = require('./routes/movies.js')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('./public'))
app.use(morgan('short'))
app.use(router) //Dever ser após todas as configurações


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('Server running um port 3000...' + PORT)
})