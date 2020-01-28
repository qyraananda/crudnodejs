//use path module
const path = require('path');
//use express module
const express = require('express');
//use hbs view engine
const hbs = require('hbs');
//use bodyParser middleware
const bodyParser = require('body-parser');
//use mysql database
const mysql = require('mysql');
const app = express();

//Create connection
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'moviedb'
});

//connect to database
conn.connect((err) => {
    if (err) throw err;
    console.log('Mysql Connected...');
});

//set views file
app.set('views', path.join(__dirname, 'views'));
//set view engine
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//set public folder as static folder for static file
app.use('/assets', express.static(__dirname + '/public'));

//route for homepage
app.get('/', (req, res) => {
    let sql = "SELECT m.id,movie,genre,name as ph FROM movie m left join productionhouse p on p.id=productionhouseid";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.render('movie_view', {
            results: results
        });
    });
});

app.get('/', function(req, res, next) {
    con.query("SELECT * FROM productionhouse", function(err, result, fields) {
        if (err)
            throw err;
        else
            console.log(result);
    });
});

//route for insert data
app.post('/save', (req, res) => {
    let data = { movie: req.body.movie, genre: req.body.genre };
    let sql = "INSERT INTO movie SET ?";
    let query = conn.query(sql, data, (err, results) => {
        if (err) throw err;
        res.redirect('/');
    });
});

//route for update data
app.post('/update', (req, res) => {
    let sql = "UPDATE movie SET movie='" + req.body.movie + "', genre='" + req.body.genre + "' WHERE id=" + req.body.id;
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect('/');
    });
});

//route for delete data
app.post('/delete', (req, res) => {
    let sql = "DELETE FROM movie WHERE id=" + req.body.movie_id + "";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect('/');
    });
});

//server listening
app.listen(8000, () => {
    console.log('Server is running at port 8000');
});