const express = require('express')
const bodyParser = require('body-parser')
const connection = require('./database/connection')
const Users = require('./database/Users') //retorna tabela users
const app = express()

//testando conexao com banco de dados
connection
      .authenticate()
      .then(() => {
            console.log('conexao com banco de dados bem sucedida')
      })
      .catch(() => {
            console.log('conexao com banco de dados mal sucedida')
      })

// Body parser para capturar valores do formulario
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Estou dizendo para o Express usar o EJS como View engine
app.set('view engine', 'ejs')
app.use(express.static('public'))

//rotas
app.get('/', (req, res) => {
      res.render('index')
})

//coneção com servidor localhost
app.listen(3000, () => {
      console.log('conectado no servidor http://localhost:3000')
})
