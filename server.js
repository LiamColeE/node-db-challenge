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
        completed: req.headers.completed
    }
    db.createProject(project)
    .then((result) => {
        db.findProjectsByID(result[0])
        .then((newProject) => {
            res.status("200")
            res.send(newProject)
        })

    })
    .catch((err) => {
        res.status("500");
        res.send("internal server err")
    })
})

server.get('/api/projects', (req,res) => {
    db.findProjects()
    .then((result) => {
        res.send(result)
        res.status(200);
    })
})

server.post('/api/resources', (req,res) => {
    let resource = {
        name: req.headers.name,
        description: req.headers.description
    }

    db.createResource(resource)
    .then((result) => {
        db.findResourcesByID(result[0])
            .then((result) => {
            res.send(result)
            res.status(200)
        })
    })
    .catch((err) => {
        res.send("internal server error")
        res.status(500);
    })
})

server.get('/api/resources', (req,res) => {
    db.findResources()
    .then((result) => {
        res.send(result)
        res.status(200)
    })
    .catch((err) => {
        res.send("internal server error")
        res.status(500);
    })
})

server.get('/api/tasks', (req,res) => {
    db.findTasks()
    .then((result) => {
        res.send(result)
        res.status(200)
    })
})

server.post('/api/tasks', (req,res) => {
    let task = {
        name: req.headers.name,
        description: req.headers.description,
        project_id: req.headers.project_id,
        completed: req.headers.completed
    }

    db.createTask(task)
    .then((result) => {
        db.findTasksByID(result[0])
        .then((newTask) => {
            res.send(newTask)
            res.status(200)
        })
    })
})

module.exports = server;