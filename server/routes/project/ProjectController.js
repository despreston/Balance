'use strict';
const Project = require('../../models/Project');

function createProject(req, res) {
  Project.create(req.params).then((err, newProject) => {
    if (err) {
      res.send(500);  
    } else {
      res.send(204, newProject);
    }
  });
}

function findProject(req, res) {
  Project.findOne(req.params).then(project => res.send(200, project));
}

function findProjects(req, res) {
  Project.find(req.params).then(projects => res.send(200, projects));
}

module.exports = (server, routeHelper) => {
  server.get("projects/:_id", findProject);
  server.get("projects", findProjects);
  server.post('projects', (req, res) => { 
    routeHelper.requiredParams(req, res, ['title']);
  }, createProject);
};