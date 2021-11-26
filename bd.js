const sqlite3 = require("sqlite3");
const bd = new sqlite3.Database("./responsavel.bd");

bd.serialize(function(){
    // //Criar Tabela
    bd.run(` 
        CREATE TABLE IF NOT EXISTS responsavel(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            email TEXT,
            caracteristica TEXT,
            problemas TEXT,
            moradores INTEGER,
            descricao TEXT);
    `);

    bd.run(` 
    CREATE TABLE IF NOT EXISTS jogador(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT,
        email TEXT,
        cidade TEXT,
        telefone INTERGER,
        estado TEXT,
        endereco TEXT,
        sexo TEXT,
        data_de_nascimento DATE);
`);


    //Cosultar Dados
    bd.all("SELECT * FROM jogador", function(err, rows){
        if(err) return console.log(err)
        console.log("JOGADOR  :\n",rows)
    })

    //Cosultar Dados
    bd.all("SELECT * FROM responsavel", function(err, rows){
        if(err) return console.log(err)
        console.log("RESPONSAVEL  :\n",rows)
    })
})


module.exports = bd;