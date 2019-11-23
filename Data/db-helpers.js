const knex = require("knex");
const config = require("../knexfile");
const db = knex(config.development);

module.exports = {
    findProjects,
    findProjectsByID,
    createProject,
    createResource,
    findResources,
    findResourcesByID,
    findTasks,
    createTask,
    findTasksByID
}

function findProjects(){
    return db('projects');
}

function findProjectsByID(id){
    return db('projects').where({project_id: id});
}

function createProject(project){
    return db('projects').insert(project);
}

function createResource(resource){
    return db('resources').insert(resource);
}

function findResources(){
    return db('resources');
}

function findResourcesByID(id){
    return db('resources').where({resource_id:id});
}

function findTasks(){
    return db('tasks as t')
    .join('projects as p', 't.project_id', 'p.project_id')
    .select('t.name', 't.description','t.completed', 'p.project_name', 'p.project_description')
}

function findTasksByID(id){
    return db('tasks as t')
    .where({task_id:id})
    .join('projects as p', 't.project_id', 'p.project_id')
    .select('t.name', 't.description','t.completed', 'p.project_name', 'p.project_description')
}

function createTask(task){
    return db('tasks').insert(task);
}