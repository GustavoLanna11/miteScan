import express from "express";
import UserCadastro from "../Models/UserCadastro.js";
import bcrypt from "bcrypt";
const router = express.Router()

router.get("/login", (req,res)=>{
    res.render("login")
})

router.get("/cadastro", (req,res)=>{
    res.render("cadastro")
})

router.post("/createUser", (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    //verificar se o usuário já existe
    UserCadastro.findOne({ where:{email:email}}).then(user => {
        if(user == undefined){
            //aqui é feito o cadastro e o hash de senha, quanto maior o número, maior o processo
            const salt = bcrypt.genSaltSync(10) 
            //criação do hash a partir do campo e do salt
            const hash = bcrypt.hashSync(password, salt)
            UserCadastro.create({
                email:email,
                //o que será gravado no banco vai ser a senha com hash
                password: hash
            }).then(()=>{
                res.redirect("/login")
            }).catch((error)=>{
                console.log(error)
            });
        } //caso esteja cadastrado
        else{
            res.send(`Usuário já cadastrado! <br> <a href="/login">faça o login</a>`)
        }
    })
});

//rota de autenticação
router.post("/authenticate", (req,res)=>{
    const email = req.body.email;
    const password = req.body.password

    //buscar usuário no banco
    UserCadastro.findOne({
        where:{
            email:email
        }
    }).then(user=>{
        if(user != undefined){
            //valida a senha, verifica a hash
            const correct = bcrypt.compareSync(password, user.password)
            //se a senha for válida
            if(correct){
                //autoriza login
                res.redirect("/")
            } else{
                res.send(`Senha inválida! <br> <a href="/login">Tente novamente</a>`)
            }
        } else{
            res.send(`Usuário não cadastrado! <br> <a href="/login">Tente novamente!</a>`)
        }
    })
})

export default router;