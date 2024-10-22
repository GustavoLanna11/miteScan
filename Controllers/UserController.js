import express from "express";
import User from "../Models/User.js";
const UserRouter = express.Router();

UserRouter.get("/", (req,res)=>{
    User.findAll().then((users)=>{
        res.render("user", {
            users: users,
        })
    })
})

UserRouter.post("/new", (req,res)=>{
    const nome = req.body.nome;
    const email = req.body.email;
    const login = req.body.login;
    const senha = req.body.senha;
    const acesso = req.body.acesso;
    User.create({
        nome: nome,
        email: email,
        login: login,
        senha: senha,
        acesso: acesso
    }).then(()=>{
        res.redirect("/user")
    }).catch(error => {
        console.log(error)
    })
})

UserRouter.get("/delete/:id", (req, res)=>{
    const id=req.params.id
    User.destroy({
        where:{
            id:id
        }
    }).then(()=>{
        res.redirect("/user")
    }).catch(error=>{
        console.log(error);
    })
})


UserRouter.get("/edit/:id", (req,res)=>{
    const id = req.params.id
    //memorize esse comando do sequelize
    User.findByPk(id).then((user) => {
        res.render("userEdit", {
            user:user,
        });
    }).catch((error) => {
        console.log(error)
    })
});

UserRouter.post("/update", (req, res) => {
    const id = req.body.id
    const nome = req.body.nome;
    const email = req.body.email;
    const login = req.body.login;
    const senha = req.body.senha;
    const acesso = req.body.acesso;
   
    User.update(
        {
            nome:nome,
            email:email,
            login:login,
            senha:senha,
            acesso:acesso
        },
        {where: {id:id}}
    ).then(()=>{
        res.redirect("/user")
    }).catch((error) => {
        console.log(error)
    })
});

export default UserRouter;