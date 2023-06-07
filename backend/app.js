const upload = require("express-fileupload");
const sendEmailToMultipleRecipients = require('./sendMail');
const express = require("express");
const path = require("path");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors");
const fs = require("fs");
const session = require("express-session");

const myConnection = require("express-myconnection");

require('dotenv').config();

// definition de la base de donnee
const optiondB = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
};

const app = express();

// MIDDLEWHERES________

//extraction des donnees du formulaire
app.use(express.urlencoded({ extended: false }));

// deffinition du middlewhere du mysql et node
app.use(express.static(path.join(__dirname, "public")));
app.use(myConnection(mysql, optiondB, "pool"));

//app.use(express.json())
app.use(cors());

app.set("view engine", "ejs");
app.set("views", "pages");

// UPLOAD
app.use(upload());

// sessions
app.use(
  session({
    secret: "#2761995759153*",
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/login", (req, res) => {
  let message = "";

  res.render("login", { message });
});

app.get("/register", (req, res) => {
  let message = "";
  res.render("register", { message });
});

// Route d'inscription
app.post("/auth/register", async (req, res) => {
  // Récupérer les données du formulaire d'inscription
  const { username, password } = req.body;

  // Hasher le mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insérer l'utilisateur dans la base de données
  const query = "INSERT INTO users (username, password) VALUES (?, ?)";
  req.getConnection((error, connection) => {
    if (error) {
      console.log(error);
    } else {
      connection.query(query, [username, hashedPassword], (error, results) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: "Internal Server Error" });
        }
        let message = "inscription réuissi";
        let className = "success";
        res.render("login", { message, className });
      });
    }
  });
});

// Route de connexion
app.post("/auth/login", (req, res) => {
  // Récupérer les données du formulaire de connexion
  const { username, password } = req.body;

  // Vérifier les informations d'identification de l'utilisateur
  const query = "SELECT * FROM users WHERE username = ?";
  req.getConnection((error, connection) => {
    if (error) {
      console.log(error);
    } else {
      let message,
        className = "";
      connection.query(query, [username], async (error, results) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: "Internal Server Error" });
        }
        if (results.length === 0) {
          message = "Pseudo ou mot de passe incorrecte";
          className = "error";
          return res.render("login", { message, className });
        }

        const user = results[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          message = "Pseudo ou mot de passe incorrecte";
          className = "error";
          return res.render("login", { message, className });
        }

        req.session.userId = user.id; // Stocker l'ID de l'utilisateur connecté dans la session

        // // Générer un jeton JWT
        // const token = jwt.sign({ username: user.username }, 'your-secret-key', { expiresIn: '1h' });

        // // Répondre avec le jeton JWT

        connection.query(
          "SELECT * FROM article_vetement",
          [],
          (error, resultats) => {
            if (error) {
              console.log(error);
            } else {
              res.render("vetement", { resultats });
            }
          }
        );
      });
    }
  });
});
function authenticate(req, res, next) {
  if (req.session.userId) {
    // L'utilisateur est connecté, continuer la requête
    next();
  } else {
    // L'utilisateur n'est pas connecté, rediriger ou renvoyer une erreur
    res.redirect("/login"); // Redirection vers la page de connexion
  }
}

app.get("/deconnecter", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      // Gérer l'erreur de suppression de session
    } else {
      // L'utilisateur est déconnecté avec succès
      res.redirect("/login"); // Redirection vers la page de connexion ou autre action appropriée
    }
  });
});

// //ParmPage
app.get("/param", authenticate, (req, res) => {

  req.getConnection((error, connection) => {
    if (error) {
      console.log(error);
    } else {
      connection.query("SELECT * FROM param",[],(error, resultats) => {
          if (error) {
            console.log(error);
          } else {
            connection.query("SELECT * FROM  clientabonne",[],(error,  clientabonne) => {
              if (error) {
                console.log(error);
              } else {
                connection.query("SELECT * FROM  nouvelles",[],(error,  nouvelles) => {
                  if (error) {
                    console.log(error);
                  } else {
                    res.render("param", { resultats, clientabonne , nouvelles});
                  }
                }
              );
              }
            }
          );
          }
        }
      );
    }
  });
});

app.post('/setParam', (req, res)=>{
  const {numOfDay} = req.body
 let reqSql =  `UPDATE param SET numOfDay = ? WHERE id = ? `
 req.getConnection((error, connection) => {
  if(error) console.log(error)
  connection.query(reqSql, [numOfDay,1], (error, resultats)  => {
    if (error)  console.log(error);
    let message = 'Operation réuissi'
    res.render('confirmPage', { message });
  });
});
})

// EVOYER DES NOUVELLE PAR MAIL 
app.post('/sendNew', (req, res)=>{
  const {news,sujet} = req.body
  const subClientsArr = []

 req.getConnection((error, connection) => {
  if(error) console.log(error)
    connection.query(`UPDATE nouvelles SET news = ?, sujet = ? WHERE id = ?`, [news,sujet,1], (error, nouvelles)  => {
    if (error)  console.log(error);
    req.getConnection((error, connection) => {
      if(error) console.log(error)
        connection.query(`SELECT * FROM clientabonne`, [], (error, abonnes)  => {
        if (error)  console.log(error);
        for(const abonne of abonnes){
          subClientsArr.push(abonne.clientMail)
        }
        try{
          sendEmailToMultipleRecipients(subClientsArr,sujet, news);
          let message = 'Nouvelle envoyée'
          let color = 'green'
          res.render('confirmPage', { message , color});
        }catch(err){
          let message = 'Erreur lors de l\'envoi de l\'e-mail :' + err
          let color = 'red'
          res.render('confirmPage', { message , color});
        }
      });
    });
  });
});

})

//HOME PAGE
app.get("/", authenticate, (req, res) => {
  req.getConnection((error, connection) => {
    if (error) {
      console.log(error);
    } else {
      connection.query(
        "SELECT * FROM article_vetement",
        [],
        (error, resultats) => {
          if (error) {
            console.log(error);
          } else {
            res.render("vetement", { resultats });
          }
        }
      );
    }
  });
});

app.get("/chaussure",authenticate, (req, res) => {
  req.getConnection((error, connection) => {
    if (error) {
      console.log(error);
    } else {
      connection.query(
        "SELECT * FROM article_chaussures	",
        [],
        (error, resultats) => {
          if (error) {
            console.log(error);
          } else {
            res.render("chaussure", { resultats });
          }
        }
      );
    }
  });
});

app.get("/accssessoire", authenticate, (req, res) => {
  req.getConnection((error, connection) => {
    if (error) {
      console.log(error);
    } else {
      connection.query(
        "SELECT * FROM article_sacs_accessoires",
        [],
        (error, resultats) => {
          if (error) {
            console.log(error);
          } else {
            res.render("accssessoire", { resultats });
          }
        }
      );
    }
  });
});

app.get("/collection/:table_name", (req, res) => {
  const table_name = req.params.table_name;
  req.getConnection((error, connection) => {
    if (error) {
      console.log(error);
    } else {
      connection.query(
        `SELECT * FROM ${table_name}`,
        [],
        (error, resultats) => {
          if (error) {
            console.log(error);
          } else {
            res.json(resultats);
          }
        }
      );
    }
  });
});

app.get("/paramettre", (req, res) => {
  req.getConnection((error, connection) => {
    if (error) {
      console.log(error);
    } else {
      connection.query(`SELECT * FROM param`,(error, resultats) => {
          if (error) {
            console.log(error);
          } else {
            res.json(resultats);
          }
        }
      );
    }
  });
});

//Inscription des abonnés
app.post('/clientabonne/:mail', (req, res) =>{
  const mail = req.params.mail
   console.log(mail)
  // Vérifier les informations d'identification de l'utilisateur
  const query = "SELECT * FROM clientabonne WHERE clientMail = ?";
  req.getConnection((error, connection) => {
    if (error)  console.log(error);
     connection.query(query, [mail], async (error, results) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: "Internal Server Error" });
        }
        if (results.length > 0) {
          return res.json({ message : 'Cette email existe deja sur la liste de nos abonnés'});
        }
        connection.query(`INSERT INTO clientabonne(id,clientMail) VALUES(?,?)`,[null, mail],(error, resultats) => {
          if (error) {
            console.log(error);
          } else {
            res.json({message : 'Merci de votre abonnement'});
          }
        }
      );     
      });
    
  });
})
app.post("/upload/:table_name/:page",authenticate, (req, res) => {
  let reqSql = "";
  let donnees = [];
  const table_name = req.params.table_name;
  const page = req.params.page;

  let id = req.body.id === "" ? null : req.body.id;
  let file = null;
  let fileName = null;

  if (id === null) {
    file = req.files.foo;
    fileName = file.name;
  }

  let {
    nom,
    categorie,
    taille,
    couleur,
    colorName,
    saison,
    date,
    prix,
    description,
  } = req.body;
  if (table_name !== "article_sacs_accessoires") {
    reqSql =
      id === null
        ? `INSERT INTO ${table_name} (
        id,
        nom,
        categorie,
        taille,
        couleur,
        colorName,
        saison,
        date,
        prix,
        description,
        imgSrc
        
        )
        VALUES(?,?,?,?,?,?,?,?,?,?,?)
        `
        : `UPDATE ${table_name} SET
        nom = ?,
        categorie = ?,
        taille = ?,
        couleur = ?, 
        colorName = ?,
        saison = ?,
        date = ?,
        prix = ?,
        description = ?
        WHERE id = ? 
        `;
    donnees =
      id === null
        ? [
            null,
            nom,
            categorie,
            taille,
            couleur,
            colorName,
            saison,
            date,
            prix,
            description,
            fileName,
          ]
        : [
            nom,
            categorie,
            taille,
            couleur,
            colorName,
            saison,
            date,
            prix,
            description,
            id,
          ];
  } else if (table_name === "article_sacs_accessoires") {
    reqSql =
      id === null
        ? `INSERT INTO ${table_name} (
        id,
        nom,
        categorie,
        couleur,
        colorName,
        date,
        prix,
        description,
        imgSrc
        
        )
        VALUES(?,?,?,?,?,?,?,?,?)
        `
        : `UPDATE ${table_name} SET
        nom = ?,
        categorie = ?,
        couleur = ?, 
        colorName = ?,
        date = ?,
        prix = ?,
        description = ?
        WHERE id = ? 
        `;
    donnees =
      id === null
        ? [
            null,
            nom,
            categorie,
            couleur,
            colorName,
            date,
            prix,
            description,
            fileName,
          ]
        : [nom, categorie, couleur, colorName, date, prix, description, id];
  }

  req.getConnection((error, connection) => {
    if (error) console.log(error);
    connection.query(reqSql, donnees, (error, resultats) => {
      if (error)  console.log(error);
        console.log("info image inserer avec succcé");
        if (id === null) {
          file.mv("../src/images/" + fileName, (err) => {
            if (err) console.log(err)
            file.mv("./public/images/" + fileName, (err) => {
              if (err)  console.log(err); 
              console.log("image " + fileName + " inserer avec succé");
            });
          });
        }
        let message = id === null ? 'Article ajouté avec succée' : 'Article modifié avec succée'
         res.render('confirmPage', { message });
    });
  });
});

// EFFACER UN produit 
app.get("/detelet_image/:imageSource/:produiType/:id/:page",authenticate, (req, res) => {
    const {imageSource,produiType,id,page} = req.params

  req.getConnection((error, connection) => {
    if (error) {
      console.log(error);
    } else {
      connection.query(
        `DELETE FROM ${produiType} WHERE id = ${parseFloat(id)}`,
        (error, success) => {
          if (error) {
            console.log(error);
          } else {
            fs.unlink(`./public/images/${imageSource}`, (err) => {
              if (err) throw err;
              else {
                console.log(`${imageSource} du backend a été supprimé`);
              }
            });
            const filePath = path.resolve(__dirname, `../src/images/${imageSource}`);
            fs.unlink(filePath, (err) => {
                if (err) throw err;
                else {
                  console.log(`${imageSource} du client a été supprimé `);
                
                }
              });
                if(error)console.log(error)
                  connection.query(`SELECT * FROM ${produiType}`,[],(error, resultats) => {
                  if (error) console.log(error);
                  let message = 'Article supprimé ajouté avec succée'
                    res.render('confirmPage', { message });
                 }
               );
              
          }
        }
      );
    }
  });
});

app.listen(3001, () => {
  console.log("app run");
});


