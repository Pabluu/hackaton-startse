const database = 'db'
const user = 'root'
const password = 'root286'

const Sequelize = require('sequelize')
const connection = new Sequelize(database, user, password, {
      host: 'localhost',
      dialect: 'mysql'
})

module.exports = connection
