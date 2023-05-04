// create exppress api that calls the function above
const port = 3000
const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())

const bodyParser = require('body-parser')
const db = require('./connection.js')
app.use(bodyParser.json())

app.get('/', (req, res) => {
  db.query("SELECT * FROM pertanyaan", (err, result) => {
    console.log(result)
  })
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})