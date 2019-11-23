const express = require("express");
const server = express();

const db = require('./Data/db-helpers');


server.get('/', (req,res) => {
    db.findProjectsByID(2)
    .then((result) => {
        res.send(result)
        res.status(200);
    })

})

server.post('/api/projects', (req,res) => {
    let project = {
        project_name: req.headers.project_name,
        project_description: req.headers.project_description,
        completed: false
    }

    db.createProject(project)
    .then((result) => {
        res.status("200")
        res.send(result)
    })
    .catch((err) => {
        res.status("500");
        res.send("internal server err")
    })
})

module.exports = server;