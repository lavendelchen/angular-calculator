const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const fs = require('fs-extra');
const path = require('path');
const app = express()
const port = 3000
const dataPath = path.join(__dirname, 'data', 'data.json');


const saveData = (data) => {
  fs.ensureDir(path.dirname(dataPath))
    .then(() => fs.writeJson(dataPath, data, { spaces: 2 }))
    .then(() => {
      console.log('JSON data written successfully!');
    })
    .catch(err => {
      console.error('Error writing JSON data:', err);
    })
}

app.use(cors({
  origin: "http://localhost:4200",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization"
}))

app.use(bodyParser.text())

app.get("/api", (request, response) => {
  response.send("Hello World!")
})

app.get("/api/hugo", (request, response) => {
  response.send("Hugo")
})

app.post("/api/calc", (request, response) => {
  const calc = JSON.parse(request.body)
  saveData(calc)

  response.json(calc.result)
})

app.listen(port, console.log(`App listening on Port ${port}`))
