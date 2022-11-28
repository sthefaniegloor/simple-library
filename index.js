const express = require('express');
const connection = require('./db_connection').connector;

const app = express();
app.use(express.json());

//find books
app.get('/books', (req, res) => {
    connection.query('SELECT * FROM library', (err, result) => {
        if (err) {
            res.send('Error');
        }
        return res.send(result);
    })
})

//find by id
app.get('/books/:id', (req, res) => {
    const {id} = req.params;
    connection.query(`SELECT * FROM library WHERE id = ${id}`, (err, result) => {
        if (err) {
            res.send('Error');
        }
        return res.send(result);
    })
})

//register new book
app.post('/books', (req, res) => {
    const {title, author} = req.body;
    connection.query(`SELECT * FROM library WHERE title = '${title}' AND author = '${author}'`, (err, result) => {
        if (err) {
            res.send('Error');
        }
        if (result.length) {
            return res.send('This book has already been registered');
        } else {
            connection.query(`INSERT INTO library(title, author) VALUES('${title}', '${author}')`, (err, result) => {
                if (err) {
                    res.send('Error');
                }
                return res.send(result);
            })
        }
    })


})

//delete book
app.delete('/books/:id', (req, res) => {
    const {id} = req.params;
    connection.query(`DELETE FROM library WHERE id = ${id}`, (err, result) => {
        if (err) {
            res.send('Error');
        }
        return res.send(result);
    })
})

//updating book
app.put('/books', (req, res) => {
    const {id, title, author} = req.body;
    connection.query(
        `UPDATE library SET title = '${title}', author = '${author}' WHERE id = ${id}`, (err, result) => {
        if (err) {
            res.send('Error');
        }
        return res.send(result);
    })
})


module.exports = app;
app.listen(8000, () => console.log('Running on localhost:8000'))