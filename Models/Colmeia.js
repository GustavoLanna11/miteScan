import Sequelize from 'sequelize';
import connection from '../config/sequelize-config.js';

const Colmeia = connection.define("colmeia", {
    nome:{
        type: Sequelize.STRING,
    },
    tipoAbelha:{
        type: Sequelize.STRING,
    },
    tamanho:{
        type: Sequelize.STRING,
    }
})

Colmeia.sync({force:false})
export default Colmeia;