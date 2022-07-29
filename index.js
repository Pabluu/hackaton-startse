const express = require('express')
const session = require('express-session')
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

//sessões
app.use(session({ secret: 'codigoDeSessao', cookie: { maxAge: 30000000 } })) //sessão dura maxAge milisegundos

//rotas
app.get('/', (req, res) => {
      res.render('index')
})

app.get('/login', (req, res) => {
      res.render('login')
})

app.get('/logado', (req, res) => {
      if (req.session.logado == true) {
            res.render('dashboard')
      } else {
            res.redirect('/')
      }
})

//rota para cadastro
app.post('/cadastrar', (req, res) => {
      const name = req.body.name
      const cpf = req.body.cpf
      const email = req.body.email
      const password = req.body.password

      //faz busca pelo banco por user com cpf enviado pelo form
      Users.findOne({
            where: {
                  cpf: cpf
            }
      }).then(user => {
            if (user == undefined) {
                  Users.create({
                        name,
                        cpf,
                        email,
                        password
                  })
                        .then(() => {
                              req.session.logado = true
                              res.redirect('/logado')
                        })
                        .catch(() => {
                              res.redirect('/#cadastrar')
                        })
            } else {
                  res.redirect('/#cadastrar')
            }
      })
})

app.post('/logar', (req, res) => {
      const cpf = req.body.cpf
      const password = req.body.password

      Users.findOne({
            where: {
                  cpf: cpf
            }
      })
            .then(user => {
                  if (user.password === password) {
                        req.session.logado = true
                        res.redirect('/logado')
                  } else {
                        res.redirect('/login')
                  }
            })
            .catch(() => {
                  res.redirect('/login')
            })
})

//coneção com servidor localhost
app.listen(3000, () => {
      console.log('conectado no servidor http://localhost:3000')
})
