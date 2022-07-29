const Sequelize = require('sequelize')
const connection = require('./connection')

//definindo tabela users
const Users = connection.define('users', {
      name: {
            type: Sequelize.STRING,
            allowNull: false
      },
      cpf: {
            type: Sequelize.STRING,
            allowNull: false
      },
      email: {
            type: Sequelize.STRING,
            allowNull: false
      },
      password: {
            type: Sequelize.STRING,
            allowNull: false
      }
})
//criando tabela se não existe
Users.sync({ force: false })

module.exports = Users
