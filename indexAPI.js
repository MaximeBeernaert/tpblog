const express = require('express');
const app = express();

require('dotenv').config();
const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_DTB,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    connectionLimit: 1000
});
let cors = require('cors');
app.use(express.json());
app.use(cors());
const bcrypt = require('bcrypt');


// PARTIE ARTICLES ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

app.get('/api/articles', async(req, res) => {
    let conn;
    try{
        console.log("requete get articles")
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM articles");
        console.log(rows);
        res.status(200).json(rows);
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
            console.log("requete get articles/ID")
            conn = await pool.getConnection();
            const rows = await conn.query("SELECT * FROM articles WHERE idArt = ?", id);
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

app.get('/api/articles/auteur/:auteur', async(req, res) => {
    let conn;
    let auteur = req.params.auteur;
    try{
        console.log("requete get articles/auteur/auteur")
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM articles WHERE auteurArt = ?", auteur);
        console.log(rows);
        res.status(200).json(rows);
    }
    catch(err){
        console.log("Erreur" + err);
    } 
});

app.post('/api/articles', async(req, res) => {
        let conn;
        if(req.body.titreArt && req.body.contenuArt && req.body.auteurArt){
            try{
                console.log("requete post articles")
                conn = await pool.getConnection();
                const rows = await conn.query("INSERT INTO articles (titreArt, contenuArt, auteurArt, dateCreationArt) VALUES (?, ?, ?, ?)", [req.body.titreArt, req.body.contenuArt, req.body.auteurArt, req.body.dateCreationArt])
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
                console.log("requete put articles/ID")
                conn = await pool.getConnection();
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
                console.log("requete delete articles/ID")
                conn = await pool.getConnection();
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
        console.log("requete get utilisateurs")
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM utilisateurs");
        res.status(200).json(rows);
    }
    catch(err){
        console.log("Erreur" + err);
    }
});

app.get('/api/utilisateurs/id/:id', async(req, res) => {
    let conn;
    let id = req.params.id;
    id = parseInt(id);
    let valide = Number.isInteger(id);
    if(valide){
        try{
        console.log("requete get utilisateurs/ID")
            conn = await pool.getConnection();
            const rows = await conn.query("SELECT * FROM utilisateurs WHERE idU = ?", id);
            res.status(200).json(rows);
        }
        catch(err){
            console.log("Erreur" + err);
        }
    }else{
        res.status(404).json({message: "Invalid ID"});
    }  
});

app.get('/api/utilisateurs/email/:email', async(req, res) => {
    let conn;
    let email = req.params.email;
    try{
        console.log("requete get utilisateurs/email/email")
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM utilisateurs WHERE emailU = ?", email);
        res.status(200).json(rows);
    }
    catch(err){
        console.log("Erreur" + err);
    } 
});


app.post('/api/utilisateurs', async(req, res) => {
        let conn;
        bcrypt.hash(req.body.mdpU, 10)
            .then( async (hash) => {
                console.log("requete post utilisateurs")
                conn = await pool.getConnection();
                const rows = await conn.query("INSERT INTO utilisateurs (nomU, prenomU, emailU, mdpU) VALUES (?, ?, ?, ?)", [req.body.nomU, req.body.prenomU, req.body.emailU, hash])
                console.log(rows.affectedRows);
                res.status(200).json(rows.affectedRows);
            }
            ).catch(error => res.status(500).json({error}));
});

app.put('/api/utilisateurs/:id', async(req, res) => {
        let conn;
        let id = req.params.id;
        id = parseInt(id);
        let valide = Number.isInteger(id);
        if(valide){
            try{
                console.log("requete put utilisateurs/ID")
                conn = await pool.getConnection();
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
                console.log("requete delete utilisateurs/ID")
                conn = await pool.getConnection();
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
    
app.get('/api/utilisateurs/connexion/:email/:mdp', async(req, res) => {
    let conn;
    let email = req.params.email;
    let mdp = req.params.mdp;
    try{
        console.log("requete get utilisateurs/email/mdp")
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM utilisateurs WHERE emailU = ?", email);
        if(rows.length > 0){
            bcrypt.compare(mdp, rows[0].mdpU)
            .then(valid => {
                if(!valid){
                    return res.status(401).json({error: 'Mot de passe incorrect !'});
                }
                res.status(200).json({
                    user: rows[0]
                });
            })
            .catch(error => res.status(500).json({error}));
        }else{
            res.status(404).json({message: "Invalid email"});
        }
    }
    catch(err){
        console.log("Erreur" + err);
    } 
});

app.listen(8000, () => {
    console.log("Serveur à l'écoute");
});