const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "web_app",
  password: "root"
})
.then(res => connection = res)
.catch(err => {
  console.log(err.message);
  process.exit(1);
});


const app = express();
app.use(cors({
  origin: ["http://localhost:3000"],
}));
app.use(express.json());
app.use(express.static("static"));


//get data
app.get("/prod", function (_, res) {
  connection.query(`SELECT p.id, p.name, p.price, c.name as categ FROM prod p left join categ c on p.categ_id = c.id`)
    .then(([rows, fields]) => {
      // console.log("GET prod...");
      res.send(rows);
    })
    .catch(err => {
      console.log(err.sqlMessage);
      res.status(500).send({ status: 500, data: null, message: err.sqlMessage });
    })
});

app.get("/categ", function (_, res) {
  connection.query(`SELECT id, name FROM categ`)
    .then(([rows, fields]) => {
      res.send(rows);
    })
    .catch(err => {
      console.log(err.sqlMessage);
      res.status(500).send({ status: 500, data: null, message: err.sqlMessage });
    })
});


//insert new data
app.post("/prod", function (req, res) {
  if (!req.body) return res.sendStatus(400);
  const sql = `insert into prod(name, price, categ_id) 
                values('${req.body.name}',${req.body.price},${req.body.categ_id})`;
  connection.query(sql)
    .then(result => {
      res.send({ statusText: `Data inserted: ${result[0].affectedRows} row(s).` })
    })
    .catch(err => {
      console.log('Error: ' + err.sqlMessage);
      res.status(500).send({ status: 500, data: null, message: err.sqlMessage });
    })
});

app.post("/categ", function (req, res) {
  if (!req.body) return res.sendStatus(400);
  const sql = `insert into categ(name) values('${req.body.name}')`;
  connection.query(sql)
    .then(result => {
      res.send({ statusText: `Data inserted: ${result[0].affectedRows} row(s).` })
    })
    .catch(err => {
      console.log('Error: ' + err.sqlMessage);
      res.status(500).send({ status: 500, data: null, message: err.sqlMessage });
    })
});


//update data
app.put("/prod", function (req, res) {
  if (!req.body) return res.sendStatus(400);
  const sql = `update prod 
                set name = '${req.body.name}', 
                    price = ${req.body.price}, 
                    categ_id = ${req.body.categ_id}
                where id = ${req.body.id}`;
  connection.query(sql)
    .then(result => {
      res.send({ statusText: `Data updated: ${result[0].affectedRows} row(s).` })
    })
    .catch(err => {
      console.log('Error: ' + err.sqlMessage);
      res.status(500).send({ status: 500, data: null, message: err.sqlMessage });
    })
});


app.put("/categ", function (req, res) {
  if (!req.body) return res.sendStatus(400);
  const sql = `update categ 
                set name = '${req.body.name}' 
                where id = ${req.body.id}`;
  connection.query(sql)
    .then(result => {
      res.send({ statusText: `Data updated: ${result[0].affectedRows} row(s).` })
    })
    .catch(err => {
      console.log('Error: ' + err.sqlMessage);
      res.status(500).send({ status: 500, data: null, message: err.sqlMessage });
    })
});


//delete data
app.delete("/prod", function (req, res) {
  if (!req.body) return res.sendStatus(400);
  const sql = `delete from prod where id = ${req.body.id}`;
  connection.query(sql)
    .then(result => {
      res.send({ statusText: `Data deleted: ${result[0].affectedRows} row(s).` })
    })
    .catch(err => {
      console.log('Error: ' + err.sqlMessage);
      res.status(500).send({ status: 500, data: null, message: err.sqlMessage });
    })
});

app.delete("/categ", function (req, res) {
  if (!req.body) return res.sendStatus(400);
  const sql = `delete from categ where id = ${req.body.id}`;
  connection.query(sql)
    .then(result => {
      res.send({ statusText: `Data deleted: ${result[0].affectedRows} row(s).` })
    })
    .catch(err => {
      console.log('Error: ' + err.sqlMessage);
      res.status(500).send({ status: 500, data: null, message: err.sqlMessage });
    })
});



app.listen(8000);
