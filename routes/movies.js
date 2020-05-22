const express = require('express')
const mysql = require('mysql')
const router = express.Router()

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'ec2-34-198-243-120.compute-1.amazonaws.com',
    user: 'kxdhivumbtvmle',
    database: 'dbue2rtdanc1ld',
    password: '553ffc2be430220c4d36bf99b95532a6af0f825969a9b5dbff41cc05b577457b'
})

function getConnection() {
    return pool
}

router.post("/movie_create", (req, res) => {
    
    console.log('Trying create new register movie')
    console.log(req.body)
    
    const title    = req.body.title
    const synopsis = req.body.synopsis
    const premiere = req.body.premiere
    const duration = req.body.duration

    const queryString = "INSERT INTO filmes (name, synopsis, premiere, duration) VALUES (?, ?, ?, ?)"

    getConnection().query(queryString, [title, synopsis, premiere, duration], (err, results, fields) => {
        if(err) {
            console.log("Failed insert new movie: " + err)
            res.sendStatus(500)
            return
        } 

        console.log("Inserted a new movie with id:", results.insertedId);
        res.end()
    })  
})

router.get("/", (req, res) => {
    console.log("Responding to root route")
    res.send("Hello from home page")
})

router.get("/movies", (req, res) => {
    console.log('All the movies in DB')

    const queryString = "SELECT * FROM filmes"

    getConnection().query(queryString, (err, rows, fields) => {
        if(err) {
            console.log("Failed query for movies: " + err)
            res.sendStatus(500)
            return
        }
        res.json(rows)
    })

})

router.get("/movies/:id", (req, res) => {
    console.log("Fetching movie with id:" + req.params.id)
    
    const movieID = req.params.id

    const queryString = "SELECT * FROM filmes WHERE id = ?"

    getConnection().query(queryString, [movieID], (err, rows, fields) => {
        if(err) {
            console.log("Failed query for movies: " + err)
            res.sendStatus(500)
            return
        }
        res.json(rows)
    })
})

module.exports = router