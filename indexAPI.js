const express = require('express');
const app = express();

require('dotenv').config();
const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_DTB,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    connectionLimit: 100
});
let cors = require('cors');
app.use(express.json());
app.use(cors());


// PARTIE ARTICLES ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

app.get('/api/articles', async(req, res) => {
    let conn;
    try{
        console.log("Lancement de la requête");
        conn = await pool.getConnection();
        console.log("Lancement de la requête");
        const rows = await conn.query("SELECT * FROM articles");
        console.log(rows.affectedRows);
        res.status(200).json(rows.affectedRows);
    }
    catch(err){
        console.log("Erreur" + err);
    }
});

app.get('/api/articles/:id', async(req, res) => {
    let conn;
    let id = req.params.id;
    id = parseInt(id);
    let valide = Number.isInteger(id);
    if(valide){
        try{
            console.log("Lancement de la requête");
            conn = await pool.getConnection();
            console.log("Lancement de la requête");
            const rows = await conn.query("SELECT * FROM articles WHERE idArt = ?", id);
            console.log(rows.affectedRows);
            res.status(200).json(rows.affectedRows);
        }
        catch(err){
            console.log("Erreur" + err);
        }
    }else{
        res.status(404).json({message: "Invalid ID"});
    }  
});

app.post('/api/articles', async(req, res) => {
        let conn;
        if(req.body.titreArt && req.body.contenuArt && req.body.auteurArt){
            try{
                console.log("Lancement de la requête");
                conn = await pool.getConnection();
                console.log("Lancement de la requête");
                const rows = await conn.query("INSERT INTO articles (titreArt, contenuArt, auteurArt) VALUES (?, ?, ?, ?)", [req.body.titreArt, req.body.contenuArt, req.body.auteurArt])
                console.log(rows.affectedRows);
                res.status(200).json(rows.affectedRows);
            }
            catch(err){
                console.log("Erreur" + err);
            }
        }else{
            res.status(400).json({message: "Invalid article"});
        }
});

app.put('/api/articles/:id', async(req, res) => {
        let conn;
        let id = req.params.id;
        id = parseInt(id);
        let valide = Number.isInteger(id);
        if(valide){
            try{
                console.log("Lancement de la requête");
                conn = await pool.getConnection();
                console.log("Lancement de la requête");
                const rows = await conn.query("UPDATE articles SET titreArt = ?, contenuArt = ?, auteurArt = ? WHERE idArt = ?", [req.body.titreArt, req.body.contenuArt, req.body.auteurArt, req.params.id])
                console.log(rows.affectedRows);
                res.status(200).json(rows.affectedRows);
            }
            catch(err){
                console.log("Erreur" + err);
            }
        }else{
            res.status(404).json({message: "Invalid ID"});
        }
});

app.delete('/api/articles/:id', async(req, res) => {
        let conn;
        let id = req.params.id;
        id = parseInt(id);
        let valide = Number.isInteger(id);
        if(valide){
            try{
                console.log("Lancement de la requête");
                conn = await pool.getConnection();
                console.log("Lancement de la requête");
                const rows = await conn.query("DELETE FROM articles WHERE idArt = ?", [req.params.id])
                console.log(rows.affectedRows);
                res.status(200).json(rows.affectedRows);
            }
            catch(err){
                console.log("Erreur" + err);
            }
        }else{
            res.status(404).json({message: "Invalid ID"});
        }
});


// PARTIE UTILISATEURS ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

app.get('/api/utilisateurs', async(req, res) => {
    let conn;
    try{
        console.log("Lancement de la requête");
        conn = await pool.getConnection();
        console.log("Lancement de la requête");
        const rows = await conn.query("SELECT * FROM utilisateurs");
        console.log(rows);
        res.status(200).json(rows);
    }
    catch(err){
        console.log("Erreur" + err);
    }
});

app.get('/api/utilisateurs/:id', async(req, res) => {
    let conn;
    let id = req.params.id;
    id = parseInt(id);
    let valide = Number.isInteger(id);
    if(valide){
        try{
            console.log("Lancement de la requête");
            conn = await pool.getConnection();
            console.log("Lancement de la requête");
            const rows = await conn.query("SELECT * FROM utilisateurs WHERE idU = ?", id);
            console.log(rows);
            res.status(200).json(rows);
        }
        catch(err){
            console.log("Erreur" + err);
        }
    }else{
        res.status(404).json({message: "Invalid ID"});
    }  
});

app.post('/api/utilisateurs', async(req, res) => {
        let conn;
        if(req.body.nomU && req.body.prenomU && req.body.emailU && req.body.mdpU){
            try{
                console.log("Lancement de la requête");
                conn = await pool.getConnection();
                console.log("Lancement de la requête");
                const rows = await conn.query("INSERT INTO utilisateurs (nomU, prenomU, emailU, mdpU) VALUES (?, ?, ?, ?)", [req.body.nomU, req.body.prenomU, req.body.emailU, req.body.mdpU])
                console.log(rows.affectedRows);
                res.status(200).json(rows.affectedRows);
            }
            catch(err){
                console.log("Erreur" + err);
            }
        }else{
            res.status(400).json({message: "Invalid User"});
        }
});

app.put('/api/utilisateurs/:id', async(req, res) => {
        let conn;
        let id = req.params.id;
        id = parseInt(id);
        let valide = Number.isInteger(id);
        if(valide){
            try{
                console.log("Lancement de la requête");
                conn = await pool.getConnection();
                console.log("Lancement de la requête");
                const rows = await conn.query("UPDATE utilisateurs SET nomU = ?, prenomU = ?, emailU = ?, mdpU = ? WHERE idU = ?", [req.body.nomU, req.body.prenomU, req.body.emailU, req.body.mdpU, req.params.id])
                console.log(rows.affectedRows);
                res.status(200).json(rows.affectedRows);
            }
            catch(err){
                console.log("Erreur" + err);
            }
        }else{
            res.status(404).json({message: "Invalid ID"});
        }
});

app.delete('/api/utilisateurs/:id', async(req, res) => {
        let conn;
        let id = req.params.id;
        id = parseInt(id);
        let valide = Number.isInteger(id);
        if(valide){
            try{
                console.log("Lancement de la requête");
                conn = await pool.getConnection();
                console.log("Lancement de la requête");
                const rows = await conn.query("DELETE FROM utilisateurs WHERE idU = ?", [req.params.id])
                console.log(rows.affectedRows);
                res.status(200).json(rows.affectedRows);
            }
            catch(err){
                console.log("Erreur" + err);
            }
        }else{
            res.status(404).json({message: "Invalid ID"});
        }
});
    


app.listen(8000, () => {
    console.log("Serveur à l'écoute");
});