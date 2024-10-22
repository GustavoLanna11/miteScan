import express from "express";
import Colmeia from "../Models/Colmeia.js";
const ColmeiaRouter = express.Router();

ColmeiaRouter.get("/", (req,res)=>{
    Colmeia.findAll().then((colmeias)=>{
        res.render("colmeia", {
            colmeias: colmeias,
        })
    })
})

ColmeiaRouter.post("/new", (req,res)=>{
    const nome = req.body.nome;
    const tipoAbelha = req.body.tipoAbelha;
    const tamanho = req.body.tamanho;
    Colmeia.create({
        nome:nome,
        tipoAbelha: tipoAbelha,
        tamanho: tamanho
    }).then(()=>{
        res.redirect("/colmeia")
    }).catch(error => {
        console.log(error)
    })
})

ColmeiaRouter.get("/delete/:id", (req, res)=>{
    const id=req.params.id
    Colmeia.destroy({
        where:{
            id:id
        }
    }).then(()=>{
        res.redirect("/colmeia")
    }).catch(error=>{
        console.log(error);
    })
})


export default ColmeiaRouter;