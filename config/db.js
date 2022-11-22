const Sequelize = require('sequelize');

const sequelize = new Sequelize( process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

sequelize.authenticate()
.then(() => {
    console.log('DB Connected..')
})
.catch(e => {
    console.log(e)
})

module.exports = { sequelize };