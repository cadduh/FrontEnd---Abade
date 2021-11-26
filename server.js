const express = require("express");
const server = express();

//conf nunjucks
const nunjucks = require("nunjucks");
nunjucks.configure("views", {
    express: server,
    noCache: true
});

//config arquivos estaticos (css, scripts, imgs)
server.use(express.static("public"));
server.use(express.urlencoded({ extended: true })) //adicionou para poder recuperar o body

const bd = require("./bd")


server.get("/", function(req, res){ 
    return res.render("pagIndex.html");
 })


server.get("/jogador", function(req,res){
    return res.render("pagCadastroJogador.html")

})

//Método POST
server.post("/jogador", function(req, res){
    //Inserir Dados
    const query = `
    INSERT INTO jogador(
        nome,
        email,
        cidade,
        telefone,
        estado,
        endereco,
        sexo,
        data_de_nascimento
    ) VALUES (?,?,?,?,?,?,?,?)` ;
    const values = [req.body.nomeJogador, req.body.emailJogador, req.body.cidadeJogador, req.body.telJogador, req.body.estadoJogador, req.body.enderecoJogador, req.body.generoJogador, req.body.nascimentoJogador];
    bd.run(query, values, function(err){
        if(err) return console.log(err);        
        console.log("Dado armazenado com sucesso");
    });
    return res.redirect("/jogador");
})

server.get("/responsavel", function(req,res){
    return res.render("pagCadastroPais.html")

})

//Método POST
server.post("/responsavel", function(req, res){
    //Inserir Dados
    const query = `
    INSERT INTO responsavel(
        nome,
        email,
        caracteristica,
        problemas,
        moradores,
        descricao
    ) VALUES (?,?,?,?,?,?)` ;
    const values = [req.body.nome, req.body.email, req.body.caracteristica, req.body.problemas, req.body.moradores, req.body.descricao];
    bd.run(query, values, function(err){
        if(err) return console.log(err);        
        console.log("Dado armazenado com sucesso");
    });
    return res.redirect("/jogador");
})

server.listen(3000);