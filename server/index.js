const express = require('express')
const path = require("path")
const app = express()


require('./db') 
require ('dotenv').config()
app.use('/images', express.static(path.join(__dirname, "images")))
app.use('/invoices', express.static(path.join(__dirname, "invoices")))
const port = process.env.PORT || 1000

//middleweres
app.use(require('cors')())
app.use(express.json())
app.use('/main', require('./routes/main'))
app.use('/order', require('./routes/order'))
app.use('/auth', require('./routes/auth'))
app.use('/shop', require('./routes/shop'))



app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})









