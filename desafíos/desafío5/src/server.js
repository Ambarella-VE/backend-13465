/* eslint-disable no-unused-vars */
const express = require('express');
const emoji = require('node-emoji');
const validateProduct = require('./middlewares/middlewares')
const Container = require('./container');
const productsFile = new Container('./src/products.json')

const app = express()
const port = 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
  // eslint-disable-next-line no-undef
  res.sendFile(__dirname + '/files/form.html')
})

app.post('/', validateProduct, (req,res) => {
  try {
    const { body } = req
    console.log(typeof body)
  } catch (error) {
    console.log(error)
  }
  res.status(200).send('Guardado!')
});

app.listen(port, () => {
  console.log(emoji.get('computer'),`App escuchando en http://localhost:${port}`)
})
