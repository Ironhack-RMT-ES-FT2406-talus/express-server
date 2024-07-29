require('dotenv').config()
const express = require('express')
const app = express()

const allBooks = require("./data/data.js")

// configuraciones
app.use( express.static("public") ) // esto indica al server que todos los archivos estaticos automaticamente los busca en la carpeta public

const morgan = require("morgan")
app.use( morgan("dev") )

// middleware => una ejecución entre la solicitud del cliente y la respuesta de cualquier ruta.
app.use((req, res, next) => {
  console.log("Esto siempre se va a ejecutar")

  // ejemplo: 
  // verificar status de usuarios y roles de usuario
  // configuraciones de express
  // almacenar info de comportamiento de usuario
  // checkeos de error

  // continuar con el checkeo de rutas
  next()
})


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get("/patata", (req, res) => {
  res.send("Aqui tienes una PATATA!!!!")
})

app.get("/friends/:friendName", (req, res) => {
  console.log(req.params) // asi se acceden a los parametros dinamicos en rutas
  res.send("Aqui tienes información de mi amigo bob")
})

app.get("/libros", (req, res) => {
  res.json(allBooks) // con res.json la data será en formato JSON.
})

app.get("/libros/random", (req, res) => {

  let randomIndexLibro = Math.floor( Math.random() * allBooks.length )
  let randomLibro = allBooks[randomIndexLibro]

  res.json(randomLibro)

})

// como podemos enviar archivos de html
app.get("/home", (req, res) => {
  // console.log(__dirname)
  // sendFile debe indicar la dirección absoluta del archivo a enviar
  res.sendFile(__dirname + "/views/index.html")
})

app.get("/about", (req, res) => {
  res.sendFile(__dirname + "/views/about.html")
})


const port = process.env.PORT
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})