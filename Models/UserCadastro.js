import Sequelize from "sequelize";
import connection from "../config/sequelize-config.js";

const UserCadastro = connection.define("userCadastro", {
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

UserCadastro.sync({force:false})
export default UserCadastro;