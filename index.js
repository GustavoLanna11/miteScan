import express from 'express';
const app = express();
const port = 8080;

app.listen(port, (error)=>{
    if(error){
        console.log("Erro ao conectar!");
    } else{
        console.log(`Servidor rodando em: http://localhost:${port}`);
    }
})

import connection from './config/sequelize-config.js';

connection.authenticate().then(() => {
    console.log("Conexão com o banco de dados feita com sucesso!");
}).catch(error => {
    console.log(error);
})

connection.query(`CREATE DATABASE IF NOT EXISTS mitescan;`).then(()=>{
    console.log("O banco de dados está criado!");
}).catch(error => {
    console.log(error)
});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.set("views", "./Views");
app.use(express.urlencoded({extended: false}));

app.get("/", (req, res) => {
    res.render("index");
});

import ColmeiaController from "./Controllers/ColmeiaController.js"
app.use("/colmeia", ColmeiaController);

import UserController from "./Controllers/UserController.js"
app.use("/user", UserController);

import CadastroController from "./Controllers/CadastroController.js"
app.use("/", CadastroController)