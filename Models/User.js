import Sequelize from 'sequelize'
import connection from '../config/sequelize-config.js'

const User = connection.define("user", {
    nome:{
        type: Sequelize.STRING
    },
    email :{
        type: Sequelize.STRING
    },
    login :{
        type: Sequelize.STRING
    },
    senha:{
        type: Sequelize.STRING
    },
    acesso:{
        type: Sequelize.STRING
    }
})

User.sync({force:false})
export default User