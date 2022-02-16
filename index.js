const { json } = require('body-parser');
const express = require('express');
const app = express();
const pool = require("./connection.js");

const port = process.env.PORT || 3300

app.use(express.json())

                            // Routes//

    // get all users

app.get("/users", async (req, res) => {
    try {
        const users = await pool.query('SELECT * from "SaiUsers" ');
        res.json(users.rows);
    } catch (error) {
        console.error(error.message);
    }
});

    // get all companies names from table SaiSoc

app.get("/companies", async (req, res) => {
    try {
        const companies = await pool.query('select * from "SaiSoc"');
        res.json(companies.rows);
    } catch (error) {
        console.error(error.message)
    }
});


    // get all session name from table saiSession
app.get("/sessionNames", async (req, res) => {
    try {
        const sessions = await pool.query('SELECT * FROM "SaiSession"');
        res.json(sessions.rows);
    } catch (error) {
        console.error(error.message);
    }
});

    // get users by registerNumber

app.get("/users/registerNumbers/:MatFiscale(*)", (req, res) => {
    const { MatFiscale } = req.params;
    let user = `select * from "SaiUsers" WHERE "MatFiscale" ='${MatFiscale}'`
    pool.query(user, (err, result) => {
        if ((err) || (result.fields == null)) {
            res.status(400).send();
        }
        else {
            res.json(result.rows).send();
        }

    });
});

    // get company name by MatFiscale

app.get("/companies/:MatFiscale(*)", async (req, res) => {
    const { MatFiscale } = req.params;

    let company = `select "NomSociete" from "SaiSoc" WHERE "MatFiscale" ='${MatFiscale}'`
    pool.query(company, (err, result) => {
        if ((err) || (result.rowCount == 0)) {
            res.status(400).send();
        }
        else {
            res.json(result.rows).send();
        }

    });

});

    // get sessionName by idSession
app.get("/sessionNames/:idSession", async (req, res) => {
    const { idSession } = req.params;
    let sessionName = `select "SessionName" from "SaiSession" where "IdSession" ='${idSession}'`;

    pool.query(sessionName, (err, result) => {
        if ((err) || (result.rowCount == 0)) {
            res.status(400).send();
        }
        else {
            res.json(result.rows).send();
        }

    });
});


    // get user by email
app.get("/users/emails/:email", async (req, res) => {
    const { email } = req.params;
    let user = `select * from "SaiUsers" WHERE "Email" = '${email}'`;

    pool.query(user, (err, result) => {
        if ((err) || (result.rowCount == 0)) {
            res.status(400).send();
        }
        else {
            res.json(result.rows).send();
        }
    });
});

    // get user by phone
app.get("/users/phones/:phone", async (req, res) => {
    const { phone } = req.params;
    let user = `select * from "SaiUsers" WHERE "Email" = '${email}'`;
    pool.query(user, (err, result) => {
        if ((err) || (result.rowCount == 0)) {
            res.status(400).send();
        }
        else {
            res.json(result.rows).send();
        }
    });
});

    // update password 
app.put('/MajUserPass/:compteur', (req, res) => {
    let credentials = req.body;
    const { compteur } = req.params;
    let updateQuery = `update "SaiUsers"
                       set "Password" = '${credentials.Password}'
                       where "compteur" = '${compteur}'`
    pool.query(updateQuery, (err, result) => {
        if ((err) || (result.rowCount == 0)) {
            res.status(400).send();
        }
        else {
            res.status(200).send();
        }
    });

})

//get notification by user 


//delete notification by id 

//get stock, finance , HR by userId

// create soc, session users, stock, HR, finance ...

app.listen(port, () => {
    console.log(`server is listening on ${port} `);
});



