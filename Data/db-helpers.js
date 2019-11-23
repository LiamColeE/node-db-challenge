const knex = require("knex");
const config = require("../knexfile");
const db = knex(config.development);

module.exports = {
    findProjects,
    findProjectsByID,
    createProject
}

function findProjects(){
    return db('projects');
}

function findProjectsByID(id){
    return db('projects').where({project_id: id});
}

function createProject(project){
    return db('projects').insert(project)
}