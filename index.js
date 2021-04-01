const express = require('express')
const mysql = require('mysql')

const app = express();

// create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'thelma',
    password: '0103',
    database: 'dbdb'
})

// connect 
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('mysql connected')
})

// load or create db
app.get('/users', (req, res) => {
    let sql = 'SELECT * FROM users'
    // can also put big methods like the join block
    // similar let sql = 'CREATE DATABASE  nodemysql'

    db.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result)
    })
})

// create table
app.get('/tableportal', (req, res) => {
    let sql = 'CREATE TABLE newtabs(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))'
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result)
        res.send("Newtabs table created...")
        // this ^^ is html
    })
})

// insert post
app.get('/addpost1', (req, res) => {
    let post = {title: 'Post One', body: 'This is post one'}
    let sql = 'INSERT INTO newtabs SET ?'
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err
        console.log(result)
        res.send('WE ADDED POST')
    })
})
app.get('/addpost2', (req, res) => {
    let post = {title: 'Post 2', body: 'This is post 2'}
    let sql = 'INSERT INTO newtabs SET ?'
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err
        console.log(result)
        res.send('WE ADDED ANOTHER POST')
    })
})

// SELECT POSTS
app.get('/getposts', (req, res) => {
    let sql = 'SELECT * FROM newtabs'
    let query = db.query(sql, (err, result) => {
        if(err) throw err
        console.log(result)
        res.send('POSTS FETCHED')
    })
})

// FETCH INDIVIDUAL POST
app.get('/getsinglepost/:id', (req, res) => {
    let sql = `SELECT * FROM newtabs WHERE id = ${req.params.id}`
    let query = db.query(sql, (err, result) => {
        if(err) throw err
        console.log(result)
        res.send('SINGLE POST FETCHED')
    })
    // http://localhost:5000/getsinglepost/1
})

// UPDATE POST
app.get('/updatepost/:id', (req, res) => {
    let newTitle = 'Updated Title'
    let sql = `UPDATE newtabs SET title = '${newTitle}' WHERE id = ${req.params.id}`
    let query = db.query(sql, (err, result) => {
        if(err) throw err
        console.log(result)
        res.send('SINGLE POST UPDATED')
    })
    // http://localhost:5000/updatepost/1
})

// DELETE POST
app.get('/deletepost/:id', (req, res) => {
    let sql = `DELETE FROM newtabs WHERE id = ${req.params.id}`
    let query = db.query(sql, (err, result) => {
        if(err) throw err
        console.log(result)
        res.send('SINGLE POST DELETED')
    })
    // http://localhost:5000/updatepost/1
})

app.listen(5000, () => console.log('Server started'));


